import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

const SvgStrokeAnimation: React.FC = () => {
    const circleRef = useRef<SVGCircleElement>(null!)
    useEffect(() => {
        const l = Math.ceil(circleRef.current.getTotalLength() + 1).toString()
        circleRef.current.style.setProperty('--l', l)
    }, [])
    return (
        <div className={`page ${styles.container}`}>
            <svg width={200} height={200}>
                <circle ref={circleRef} className={styles.circle} cx="50%" cy="50%" r="40" fill="none" stroke="#000" strokeWidth={3}></circle>
            </svg>
        </div>
    )
}

export const Component = SvgStrokeAnimation
