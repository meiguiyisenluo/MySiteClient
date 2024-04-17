import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonType } from 'react-vant'
import styles from './HomePage.module.scss'
import { ROUTES } from '@/resources/routes-constants'
import DateDisplay from '@/components/DateDisplay'
import { random } from '@/utility/functions.ts'

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const typeList = useRef<Array<ButtonType>>(['primary', 'info', 'warning', 'danger'])
    const round = Math.random() > 0.5
    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.btns}>
                {Object.values(ROUTES)
                    .sort((a, b) => a.order - b.order)
                    .map((_) => {
                        const type: ButtonType = typeList.current[random(0, typeList.current.length - 1)]
                        const plain = Math.random() > 0.5
                        const hairline = Math.random() > 0.5
                        return (
                            _.authority && (
                                <Button
                                    key={_.path}
                                    className="btn"
                                    type={type}
                                    plain={plain}
                                    round={round}
                                    hairline={hairline}
                                    shadow={1}
                                    onClick={() => navigate(_.path)}
                                >
                                    {_.name}
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
