import React, { useRef } from 'react'
import styles from './index.module.scss'

import qrcodeImg from '@/assets/imgs/01.jpg'

const images = require.context('@/assets/imgs')
console.log(images.keys())

const WechatFeatLazy: React.FC = () => {
    const urls = useRef([
        {
            disable: true,
            url: 'https://servicewechat.com/wx3409afc4699263a4/pages/index/index.html'
        },
        {
            disable: true,
            url: 'weixin://dl/business/?appid=wx3409afc4699263a4'
        },
        {
            disable: true,
            url: '#小程序://移动云手机/bMlRVCDSat9IyQI'
        },
        {
            disable: true,
            url: 'weixin://#小程序://移动云手机/bMlRVCDSat9IyQI'
        },
        {
            disable: true,
            url: "weixin://dl/openLink?url='#小程序://移动云手机/bMlRVCDSat9IyQI'" //
        },
        {
            disable: false,
            url: 'weixin://scanqrcode' // 扫码
        },
        {
            disable: true,
            url: 'weixin://dl/voiceCall' //
        },
        {
            disable: true,
            url: 'weixin://dl/voiceNavigation' //
        },
        {
            disable: true,
            url: 'weixin://dl/business?appid=wx3409afc4699263a4' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/stickers' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/games' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/moments' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/add' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/shopping' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/groupchat' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/scan' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/profile' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/settings' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/general' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/help' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/notifications' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/terms' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/chat' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/features' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/clear' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/feedback' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/faq' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/recommendation' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/groups' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/tags' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/officialaccounts' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/posts' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/favorites' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/privacy' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/security' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/wallet' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/wechatout' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/protection' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/card' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/about' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/blacklist' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/textsize' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/sight' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/languages' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/chathistory' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/bindqq' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/bindmobile' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/bindemail' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/securityassistant' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/broadcastmessage' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/setname' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/myQRcode' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/myaddress' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/hidemoments' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/blockmoments' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/stickersetting' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/log' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/wechatoutcoupon' // 对不起，当前页面无法访问
        },
        {
            disable: true,
            url: 'weixin://dl/login/phone_view' //
        },
        {
            disable: true,
            url: 'weixin://dl/login/common_view' //
        },
        {
            disable: true,
            url: 'weixin://dl/businessPay' // invalid_source
        },
        {
            disable: true,
            url: 'weixin://dl/businessGame/detail/' // invalid_source
        },
        {
            disable: true,
            url: 'weixin://dl/businessGame/library' // invalid_source
        },
        {
            disable: true,
            url: 'weixin://dl/businessWebview/link' // invalid_source
        },
        {
            disable: true,
            url: 'weixin://dl/businessTempSession/' // invalid_source
        },
        {
            disable: true,
            url: 'weixin://dl/update_newest_version' // 对不起，当前页面无法访问
        }
    ])

    return (
        <div className={`page ${styles.container}`}>
            <h3>放张二维码，测试扫码用</h3>
            <div className={styles.qrcode}>
                <img src={qrcodeImg} alt="" />
            </div>
            <div className={styles.tips}>请长按二维码保存</div>
            <h3>一些weixin协议，红色的已失效</h3>
            <div className={styles.list}>
                {urls.current.map((item, idx) => (
                    <div key={idx} className={`${styles.item} ${item.disable ? styles.disable : ''}`}>
                        {item.url}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WechatFeatLazy
