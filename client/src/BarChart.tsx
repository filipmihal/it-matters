import React, { useState } from 'react'
import { Hint, VerticalBarSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import './BarChart.css'
import { getDateFormat } from './StatsService'
interface IProps {
    chartData: Array<{ x: number; y: number }>
}

export default function BarChart(props: IProps) {
    const [hoveredPoint, setHoveredPoint] = useState<{
        x: number
        y: number
    }>()

    return (
        <div style={{ position: 'relative' }}>
            <XYPlot height={400} xType="time" width={1400} stackBy="y" yDomain={[0, 800]}>
                <XAxis title={'last 30 days'} tickTotal={10} tickFormat={getDateFormat} />
                <YAxis title={'screen time/minutes'} />
                {hoveredPoint && (
                    <Hint value={hoveredPoint}>
                        <div className={'barChartTooltip'}>
                            <h3>Screen time</h3>
                            <p>
                                {hoveredPoint.y} mins on {getDateFormat(hoveredPoint.x)}
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
