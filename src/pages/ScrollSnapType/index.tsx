import React from 'react'
import styles from './index.module.scss'

const arr = [
    {
        text: 1,
        style: {
            backgroundColor: 'red'
        }
    },
    {
        text: 2,
        style: {
            backgroundColor: 'green'
        }
    },
    {
        text: 3,
        style: {
            backgroundColor: 'blue'
        }
    }
]

const ScrollSnapType: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.slider}>
                {arr.map((_, idx) => (
                    <div key={idx} className={styles.item} style={_.style}>
                        {_.text}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const Component = ScrollSnapType
