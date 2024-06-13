import React, { useState } from 'react'
import { getStats } from './StatsService'

// TODO: fix all anys
interface IProps {
    setStatistics: any
}

function Login(props: IProps) {
    const [credentials, setCredentials]: any = useState({
        userId: '',
        APIKey: '',
    })

    function auth() {
        getStats(credentials)
            .then((stats) => {
                props.setStatistics(stats)
            })
            .catch((reason) => {
                // console.log(reason)
            })
    }

    function handleId(e: any) {
        setCredentials((prevState: any) => ({
            ...prevState,
            userId: e.target.value,
        }))
    }

    function handleKey(e: any) {
        setCredentials((prevState: any) => ({
            ...prevState,
            APIKey: e.target.value,
        }))
    }

    return (
        <>
            <input type="text" placeholder="USER ID" value={credentials.userId} onChange={handleId} />
            <input type="password" placeholder="API KEY" value={credentials.APIKey} onChange={handleKey} />
            <button onClick={auth}>LOG IN</button>
        </>
    )
}

export default Login
