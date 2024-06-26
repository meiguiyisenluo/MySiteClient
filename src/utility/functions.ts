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
