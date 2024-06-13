import React from 'react'
import BarChart from './BarChart'
import { get30daysScreenTimeChartData, get30daysWorstCycleChartData } from './StatsService'

interface IProps {
    statistics: any
}

function Dashboard(props: IProps) {
    return (
        <div className="App">
            <div>
                <h2>Worst cycle size (past 30 days)</h2>
                {props.statistics && (
                    <BarChart
                        title={'Worst cycle'}
                        xTitle={'days'}
                        yTitle={'Worst cycle / minutes'}
                        yDomain={[0, 240]}
                        chartData={get30daysWorstCycleChartData(props.statistics.worstCycles)}
                    />
                )}
            </div>
            <div>
                <h2>Screen time (past 30 days)</h2>
                {props.statistics && (
                    <BarChart
                        title={'Screen time'}
                        xTitle={'days'}
                        yTitle={'Screen time / minutes'}
                        yDomain={[0, 800]}
                        chartData={get30daysScreenTimeChartData(props.statistics.screenTimes)}
                    />
                )}
            </div>
        </div>
        // TODO: streak
    )
}

export default Dashboard
