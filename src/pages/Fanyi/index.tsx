import React, { useState, useMemo } from 'react'
import { Cell, Input, Toast, Picker, Field, Button, Loading } from 'react-vant'
import { youdaoTranslate } from '@/resources/api-constants'
import styles from './index.module.scss'

import img_01 from './assets/imgs/01.png'

const langs = [
    { text: '中文', value: 'zh' },
    { text: '英文', value: 'en' }
]

const Youdaofanyi: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [langpair, setLangpair] = useState<string[]>(['zh', 'en'])
    const [text, setText] = useState<string>('')
    const [result, setResult] = useState<Array<{ translation: string }>>([])

    const translate = () => {
        if (!text) return
        const data = { text, langpair: langpair.join('|') }
        setLoading(true)
        youdaoTranslate(data)
            .then((res) => {
                if (res.status !== 200) return
                console.log(res.data.matches)
                setResult(res.data.matches)
            })
            .catch((err) => {
                console.error(err)
                Toast('翻译失败')
            })
            .finally(() => setLoading(false))
    }

    const spell = (text: string) => {
        const msg = new SpeechSynthesisUtterance()
        msg.text = text
        window.speechSynthesis.speak(msg)
    }

    const langpairText = useMemo(() => {
        return langpair.map((_) => langs.find((lang) => lang.value == _)?.text).join(' -> ')
    }, [langpair])

    return (
        <div className={`page ${styles.container}`}>
            <Cell>
                <div className={styles.operation}>
                    <Picker
                        popup={{
                            round: true
                        }}
                        value={langpair}
                        columns={[langs, langs]}
                        onConfirm={setLangpair}
                    >
                        {(a, b, actions) => {
                            return (
                                <Field readOnly clickable label="选择语言" placeholder="请选择语言" value={langpairText} onClick={() => actions.open()}></Field>
                            )
                        }}
                    </Picker>
                    <div>
                        <Button size="small" round type="primary" onClick={()=>spell(text)}>
                            朗读
                        </Button>
                        <Button size="small" round type="primary" disabled={loading} onClick={translate}>
                            翻译
                        </Button>
                    </div>
                </div>
            </Cell>
            <br />
            <Cell>
                <Input.TextArea className={styles.ipt} value={text} onChange={setText} showWordLimit autoSize placeholder="输入要翻译的文本" />
            </Cell>
            <Cell>
                {loading ? (
                    <div className={styles.loading}>
                        <Loading type="ball" />
                    </div>
                ) : (
                    result.map((_, idx) => {
                        return (
                            <div key={idx}>
                                <h2>{idx === 0 && '最佳匹配'}</h2>
                                <h2>{idx === 1 && '其余翻译'}</h2>
                                <div className={styles.result_item}>
                                    <span>{_.translation}</span>
                                    <img src={img_01} alt="img_01" onClick={() => spell(_.translation)} />
                                </div>
                            </div>
                        )
                    })
                )}
            </Cell>
        </div>
    )
}

export const Component = Youdaofanyi
