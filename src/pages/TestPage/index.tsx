import React, { useState, AnimationEventHandler, useRef } from 'react'
import styles from './index.module.scss'

const TestPage: React.FC = () => {
    const animationContentDiv = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(true)

    const onClickHandler = () => {
        if (isPaused) {
            setIsPaused(false)
        }
    }

    const onAnimationEndHandler_content: AnimationEventHandler<HTMLDivElement> = (e) => {
        if (e.animationName.includes('content_animate_reverse')) {
            setIsPaused(true)
        }
    }

    return (
        <div className={`page ${styles.container}`}>
            <button onClick={onClickHandler}>trigger</button>
            <div className={styles.ball}>
                <div className={styles.bd}>
                    <div className={styles.bg}></div>
                    <div
                        ref={animationContentDiv}
                        className={`${styles.content} ${isPaused ? styles.paused : ''}`}
                        onAnimationEnd={onAnimationEndHandler_content}
                    >
                        <span>更多精彩尽在这里</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Component = TestPage
