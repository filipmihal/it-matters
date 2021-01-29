import React, { useState } from 'react'
import { Hint, VerticalBarSeries, XAxis, XYPlot, YAxis } from 'react-vis'
import './BarChart.css'
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
            <XYPlot height={400} width={1000} stackBy="y" xDomain={[0, 30]} yDomain={[0, 800]}>
                {/* TODO: show day/month */}
                <XAxis title={'last 30 days'} />
                <YAxis title={'screen time/minutes'} />
                {hoveredPoint && (
                    // TODO: redesign hint
                    <Hint value={hoveredPoint}>
                        <div className={'barChartTooltip'}>
                            <h3>Screen time</h3>
                            <p>
                                {hoveredPoint.y} mins on {hoveredPoint.x}
                            </p>
                        </div>
                    </Hint>
                )}
                {/* TODO: Add conditional color for bars which reach certain threshold */}
                <VerticalBarSeries
                    onValueMouseOver={(data) => {
                        setHoveredPoint(data as { x: number; y: number })
                    }}
                    onValueMouseOut={() => {
                        setHoveredPoint(undefined)
                    }}
                    barWidth={0.6}
                    data={props.chartData}
                />
            </XYPlot>
        </div>
    )
}
