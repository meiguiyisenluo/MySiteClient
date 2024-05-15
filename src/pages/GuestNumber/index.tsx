import React, { useCallback, useEffect, useRef } from 'react'
import { Toast, Image, Button, Input, hooks } from 'react-vant'
import gsap from 'gsap'

import styles from './index.module.scss'

const imgs = require.context('./assets/imgs')

const initState = {
    number: 1,
    start: 0,
    end: 100,
    disabled: false
}

const GuestNumber: React.FC = () => {
    const [state, updateState] = hooks.useSetState(initState)

    const target = useRef<number>(0)

    const resetGame = useCallback(() => {
        updateState(initState)
        target.current = Math.floor(Math.random() * 100)
        console.log(target.current)
    }, [updateState])

    const getAnimation = (from: number, to: number, onUpdate: (num: number) => void) => {
        return new Promise((resolve) => {
            const obj = { num: from }
            const duration = to - from > 10 ? 1 : 0.5
            gsap.to(obj, {
                num: to,
                duration,
                ease: 'ease-in-out',
                onUpdate() {
                    onUpdate(Number(obj.num.toFixed(0)))
                },
                onComplete() {
                    resolve(0)
                }
            })
        })
    }

    const onclickHandler = useCallback(async () => {
        const num = state.number

        if (num <= state.start || num >= state.end) {
            Toast.info({
                className: styles.toast,
                overlay: true,
                closeOnClickOverlay: true,
                duration: 0,
                message: `输入${state.start}到${state.end}之间的数字`,
                icon: <Image width={100} src={imgs('./info.png')} />
            })
            return
        }

        if (num == target.current) {
            Toast.fail({
                className: styles.toast,
                overlay: true,
                closeOnClickOverlay: true,
                duration: 0,
                message: `这你都能选中 ${num}`,
                icon: <Image width={100} src={imgs('./fail.png')} />
            })
            resetGame()
        } else if (num > target.current) {
            updateState({ disabled: true })
            await getAnimation(state.end, state.number, (val: number) => {
                updateState(() => ({ end: val }))
            })
        } else if (num < target.current) {
            updateState({ disabled: true })
            await getAnimation(state.start, state.number, (val: number) => {
                updateState(() => ({ start: val }))
            })
        }

        updateState({ disabled: false })
    }, [updateState, resetGame, state])

    useEffect(() => {
        if (state.end - state.start === 2) {
            Toast.success({
                className: styles.toast,
                overlay: true,
                closeOnClickOverlay: true,
                duration: 0,
                message: '恭喜你通过了游戏,我觉得很赞',
                icon: <Image width={100} src={imgs('./success.jpg')} />
            })
            resetGame()
        }
    }, [resetGame, state.start, state.end])

    useEffect(() => {
        resetGame()
    }, [resetGame])

    return (
        <div className={`page ${styles.container}`}>
            <div className={styles.top}>
                <div className={styles.num}>
                    <div>{String(state.start).padStart(3, '0')}</div>
                </div>
                <div>~</div>
                <div className={styles.num}>
                    <div>{String(state.end).padStart(3, '0')}</div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.tips}>我要选择数字：</div>
                <Input
                    className={styles.ipt}
                    value={String(state.number)}
                    type="number"
                    onChange={(val) => updateState({ number: Number(val) })}
                    placeholder="请输入数字"
                    onFocus={(e) => e.preventDefault()}
                    onBlur={(e) => e.preventDefault()}
                />
                <Button disabled={state.disabled} type="warning" round onClick={onclickHandler}>
                    选择
                </Button>
            </div>
        </div>
    )
}

export const Component = GuestNumber
