type IsEqual1<X, Y> = X extends Y ? (Y extends X ? true : false) : false
type IsEqual2<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type A = IsEqual1<{ a: 'A' }, { readonly a: 'A' }>
type B = IsEqual2<{ a: 'A' }, { readonly a: 'A' }>

type C = IsEqual1<1, 1>
type D = IsEqual2<1, 1>

type E = (()=>2) extends (()=>2) ? true : false

export default {}
