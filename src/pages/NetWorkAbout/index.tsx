import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Cell, Input, Button, Toast, Loading } from 'react-vant'
import { getIpv4, dnsResolve } from '@/resources/api-constants'

import styles from './index.module.scss'

export const loader = async () => {
    const res = await getIpv4()
    if (200 > res.status && res.status >= 300) return {}
    else return res.data
}

const NetWorkAbout: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [hostname, setHostname] = useState('luoyisen.com')
    const [ip, setIp] = useState('')
    const [dnsIp, setDnsIp] = useState<Array<{ dnsName: string; remark: string; status: number; error: string; addresses: Array<string> }>>([])

    const loaderData = useLoaderData() as { ip: string }
    useEffect(() => {
        setIp(loaderData.ip)
    }, [setIp, loaderData])

    const onResolve = () => {
        if (!hostname) return Toast('请输入要解析的域名')
        setLoading(true)
        setDnsIp([])
        dnsResolve({ hostname })
            .then((res) => setDnsIp(res.data))
            .finally(() => setLoading(false))
    }

    return (
        <div className={`page ${styles.container}`}>
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
                                value={item.remark}
                                label={
                                    <>
                                        {}
                                        {item.status === 200 && item.addresses.map((ip: string, index: number) => <div key={index}>{ip}</div>)}
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