import { useSyncExternalStore } from 'react'

const size = {
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight
}

const subscribe = (cb: () => void) => {
    const setSize = () => {
        size.windowInnerWidth = window.innerWidth
        size.windowInnerHeight = window.innerHeight
        cb()
    }
    window.addEventListener('resize', setSize)
    return () => {
        window.removeEventListener('resize', setSize)
    }
}

const getSnapshot = () => {
    return size
}

const getServerSnapShot = () => {
    return size
}

const useScreenSize = () => {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapShot)
}

export default useScreenSize
