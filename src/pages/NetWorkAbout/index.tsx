import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Cell, Input, Button, Toast } from 'react-vant'
import { getIpv4, dnsResolve } from '@/resources/api-constants'

const NetWorkAbout: React.FC = () => {
    const [hostname, setHostname] = useState('luoyisen.com')
    const [ip, setIp] = useState('')
    const [dnsIp, setDnsIp] = useState<Array<string>>([])

    const loaderData = useLoaderData() as { ip: string }
    useEffect(() => {
        setIp(loaderData.ip)
    }, [setIp, loaderData])

    const onResolve = () => {
        if (!hostname) return Toast('请输入要解析的域名')
        dnsResolve({ hostname }).then((res) => setDnsIp(res.data.addresses))
    }

    return (
        <div className={`page`}>
            <Cell> 你的ip是: {ip} </Cell>

            <Cell>
                <Input
                    value={hostname}
                    onChange={setHostname}
                    placeholder="请输入你需要解析的ip"
                    suffix={
                        <Button size="small" type="primary" onClick={onResolve}>
                            解析
                        </Button>
                    }
                />
            </Cell>

            <Cell>
                {dnsIp.map((ip, idx) => (
                    <Cell key={idx}>{ip}</Cell>
                ))}
            </Cell>
        </div>
    )
}
export const Component = NetWorkAbout

export const loader = async () => {
    const res = await getIpv4()
    return res.data
}
