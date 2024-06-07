import React from 'react'
import styles from './index.module.scss'
import { testApi1 } from '@/resources/api-constants'
testApi1()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

const TestPage: React.FC = () => {
    return (
        <div className={`page ${styles.container}`}>
            <picture style={{ width: '100%' }}>
                <source
                    srcSet="https://img.youpin.mi-img.com/ferriswheel/2f2df8b7_fccf_4a3d_bf3d_c75fcb21944b.jpeg@base@tag=imgScale&F=webp&h=1320&q=90&w=1080"
                    media="(max-width: 800px)"
                />
                <img
                    style={{ width: '100%' }}
                    src="https://img.youpin.mi-img.com/ferriswheel/46dfafbe_a492_4593_9766_b5c2de0de890.jpeg@base@tag=imgScale&F=webp&h=1080&q=90&w=2560"
                    alt=""
                />
            </picture>
        </div>
    )
}

export const Component = TestPage
