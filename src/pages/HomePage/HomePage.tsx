import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonType } from 'react-vant'
import styles from './HomePage.module.scss'
import { ROUTES, TITLES, AUTHORITY } from '@/resources/routes-constants'
import DateDisplay from '@/components/DateDisplay'
import { random } from '@/utility/functions'

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const typeList = useRef<Array<ButtonType>>(['primary', 'info', 'warning', 'danger'])
    const round = Math.random() > 0.5
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.btns}>
                {Object.values(ROUTES).map((_) => {
                    const type: ButtonType = typeList.current[random(0, typeList.current.length - 1)]
                    const plain = Math.random() > 0.5
                    const hairline = Math.random() > 0.5
                    return (
                        AUTHORITY[_] && (
                            <Button key={_} className="btn" type={type} plain={plain} round={round} hairline={hairline} shadow={1} onClick={() => navigate(_)}>
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
