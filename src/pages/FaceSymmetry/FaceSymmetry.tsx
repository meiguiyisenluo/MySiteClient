import React, { useRef, useEffect, useState } from 'react'
import styles from './FaceSymmetry.module.scss'
import { Button } from 'react-vant'

const FaceSymmetry: React.FC = () => {
    const [isRuning, setIsRuning] = useState(false)
    const bool = useRef(false)
    const interval: any = useRef(null)
    const imageInfo: any= useRef({
        name: '',
        width: 0,
        height: 0,
        imageData: null,
        revertImageData: null
    })
    const canvas: any = useRef(null)
    const ctx: any = useRef(null)
    const uploadImg = () => {
        const input = document.createElement('input')
        input.accept = 'image/*'
        input.type = 'file'
        input.addEventListener('change', (e: any) => {
            const file = e.target?.files[0]
            imageInfo.current.name = file.name
            const fr = new FileReader()
            fr.readAsDataURL(file)
            fr.onload = function (e: any) {
                const img = new Image()
                img.src = e.target.result
                img.onload = function (e: any) {
                    let { width, height } = img
                    imageInfo.current.width = width
                    imageInfo.current.height = height

                    const per = width / height
                    const b = canvas.current.width > canvas.current.height

                    let marginLeft = 0
                    let marginTop = 0
                    if (b) {
                        height = canvas.current.height
                        width = height * per
                        marginLeft = (canvas.current.width - width) / 2
                    } else {
                        width = canvas.current.width
                        height = width / per
                        marginTop = (canvas.current.height - height) / 2
                    }

                    ctx.current.drawImage(img, marginLeft, marginTop, width, height)
                    calcHorizontalFlip()
                }
            }
        })
        input.click()
    }

    const setCanvasSize = (width: number, height: number) => {
        canvas.current.width = width
        canvas.current.height = height
    }

    const toggleRuning = () => {
        clearInterval(interval.current)
        if (!isRuning) {
            if (!imageInfo.current.imageData || !imageInfo.current.revertImageData) return
            interval.current = setInterval(() => {
                ctx.current.putImageData(bool.current ? imageInfo.current.imageData : imageInfo.current.revertImageData, 0, 0)
                bool.current = !bool.current
            }, 50)
        }
        setIsRuning(!isRuning)
    }

    // 水平翻转
    function calcHorizontalFlip() {
        const imgData = ctx.current.getImageData(0, 0, canvas.current.width, canvas.current.height)
        imageInfo.current.imageData = imgData
        const arr: any = [...imgData.data]
        const lineWidth = imgData.width

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

    function exchange(arr: [], a: number, b: number) {
        const temp = arr[a]
        arr[a] = arr[b]
        arr[b] = temp
    }

    useEffect(() => {
        ctx.current = canvas.current.getContext('2d', { willReadFrequently: true })

        setCanvasSize(canvas.current.offsetWidth, canvas.current.offsetHeight)
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.shower}>
                <canvas ref={canvas}></canvas>
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

export default FaceSymmetry
