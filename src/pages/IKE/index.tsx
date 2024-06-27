import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import styles from './index.module.scss'

const MISU7: React.FC = () => {
    const [val, setVal] = useState({ value: 0 })

    useEffect(() => {
        let flag = false
        const tempVal = { value: 0 }
        const tl = gsap.timeline({
            onUpdate() {
                setVal({ value: tempVal.value })
                // console.log(tempVal.value)
            }
        })
        tl.to(tempVal, { value: 0.4, duration: 0.1 })
        tl.to(tempVal, { value: 0, duration: 0.05 })

        const interval = setInterval(() => {
            if (flag) tl.restart()
            flag = !flag
        }, 1500)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={`page ${styles.container}`}>
            <img className={styles.picture} src="https://luoyisen.com/share/imgs/01.jpg" alt="IKE" />
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter
                        id="noise"
                        x="-0%"
                        y="-0%"
                        width="100%"
                        height="100%"
                        filterUnits="objectBoundingBox"
                        primitiveUnits="userSpaceOnUse"
                        colorInterpolationFilters="linearRGB"
                    >
                        <feTurbulence
                            type="turbulence"
                            baseFrequency={`0 ${val.value}`}
                            numOctaves="2"
                            seed="2"
                            stitchTiles="stitch"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            result="turbulence1"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="30"
                            xChannelSelector="R"
                            yChannelSelector="B"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            result="displacementMap"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}

export const Component = MISU7
