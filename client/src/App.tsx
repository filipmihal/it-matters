import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Login from './Login'

function App() {
    const [statistics, setStatistics]: any = useState(undefined)

    return <>{statistics ? <Dashboard statistics={statistics} /> : <Login setStatistics={setStatistics} />}</>
}

export default App
