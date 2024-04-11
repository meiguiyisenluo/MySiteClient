import React from 'react'
import DateDisplay from '../../components/DateDisplay'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-vant'
import styles from './HomePage.module.scss'
import { ROUTES, TITLES, AUTHORITY } from '../../resources/routes-constants'

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.btns}>
                {Object.values(ROUTES).map((_) => {
                    return (
                        AUTHORITY[_] && (
                            <Button key={_} className="btn" type="primary" plain round shadow={1} hairline onClick={() => navigate(_)}>
                                {TITLES[_]}
                            </Button>
                        )
                    )
                })}
            </div>
            <DateDisplay />
        </div>
    )
}

export default HomePage
