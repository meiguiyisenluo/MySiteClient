import React from 'react'
import styles from './index.module.scss'

const Sudoku: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.box}>
                {Array.from({ length: 9 }).map((item, idx) => (
                    <div key={idx} className={styles.item}>
                        {idx + 1}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const Component = Sudoku
