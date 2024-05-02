import React from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import styles from './index.module.scss'

gsap.registerPlugin(ScrollTrigger)

const imgs = require.context('./assets/imgs/JayChou@.1')

const Jay: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.cards}>
                {imgs.keys().map((item, idx) => (
                    <div key={idx} className={styles.card}>
                        <img src={imgs(item)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jay
