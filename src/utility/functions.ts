/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
    return 'Welcome ' + userName + '!'
}

export const random = (min: number, max: number): number => {
    return min + Math.floor(Math.random() * (max - min + 1))
}

export const loadImg = (src: string): Promise<Event> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getType(data: any) {
    return Object.prototype.toString.call(data).replace(/\[object (.*)\]/, '$1')
}
