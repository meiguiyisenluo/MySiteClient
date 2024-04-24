import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/reducers/store'
import RootComponent from './RootComponent'
import './App.scss'

import { appsession } from '@/resources/api-constants'
appsession()

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RootComponent />
            </PersistGate>
        </Provider>
    )
}

export default App
