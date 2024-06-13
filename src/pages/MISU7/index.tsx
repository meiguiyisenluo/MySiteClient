import React from 'react'
import styles from './index.module.scss'
import { testApi1 } from '@/resources/api-constants'
testApi1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

const TestPage: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <picture className={styles.picture}>
                <source srcSet="https://luoyisen.com/share/imgs/xiaomisu7/01.jpeg@base@tag=imgScale&F=webp&h=1320&q=90&w=1080" media="(max-width: 800px)" />
                <img src="https://luoyisen.com/share/imgs/xiaomisu7/02.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=2560" alt="" />
            </picture>
        </div>
    )
}

export const Component = TestPage
