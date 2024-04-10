import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'
import './App.scss'
import { NavBar } from 'react-vant'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="app_topbar">
                    <NavBar title={'location.pathname'} onClickLeft={() => alert('返回')} />
                </div>
                <div className="app_route_panel">
                    <RootComponent />
                </div>
            </PersistGate>
        </Provider>
    )
}

export default App
