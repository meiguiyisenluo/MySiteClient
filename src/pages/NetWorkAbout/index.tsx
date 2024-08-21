import React, { useRef, useEffect, useState, MouseEvent } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Cell, Input, Button, Toast, Loading } from 'react-vant'
import { getIpv4, dnsResolve } from '@/resources/api-constants'
import useOneline from '@/hooks/useOnline'

import styles from './index.module.scss'

export const loader = async () => {
    return getIpv4()
        .then((res) => res.data)
        .catch(() => ({}))
}

const NetWorkAbout: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [hostname, setHostname] = useState('luoyisen.com')
    const [ip, setIp] = useState('')
    const [dnsIp, setDnsIp] = useState<
        Array<{ dnsName: string; officialWebsite: string; remark: string; status: number; error: string; addresses: Array<string> }>
    >([])

    const loaderData = useLoaderData() as { ip: string }
    useEffect(() => {
        setIp(loaderData.ip)
    }, [setIp, loaderData])

    const onResolve = () => {
        if (!hostname) return Toast('请输入要解析的域名')
        setLoading(true)
        setDnsIp([])
        dnsResolve({ hostname })
            .then((res) => {
                setDnsIp(res.data)
                Toast('查询成功，点击ip可复制到剪切板，点击地址可跳转')
            })
            .finally(() => setLoading(false))
    }

    const jumpToOfficialWebsite = (e: MouseEvent<HTMLSpanElement>, url: string) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(url)
    }

    const copyIp = (e: MouseEvent<HTMLSpanElement>, ip: string) => {
        e.preventDefault()
        e.stopPropagation()
        navigator.clipboard
            .writeText(ip)
            .then(() => Toast('复制成功'))
            .catch(() => Toast('复制失败'))
    }

    const interval = useRef<NodeJS.Timeout>(null!)
    const [connectionObj, setConnectionObj] = useState({
        downlink: 10,
        effectiveType: '4g',
        rtt: 50
    })
    const isOnline = useOneline()
    useEffect(() => {
        interval.current = setInterval(() => {
            // @ts-ignore
            const { downlink, effectiveType, rtt } = navigator.connection
            setConnectionObj({ downlink, effectiveType, rtt })
            return () => {
                if (interval) clearInterval(interval.current)
            }
        }, 500)
    }, [])

    return (
        <div className={`page ${styles.container}`}>
            <Cell
                className={styles.hd}
                value={
                    <div className={styles.connection}>
                        {isOnline ? (
                            <>
                                <span>网络状态: {connectionObj.effectiveType}</span>
                                <span>延迟: {connectionObj.rtt}ms</span>
                                <span>带宽: {connectionObj.downlink}Mb/s</span>
                            </>
                        ) : (
                            <>
                                <span>离线</span>
                            </>
                        )}
                    </div>
                }
            />
            <Cell
                className={styles.hd}
                center
                title={ip}
                value={
                    <Input
                        value={hostname}
                        onChange={setHostname}
                        placeholder="请输入你需要解析的ip"
                        suffix={
                            <Button size="small" type="primary" disabled={loading} onClick={onResolve}>
                                解析
                            </Button>
                        }
                    />
                }
            />

            <div className={styles.content}>
                {loading ? (
                    <div className={styles.loading}>
                        <Loading type="ball" />
                    </div>
                ) : (
                    <div className={styles.items}>
                        {dnsIp.map((item, idx) => (
                            <Cell
                                key={idx}
                                className={styles.item}
                                title={item.dnsName}
                                value={
                                    <div>
                                        {item.remark}:{' '}
                                        <span className={styles.officialWebsite} onClick={(e) => jumpToOfficialWebsite(e, item.officialWebsite)}>
                                            {item.officialWebsite}
                                        </span>
                                    </div>
                                }
                                label={
                                    <>
                                        {item.status === 200 &&
                                            item.addresses.map((ip: string, index: number) => (
                                                <div key={index}>
                                                    <span className={styles.ips} onClick={(e) => copyIp(e, ip)}>
                                                        {ip}
                                                    </span>
                                                </div>
                                            ))}
                                        {item.status === 500 && item.error}
                                    </>
                                }
                            ></Cell>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export const Component = NetWorkAbout
