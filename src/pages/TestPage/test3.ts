/* eslint-disable @typescript-eslint/no-explicit-any */
function sum(a: number, b: number) {
    return a + b
}
declare function debounce<T extends Array<any>>(fn: (...arg: T) => any, delay: number): (...arg: T) => void

const dSum = debounce(sum, 1000)
const a = dSum(1, 2)
a
