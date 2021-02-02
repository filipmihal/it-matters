import React, { useEffect, useState } from 'react'
import BarChart from './BarChart'
import { get30daysScreenTimeChartData, get30daysWorstCycleChartData, getStats, selectByDateRange } from './StatsService'

function App() {
    const [statistics, setStatistics]: any = useState(undefined)

    useEffect(() => {
        getStats()
            .then((stats) => {
                setStatistics(stats)
            })
            .catch((reason) => {
                console.log(reason)
            })
    }, [])
    console.log(selectByDateRange(statistics?.screenTimes ?? [], 30))
    return (
        <div className="App">
            <div>
                <h2>Worst cycle size (past 30 days)</h2>
                {statistics && (
                    <BarChart
                        title={'Worst cycle'}
                        xTitle={'days'}
                        yTitle={'Worst cycle / minutes'}
                        yDomain={[0, 240]}
                        chartData={get30daysWorstCycleChartData(statistics.worstCycles)}
                    />
                )}
            </div>
            <div>
                <h2>Screen time (past 30 days)</h2>
                {statistics && (
                    <BarChart
                        title={'Screen time'}
                        xTitle={'days'}
                        yTitle={'Screen time / minutes'}
                        yDomain={[0, 800]}
                        chartData={get30daysScreenTimeChartData(statistics.screenTimes)}
                    />
                )}
            </div>
        </div>
        // TODO: streak
    )
}

export default App
