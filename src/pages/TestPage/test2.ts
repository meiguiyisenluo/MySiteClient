/* eslint-disable @typescript-eslint/no-explicit-any */
type EventName<K extends string> = `${K}Changed`

type Listener<T> = (oldValue: T, newValue: T) => void

type Listeners<T> = { [K in string & keyof T as EventName<K>]?: Array<Listener<T[K]>> }

type Watcher<T> = {
    on: <K extends string & keyof T>(event: EventName<K>, listener: Listener<T[K]>) => void
}

function watch<T, K extends Extract<keyof T, string>>(obj: T): Watcher<T> {
    const listeners: Listeners<T> = {}
    for (const key in obj) {
        let value = obj[key]
        const event = `${key}Changed` as EventName<K>
        listeners[event] = [] as any

        Object.defineProperty(obj, key, {
            get() {
                return value
            },
            set(val) {
                const queue = listeners[event] as any
                queue.forEach((_: any) => _(value, val))
                value = val
            }
        })
    }
    return {
        on(event, listener): void {
            const queue = listeners[event] as any
            queue.push(listener)
        }
    }
}

const obj: {
    name: string | undefined
    age: number | undefined
} = {
    name: undefined,
    age: undefined
}

const watcher = watch(obj)
watcher.on('ageChanged', (oldValue, newValue) => {
    console.log(oldValue, newValue)
})

obj.name = 'lys'
obj.name = 'hys'
console.log(obj)

export default {}
