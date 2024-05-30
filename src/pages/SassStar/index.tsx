import React from 'react'
import styles from './index.module.scss'

const SassStar: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <div className={`${styles.layer1}`}></div>
            <div className={`${styles.layer2}`}></div>
            <div className={`${styles.layer3}`}></div>
            <div className={`${styles.layer4}`}></div>
            <div className={`${styles.layer5}`}></div>
            <div className={`${styles.layer6}`}>Sass 星空</div>
        </div>
    )
}

export const Component = SassStar
