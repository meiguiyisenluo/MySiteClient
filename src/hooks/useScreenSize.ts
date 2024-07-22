import { useSyncExternalStore, useState } from 'react'

const useScreenSize = () => {
    const [size, setSize] = useState({
        windowInnerWidth: window.innerWidth,
        windowInnerHeight: window.innerHeight
    })

    return useSyncExternalStore(
        (cb) => {
            const callback = () => {
                setSize({
                    windowInnerWidth: window.innerWidth,
                    windowInnerHeight: window.innerHeight
                })
                cb()
            }
            window.addEventListener('resize', callback)
            return () => {
                window.removeEventListener('resize', callback)
            }
        },
        () => {
            return size
        },
        () => {
            return size
        }
    )
}

export default useScreenSize
