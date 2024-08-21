import React, { useState } from 'react'
import styles from './index.module.scss'

import BigNumber from 'bignumber.js'
import { Input, Cell, Button, Picker } from 'react-vant'

const Gerensuodeshui: React.FC = () => {
    const [batchItem, setBatchItem] = useState('a')
    const [batchVal, setBatchVal] = useState('0')

    const [list, setList] = useState(
        Array.from({ length: 12 }, () => ({
            // 收入
            a: '0',
            // 免税收入
            b: '0',
            // 减除费用
            c: '0',
            // 专项扣除
            d: '0',
            // 专项附加扣除
            e: '0',
            // 依法确定的其他扣除
            f: '0',
            // 减免税额
            g: '0'
        }))
    )

    const resList: Array<{
        res: string
        shui: string
        per: number
        num: number
    }> = []
    let ta = BigNumber(0),
        tb = BigNumber(0),
        tc = BigNumber(0),
        td = BigNumber(0),
        te = BigNumber(0),
        tf = BigNumber(0),
        tg = BigNumber(0)
    for (let i = 0; i < list.length; i++) {
        const item = list[i]
        ta = ta.plus(item.a)
        tb = tb.plus(item.b)
        tc = tc.plus(item.c)
        td = td.plus(item.d)
        te = te.plus(item.e)
        tf = tf.plus(item.f)
        tg = tg.plus(item.g)
        const res = ta
            .minus(5000 * (i + 1))
            .minus(tb.toNumber())
            .minus(tc.toNumber())
            .minus(td.toNumber())
            .minus(te.toNumber())
            .minus(tf.toNumber())
            .minus(tg.toNumber())

        let per = 0,
            num = 0
        if (res.isLessThan(0)) {
            per = 0
            num = 0
        } else if (res.isLessThanOrEqualTo(36000)) {
            per = 0.03
            num = 0
        } else if (res.isLessThanOrEqualTo(144000)) {
            per = 0.1
            num = 2520
        } else if (res.isLessThanOrEqualTo(300000)) {
            per = 0.2
            num = 16920
        } else if (res.isLessThanOrEqualTo(420000)) {
            per = 0.25
            num = 31920
        } else if (res.isLessThanOrEqualTo(660000)) {
            per = 0.3
            num = 52920
        } else if (res.isLessThanOrEqualTo(960000)) {
            per = 0.35
            num = 85920
        } else {
            per = 0.45
            num = 181920
        }

        let res2 = res.multipliedBy(per).minus(num).minus(item.g)

        for (let i = 0; i < resList.length; i++) {
            res2 = res2.minus(resList[i].shui)
        }

        resList.push({
            res: list
                .slice(0, i + 1)
                .reduce((total, item) => total.plus(item.a), BigNumber(0))
                .toFixed(2),
            shui: res2.toFixed(2),
            per,
            num
        })
    }

    const totalIn = list.reduce((total, item) => total.plus(item.a), BigNumber(0)).toNumber()
    const totalShui = resList.reduce((total, item) => total.plus(item.shui), BigNumber(0)).toNumber()

    const onchange = (idx: number, key: string, val: string) => {
        setList([
            ...list.slice(0, idx),
            {
                ...list[idx],
                [key]: val
            },
            ...list.slice(idx + 1)
        ])
    }

    const batchInput = () => {
        setList(list.map((item) => ({ ...item, [batchItem]: batchVal })))
        setBatchVal('0')
    }

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.tips}>
                * 计算公式参考
                <a href="https://www.gerensuodeshui.cn/calc/1149.html#:~:text=%E5%8D%B3%EF%BC%8C%E5%9C%A8%E7%BA%B3%E7%A8%8E%E4%BA%BA%E7%B4%AF%E8%AE%A1%E6%94%B6%E5%85%A5%E4%B8%8D%E8%B6%85%E8%BF%876%E4%B8%87%E5%85%83%E7%9A%84%E6%9C%88%E4%BB%BD%EF%BC%8C%E6%9A%82%E4%B8%8D%E9%A2%84%E6%89%A3%E9%A2%84%E7%BC%B4%E4%B8%AA%E4%BA%BA%E6%89%80%E5%BE%97%E7%A8%8E%EF%BC%9B%E5%9C%A8%E5%85%B6%E7%B4%AF%E8%AE%A1%E6%94%B6%E5%85%A5%E8%B6%85%E8%BF%876%E4%B8%87%E5%85%83%E7%9A%84%E5%BD%93%E6%9C%88%E5%8F%8A%E5%B9%B4%E5%86%85%E5%90%8E%E7%BB%AD%E6%9C%88%E4%BB%BD%EF%BC%8C%E5%86%8D%E9%A2%84%E6%89%A3%E9%A2%84%E7%BC%B4%E4%B8%AA%E4%BA%BA%E6%89%80%E5%BE%97%E7%A8%8E%E3%80%82%20%E6%80%BB%E7%BB%93%E4%B8%80%E4%B8%8B%EF%BC%8C%E5%A6%82%E6%9E%9C%E8%A6%81%E6%8C%89%E7%85%A76%E4%B8%87%E6%89%A3%E9%99%A4%EF%BC%8C%E9%9C%80%E5%90%8C%E6%97%B6%E6%BB%A1%E8%B6%B3%E4%B8%89%E4%B8%AA%E6%9D%A1%E4%BB%B6%EF%BC%9A,%EF%BC%881%EF%BC%89%E4%B8%8A%E4%B8%80%E7%BA%B3%E7%A8%8E%E5%B9%B4%E5%BA%A61-12%E6%9C%88%E5%9D%87%E5%9C%A8%E5%90%8C%E4%B8%80%E5%8D%95%E4%BD%8D%E4%BB%BB%E8%81%8C%E4%B8%94%E7%94%B3%E6%8A%A5%E4%BA%86%E5%B7%A5%E8%B5%84%E8%96%AA%E9%87%91%E6%89%80%E5%BE%97%E4%B8%AA%E4%BA%BA%E6%89%80%E5%BE%97%E7%A8%8E%EF%BC%9B%20%EF%BC%882%EF%BC%89%E4%B8%8A%E4%B8%80%E7%BA%B3%E7%A8%8E%E5%B9%B4%E5%BA%A61-12%E6%9C%88%E7%9A%84%E7%B4%AF%E8%AE%A1%E5%B7%A5%E8%B5%84%E8%96%AA%E9%87%91%E6%94%B6%E5%85%A5%EF%BC%88%E5%8C%85%E6%8B%AC%E5%85%A8%E5%B9%B4%E4%B8%80%E6%AC%A1%E6%80%A7%E5%A5%96%E9%87%91%E7%AD%89%E5%90%84%E7%B1%BB%E5%B7%A5%E8%B5%84%E8%96%AA%E9%87%91%E6%89%80%E5%BE%97%EF%BC%8C%E4%B8%94%E4%B8%8D%E6%89%A3%E5%87%8F%E4%BB%BB%E4%BD%95%E8%B4%B9%E7%94%A8%E5%8F%8A%E5%85%8D%E7%A8%8E%E6%94%B6%E5%85%A5%EF%BC%89%E4%B8%8D%E8%B6%85%E8%BF%876%E4%B8%87%E5%85%83%EF%BC%9B%20%EF%BC%883%EF%BC%89%E6%9C%AC%E7%BA%B3%E7%A8%8E%E5%B9%B4%E5%BA%A6%E8%87%AA1%E6%9C%88%E8%B5%B7%EF%BC%8C%E4%BB%8D%E5%9C%A8%E8%AF%A5%E5%8D%95%E4%BD%8D%E4%BB%BB%E8%81%8C%E5%8F%97%E9%9B%87%E5%B9%B6%E5%8F%96%E5%BE%97%E5%B7%A5%E8%B5%84%E8%96%AA%E9%87%91%E6%89%80%E5%BE%97%E3%80%82">
                    这里
                </a>
            </div>
            <div className={styles.tips}>
                * 计算公式摘要
                <br />
                累计预扣预缴应纳税所得额＝累计收入－累计免税收入－累计减除费用－累计专项扣除－累计专项附加扣除－累计依法确定的其他扣除
                <br />
                本期应预扣预缴税额＝（累计预扣预缴应纳税所得额×预扣率－速算扣除数）－累计减免税额－累计已预扣预缴税额
                <br />
            </div>
            <div className={styles.tips}>* 使用说明：五险一金可填入“免税收入”一项</div>

            <div className={styles.batch}>
                <p>批量填入</p>
                <Picker
                    title="选择项"
                    popup={{
                        round: true
                    }}
                    value={batchItem}
                    onConfirm={setBatchItem}
                    columns={[
                        { text: '收入', value: 'a' },
                        { text: '免税收入', value: 'b' },
                        { text: '减除费用', value: 'c' },
                        { text: '专项扣除', value: 'd' },
                        { text: '专项附加扣除', value: 'e' },
                        { text: '依法确定的其他扣除', value: 'f' },
                        { text: '减免税额', value: 'g' }
                    ]}
                >
                    {(val, _, actions) => {
                        // @ts-ignore-next-line
                        return <p onClick={() => actions.open()}>{_.text} </p>
                    }}
                </Picker>
                <span>为</span>
                <Cell>
                    <Input type="number" value={batchVal} onChange={setBatchVal}></Input>
                </Cell>
                <Button type="primary" size="small" onClick={batchInput}>
                    填入
                </Button>
            </div>

            <Cell title={'收入合计'} value={totalIn}></Cell>
            <Cell title={'已申报税额合计'} value={totalShui}></Cell>

            <div className={styles.table}>
                <div className={`${styles.line} ${styles.head}`}>
                    {[
                        '月份',
                        '收入',
                        '免税收入',
                        '减除费用',
                        '专项扣除',
                        '专项附加扣除',
                        '依法确定的其他扣除',
                        '减免税额',
                        '本期应预扣预缴税额',
                        '累计预扣预缴应纳税所得额',
                        '预扣率',
                        '速算扣除数'
                    ].map((item, idx) => (
                        <div key={idx} className={styles.cell}>
                            {item}
                        </div>
                    ))}
                </div>
                {list.map((item, idx) => (
                    <div key={idx} className={styles.line}>
                        <div className={styles.cell}>{idx + 1}月</div>
                        {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((key) => (
                            <div key={key} className={styles.cell}>
                                {/* @ts-ignore-next-line */}
                                <Input value={item[key]} onChange={(val) => onchange(idx, key, val)} type="number" placeholder="请输入" />
                            </div>
                        ))}
                        {['shui', 'res', 'per', 'num'].map((key) => (
                            <div key={key} className={`${styles.cell} ${styles.light}`}>
                                {/* @ts-ignore-next-line */}
                                {resList[idx][key]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export const Component = Gerensuodeshui
