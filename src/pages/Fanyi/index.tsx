import React, { useEffect, useRef, useState, useMemo, MouseEventHandler } from 'react'
import { Cell, Input, Toast, Picker, Field } from 'react-vant'
import { debounce } from 'lodash'
import { youdaoTranslate } from '@/resources/api-constants'
import styles from './index.module.scss'

import img_01 from './assets/imgs/01.png'

const langs = [
    { text: '中文', value: 'zh' },
    { text: '英文', value: 'en' }
]

const Youdaofanyi: React.FC = () => {
    const [langpair, setLangpair] = useState<string[]>(['zh', 'en'])
    const [text, setText] = useState<string>('')
    const [result, setResult] = useState<Array<{ translation: string }>>([])

    const translate = useRef(
        debounce((val) => {
            if (!val) return
            youdaoTranslate({ text: val, langpair: langpair.join('|') })
                .then((res) => {
                    if (res.status !== 200) return
                    console.log(res.data.matches)
                    setResult(res.data.matches)
                })
                .catch((err) => {
                    console.error(err)
                    Toast('翻译失败')
                })
        }, 500)
    )

    const spell = (text: string) => {
        const msg = new SpeechSynthesisUtterance()
        msg.text = text
        window.speechSynthesis.speak(msg)
    }

    const langpairText = useMemo(() => {
        return langpair.map((_) => langs.find((lang) => lang.value == _)?.text).join(' -> ')
    }, [langpair])

    useEffect(() => {
        if (text) translate.current(text)
    }, [text])

    return (
        <div className={`page ${styles.container}`}>
            <Cell>
                <Picker
                    popup={{
                        round: true
                    }}
                    value={langpair}
                    columns={[langs, langs]}
                    onChange={setLangpair}
                >
                    {(a, b, actions) => {
                        return <Field readOnly clickable label="选择语言" placeholder="请选择语言" value={langpairText} onClick={() => actions.open()}></Field>
                    }}
                </Picker>
            </Cell>
            <br />
            <Cell>
                <Input.TextArea value={text} onChange={setText} showWordLimit autoSize placeholder="输入要翻译的文本" />
            </Cell>
            <Cell>
                {result.map((_, idx) => {
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
                })}
            </Cell>
        </div>
    )
}

export const Component = Youdaofanyi
