import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store, useAppDispatch } from '@/store/reducers/store'
import { setBrowserInfo } from '@/store/actions/data'

import RootComponent from './RootComponent'
import './App.scss'

import UAParser from 'ua-parser-js'
const result = new UAParser().getResult()

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RootComponentContainer />
            </PersistGate>
        </Provider>
    )
}

const RootComponentContainer: React.FC = () => {
    const dispatch = useAppDispatch()
    dispatch(setBrowserInfo(result))
    return <RootComponent />
}

export default App
