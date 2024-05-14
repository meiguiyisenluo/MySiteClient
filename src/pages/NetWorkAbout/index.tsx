import React, { useEffect, useState } from 'react'
import { Cell, Input, Button, Toast } from 'react-vant'
import { getIpv4, dnsResolve } from '@/resources/api-constants'

const NetWorkAbout: React.FC = () => {
    const [hostname, setHostname] = useState('luoyisen.com')
    const [ip, setIp] = useState('')
    const [dnsIp, setDnsIp] = useState<Array<string>>([])

    const onResolve = () => {
        if (!hostname) return Toast('请输入要解析的域名')
        dnsResolve({ hostname }).then((res) => setDnsIp(res.data.addresses))
    }

    useEffect(() => {
        getIpv4().then((res) => setIp(res.data.ip))
    }, [])

    return (
        <div>
            <Cell> 你的ip是: {ip} </Cell>

            <Cell>
                <Input
                    value={hostname}
                    type="tel"
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
export default NetWorkAbout
