import React, { useState, useRef } from 'react'
import { Button, Input, Slider, Cell } from 'react-vant'

const AutoSound: React.FC = () => {
    const [text, setText] = useState<string>('只因')
    const [volume, setVolume] = useState<number>(1)
    const [rate, setRate] = useState<number>(1)
    const [pitch, setPitch] = useState<number>(1)
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

    const [disabled, setDisabled] = useState<boolean>(false)

    const voices = useRef<Array<SpeechSynthesisVoice>>(window.speechSynthesis.getVoices())

    const onclickHandler = () => {
        setDisabled(true)
        const msg = new SpeechSynthesisUtterance()
        msg.text = text
        msg.rate = rate // 1 - 10
        msg.volume = volume // 0 - 1
        msg.pitch = 1 // 0 - 2
        msg.voice = voice
        msg.onend = function () {
            setDisabled(false)
        }
        window.speechSynthesis.speak(msg)
    }

    return (
        <div className={`page`} style={{ padding: '1rem' }}>
            <Input.TextArea value={text} onChange={setText} placeholder="请输入...." autoSize />
            <h3>音量: {volume}</h3>
            <Slider value={volume} onChange={setVolume} min={0} max={1} step={0.1} />
            <h3>倍速: {rate}</h3>
            <Slider value={rate} onChange={setRate} min={1} max={10} step={1} />
            <h3>pitch: {pitch}</h3>
            <Slider value={pitch} onChange={setPitch} min={0} max={2} step={1} />

            <h3>voice: {voice?.name}</h3>
            <div
                style={{
                    width: '100%',
                    height: '6rem',
                    overflow: 'auto'
                }}
            >
                {voices.current.map((_: SpeechSynthesisVoice) => (
                    <Cell key={_.voiceURI} title={_.name} onClick={() => setVoice(_)} />
                ))}
            </div>
            <Button style={{ marginTop: '3rem' }} shadow={1} plain round disabled={disabled} onClick={onclickHandler}>
                开始朗读
            </Button>
        </div>
    )
}

export const Component = AutoSound
