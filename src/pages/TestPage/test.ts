type SrcObjTypes = {
    name: string
    age: number
}
const srcObj: SrcObjTypes = {
    name: 'undefined',
    age: 10
}

function setDatas(obj: Partial<SrcObjTypes>) {
    Object.assign(srcObj, obj)
}
setDatas({ age: 28, name: 'yxy' })
console.log(srcObj)

function watch<T>(obj: { [K in keyof T]: T[K] }): {
    on: <K extends string & keyof T>(event: `${K}Changed`, callback: (oldValue: T[K], newValue: T[K]) => void) => void
} {
    return {
        on(event, cb) {
            const key = event.split('Changed')[0]
            cb(obj[key], obj[key])
        }
    }
}
const watcher = watch(srcObj)
watcher.on('nameChanged', (oldValue, newValue) => {
    console.log(oldValue, newValue)
})

function setData<K extends keyof SrcObjTypes>(key: K, val: SrcObjTypes[K]) {
    srcObj[key] = val
}
setData('age', 28)
setData('name', 'hys')
console.log(srcObj)

type SetObjTypes = {
    [K in keyof SrcObjTypes]: (e: SrcObjTypes[K]) => void
}
const setObj: SetObjTypes = {
    name(val) {
        srcObj.name = val
    },
    age(val) {
        srcObj.age = val
    }
}
setObj.name('lys')
setObj.age(27)
console.log(srcObj)
