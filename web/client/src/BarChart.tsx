import React, { useState } from 'react'
import { Hint, VerticalBarSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import './BarChart.css'
import { getDateFormat } from './StatsService'
interface IProps {
    chartData: Array<{ x: number; y: number }>
    yDomain: Array<number>
    title: string
    xTitle: string
    yTitle: string
}

export default function BarChart(props: IProps) {
    const [hoveredPoint, setHoveredPoint] = useState<{
        x: number
        y: number
    }>()

    return (
        <div style={{ position: 'relative', width: '1000px' }}>
            <XYPlot height={400} xType="time" width={1000} stackBy="y" yDomain={props.yDomain}>
                <XAxis tickTotal={10} tickFormat={getDateFormat} />
                <YAxis title={props.yTitle} />
                {hoveredPoint && (
                    <Hint value={hoveredPoint}>
                        <div className={'barChartTooltip'}>
                            <b>{props.title}</b>
                            <p>
                                {hoveredPoint.y} mins <br /> on {getDateFormat(hoveredPoint.x)}
                            </p>
                        </div>
                    </Hint>
                )}
                <VerticalBarSeries
                    colorType={'literal'}
                    color={'#0f0'}
                    onValueMouseOver={(data) => {
                        setHoveredPoint(data as { x: number; y: number })
                    }}
                    onValueMouseOut={() => {
                        setHoveredPoint(undefined)
                    }}
                    barWidth={0.5}
                    data={props.chartData}
                />
            </XYPlot>
        </div>
    )
}
