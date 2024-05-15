import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/reducers/store'
import { ConfigProvider } from 'react-vant'

import RootComponent from './RootComponent'
import './App.scss'

const App: React.FC = () => {
    return (
        <ConfigProvider style={{ width: '100%', height: '100%' }}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootComponent />
                </PersistGate>
            </Provider>
        </ConfigProvider>
    )
}

export default App
