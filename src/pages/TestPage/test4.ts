export type Expect<T extends true> = T

export type Equal1<X, Y> =
    UnionToIntersection<X> extends UnionToIntersection<Y> ? (UnionToIntersection<Y> extends UnionToIntersection<X> ? true : false) : false
export type Equal2<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
// type Test2 = (<T>() => T extends { a: 'a' } ? 1 : 2) extends (<T>() => T extends { readonly a: 'a' } ? 1 : 2) ? true : false

export type UnionToIntersection<U> = (U extends U ? (k: U) => void : never) extends (k: infer I) => void ? I : never
export type Test1 = UnionToIntersection<{ a: 'a' } | { b: 'b' }>
export type Test2 = ((k: { a: 'a' } | { b: 'b' }) => void) extends (k: infer I) => void ? I : never
export type Test3 = ((k: { a: 'a' }) => void) | ((k: { b: 'b' }) => void) extends (k: infer I) => void ? I : never

let obj1: { a: 'a' } = null!
let obj2: { readonly a: 'a' } = null!
const obj3: { readonly a: 'a' } = { a: 'a' }
obj1 = obj3
obj2 = obj3
obj1 = obj2
obj2 = obj1
console.log(obj1, obj2)

export type Cases = [
    Expect<Equal1<1 | 2, 1 | 2>>,
    Expect<Equal1<{ a: 'A' }, { readonly a: 'A' }>>,
    Expect<Equal2<{ a: 'A' }, { a: 'A' }>>,
    Expect<Equal2<UnionToIntersection<{ a: 'a'; b: 'b' } | { b: 'b'; c: 'c' }>, { a: 'a'; b: 'b' } & { b: 'b'; c: 'c' }>>,
    Expect<Equal2<UnionToIntersection<'a' | 'b'>, 'a' & 'b'>>
]
class Animal {
    eat = ''
}

class Dog extends Animal {
    play = ''
}

const changeAnimal = function (animal: Animal) {
    animal
}
let changeDog = function (dog: Dog) {
    dog.play
}

changeDog = changeAnimal
changeDog

export default {}
