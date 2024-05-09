import React from 'react'
import styles from './index.module.scss'
import { test as testApi } from '@/resources/api-constants'
import { useAppSelector, useAppDispatch } from '@/store/reducers/store'
import { setContents } from '@/store/actions/data'

import './test'

const TestPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const contents = useAppSelector((state) => state.data.contents)

    const test = () => {
        dispatch(setContents([...contents, 'hello redux']))
        testApi()
    }
    return (
        <div className={styles.list}>
            {contents.map((item, idx) => (
                <div key={idx}>{item}</div>
            ))}
            <button onClick={test}>test</button>
        </div>
    )
}

export default TestPage
