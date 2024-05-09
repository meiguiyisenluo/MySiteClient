import { createAction } from '@reduxjs/toolkit'

export const setContents = createAction<string[]>('data/setContents')

export const setBrowserInfo = createAction<object>('data/setBrowserInfo')
