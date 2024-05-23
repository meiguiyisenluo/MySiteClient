/* eslint-disable @typescript-eslint/no-explicit-any */
type Fans = {
    call: any
}

type IKun = {
    sing: any
    dance: any
    basketball: any
} & Fans

type SuperIKun = {
    rap: any
} & IKun

const superIKun: SuperIKun = {
    call: '',
    sing: '',
    dance: '',
    basketball: '',
    rap: ''
}

const ikun: IKun = {
    call: 'call',
    sing: 'sing',
    dance: 'dance',
    basketball: 'basketball'
}

// for (const k in ikun) {
//     superIKun[k] = ikun[k]
// }

Object.assign(superIKun, ikun)

type ChangedEvents<T> = { [K in Extract<keyof T, string> as `${K}Changed`]: Array<any> }
const superIKunEvents = {} as ChangedEvents<SuperIKun>

superIKunEvents
