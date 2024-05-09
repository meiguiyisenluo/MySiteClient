import { createReducer } from '@reduxjs/toolkit'
import { setContents, setBrowserInfo } from '../actions/data'

interface DataReducer {
    contents: string[]
    browserInfo: object
}

const initialState: DataReducer = {
    contents: [],
    browserInfo: {}
}

const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
    builder.addCase(setContents, (state, action) => {
        state.contents = action.payload
    })
    builder.addCase(setBrowserInfo, (state, action) => {
        state.browserInfo = action.payload
    })
})

export default dataReducer
