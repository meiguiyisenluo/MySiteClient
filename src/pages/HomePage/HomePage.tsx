import React from 'react'
import DateDisplay from '../../components/DateDisplay'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-vant'
import styles from './HomePage.module.scss'

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.btns}>
                <Button className="btn" type="primary" plain round shadow={1} hairline onClick={() => navigate('/faceSymmetry')}>
                    脸对称测试
                </Button>
            </div>
            <DateDisplay />
        </div>
    )
}

export default HomePage
