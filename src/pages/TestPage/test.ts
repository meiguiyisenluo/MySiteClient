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
