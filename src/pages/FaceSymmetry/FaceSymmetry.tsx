import React, { useRef, useEffect, useState } from 'react'
import { Button } from 'react-vant'
import styles from './FaceSymmetry.module.scss'

const FaceSymmetry: React.FC = () => {
    const [isRuning, setIsRuning] = useState(false)
    const bool = useRef(false)
    const interval = useRef<ReturnType<typeof setInterval>>()
    const imageInfo = useRef<{
        name: string
        width: number
        height: number
        imageData: ImageData | null
        revertImageData: ImageData | null
    }>({
        name: '',
        width: 0,
        height: 0,
        imageData: null,
        revertImageData: null
    })
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctx = useRef<CanvasRenderingContext2D | null>(null)

    const imgResolve = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (!target.files?.length) return
        const file = target.files[0]
        imageInfo.current.name = file.name
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = function (e: Event) {
            const img = new Image()
            const target = e.target as FileReader
            if (!target?.result) return
            img.src = target.result as string
            img.onload = function () {
                if (!canvasRef.current || !ctx.current) return
                let { width, height } = img
                imageInfo.current.width = width
                imageInfo.current.height = height

                const per = width / height
                const b = canvasRef.current.width > canvasRef.current.height

                let marginLeft = 0
                let marginTop = 0
                if (b) {
                    height = canvasRef.current.height
                    width = height * per
                    marginLeft = (canvasRef.current.width - width) / 2
                } else {
                    width = canvasRef.current.width
                    height = width / per
                    marginTop = (canvasRef.current.height - height) / 2
                }

                ctx.current.drawImage(img, marginLeft, marginTop, width, height)
                calcHorizontalFlip()
            }
        }
    }

    const uploadImg = () => {
        const input = document.createElement('input')
        input.accept = 'image/*'
        input.type = 'file'
        input.onchange = imgResolve
        input.click()
    }

    const setCanvasSize = () => {
        if (!canvasRef.current) return
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = canvasRef.current.offsetHeight
    }

    const toggleRuning = () => {
        clearInterval(interval.current)
        if (!isRuning) {
            if (!imageInfo.current.imageData || !imageInfo.current.revertImageData) return
            interval.current = setInterval(() => {
                if (!ctx.current) return
                const imageData = bool.current ? imageInfo.current.imageData : imageInfo.current.revertImageData
                if (!imageData) return
                ctx.current.putImageData(imageData, 0, 0)
                bool.current = !bool.current
            }, 50)
        }
        setIsRuning(!isRuning)
    }

    // 水平翻转
    function calcHorizontalFlip() {
        if (!canvasRef.current || !ctx.current) return
        const imgData = ctx.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        // 备份
        imageInfo.current.imageData = imgData
        const lineWidth = imgData.width
        // 拷贝
        const arr: Array<number> = []
        for (const key in imgData.data) {
            arr.push(imgData.data[key])
        }

        const dw = 4 * lineWidth
        for (let i = 0; i < arr.length; i += 4) {
            const tempi = i % dw
            if (tempi >= dw / 2) continue
            const line = Math.floor(i / dw)
            const rei = dw - 1 - 3 - tempi
            const base = line * dw
            for (let j = 0; j < 4; j++) {
                exchange(arr, base + j + tempi, base + j + rei)
            }
        }

        imageInfo.current.revertImageData = new ImageData(new Uint8ClampedArray(arr), imgData.width, imgData.height)
    }

    function exchange(arr: Array<number>, a: number, b: number) {
        const temp = arr[a]
        arr[a] = arr[b]
        arr[b] = temp
    }

    useEffect(() => {
        if (!canvasRef.current) return
        ctx.current = canvasRef.current.getContext('2d', { willReadFrequently: true })

        setCanvasSize()
    }, [])

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.shower}>
                <canvas ref={canvasRef}></canvas>
            </div>
            <div className={styles.btns}>
                <Button className="btn" type="primary" plain round shadow={1} hairline onClick={uploadImg}>
                    上传图片
                </Button>
                <Button className="btn" type="primary" plain round shadow={1} hairline onClick={toggleRuning}>
                    {isRuning ? '停止测试' : '开始测试'}
                </Button>
            </div>
        </div>
    )
}
export const Component = FaceSymmetry
