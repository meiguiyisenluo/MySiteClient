import React from 'react'
import styles from './index.module.scss'

const FaceSymmetry: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <button className={styles.btn} content="边框按钮">边框按钮</button>
        </div>
    )
}
export const Component = FaceSymmetry
