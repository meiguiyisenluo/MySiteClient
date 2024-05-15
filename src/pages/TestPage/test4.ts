type EventName<K extends string> = `${K}Changed`

function setArr<T>(obj: T) {
    type SrcObj = {
        [K in Extract<keyof T, string> as EventName<K>]: Array<T[K]>
    }
    const srcObj: SrcObj = {} as SrcObj

    for (const key in obj) {
        // srcObj[`${key}Changed`] = []
        const queue = srcObj[`${key}Changed`]
        console.log(queue)
    }
}

setArr({ a: 'a', b: 'b' })

export default {}
