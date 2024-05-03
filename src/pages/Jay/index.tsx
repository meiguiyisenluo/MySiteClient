import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const imgs = require.context('./assets/imgs/JayChou@.1')

const stackHeight = window.innerHeight * 0.25

const Jay: React.FC = () => {
    const cards = useRef<Array<HTMLElement | null>>([])
    const endTrigger = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        cards.current.forEach((card, i) => {
            if (!card) return
            // gsap.fromTo(
            //     card,
            //     {
            //         scale: 1,
            //         transformOrigin: 'center top',
            //         filter: 'blur(0px)'
            //     },
            //     {
            //         y: gsap.utils.mapRange(1, cards.current.length, -20, -stackHeight + 20, cards.current.length - i),
            //         scale: gsap.utils.mapRange(1, cards.current.length, 0.4, 0.9, i),
            //         filter: 'blur(' + gsap.utils.mapRange(1, cards.current.length, 4, 25, cards.current.length - i) + 'px)',
            //         scrollTrigger: {
            //             trigger: card,
            //             markers: false,
            //             scrub: true,
            //             start: 'top ' + stackHeight,
            //             end: '+=' + window.innerHeight * 2,
            //             invalidateOnRefresh: true
            //         }
            //     }
            // )

            ScrollTrigger.create({
                trigger: card,
                scrub: true,
                pin: true,
                markers: true,
                start: 'top ' + stackHeight,
                endTrigger: endTrigger.current, // when the last card finishes its animation, unpin everything
                // end: 'top',
                pinSpacing: false
            })
        })
    }, [])

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.cards}>
                <div className={styles.start_content}>Welcome to Jay</div>
                {imgs.keys().map((item, idx) => (
                    <div key={idx} ref={(el) => (cards.current[idx] = el)} className={styles.card}>
                        <img src={imgs(item)} />
                    </div>
                ))}
                <div ref={endTrigger}></div>
                <div className={styles.end_content}>Thanks for watching</div>
            </div>
        </div>
    )
}

export default Jay
