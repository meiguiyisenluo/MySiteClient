import React, { useEffect, useState } from 'react'
import fingerprint from '@fingerprintjs/fingerprintjs'

const BrowserFingerprint: React.FC = () => {
    const [visitorId, setVisitorId] = useState<string>('')
    useEffect(() => {
        fingerprint
            .load()
            .then((_) => _.get())
            .then((res) => setVisitorId(res.visitorId))
    }, [])
    return <div>{visitorId}</div>
}
export default BrowserFingerprint
