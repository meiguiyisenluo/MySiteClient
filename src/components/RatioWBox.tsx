import React from 'react'

const RatioWBox: React.FC<{ children: React.ReactElement; wh_ratio: number }> = (props) => {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ paddingTop: props.wh_ratio + '%', position: 'relative' }}>
                <div style={{ width: '100%', height: '100%', position: 'absolute', left: '0', top: '0' }}>{props.children}</div>
            </div>
        </div>
    )
}

export default RatioWBox
