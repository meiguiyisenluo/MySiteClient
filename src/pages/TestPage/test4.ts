type EventName<K extends string> = `${K}Changed`

type Listener<T> = (val: T) => void

function eventEmitter<T, K extends Extract<keyof T, string>>(obj: T) {
    type SrcObj = Record<EventName<K>, Array<Listener<T[K]>>>

    const srcObj: SrcObj = {} as SrcObj

    for (const key in obj) {
        const event = `${key}Changed` as EventName<K>
        srcObj[event] = []
    }

    return {
        on(event: EventName<K>, cb: Listener<T[K]>) {
            srcObj[event].push(cb)
        },
        emit(event: EventName<K>) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            srcObj[event].forEach((cb) => cb('123' as any))
        }
    }
}

const emiter = eventEmitter({ a: 'a', b: 'b', age: 18, name: 'lys' })
emiter.on('aChanged', () => {
    console.log('')
})
emiter.emit('aChanged')

export default {}
