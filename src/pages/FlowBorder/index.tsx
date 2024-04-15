import React from 'react'
import styles from './index.module.scss'

import DateDisplay from '@/components/DateDisplay'

const FaceSymmetry: React.FC = () => {
    return (
        <div className={`page`}>
            <div className={styles.box}>
                <div className={styles.bg}></div>
                <div className={styles.content}>
                    <DateDisplay />
                </div>
            </div>
        </div>
    )
}
export default FaceSymmetry
