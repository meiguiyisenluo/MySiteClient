import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
    }
}
const getSnapshot = () => {
    return navigator.onLine
}

const getServerSnapShot = () => {
    return navigator.onLine
}

const useScreenSize = () => {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapShot)
}

export default useScreenSize
