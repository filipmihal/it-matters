import { fetchStats } from './API'

// convert stats to meaningful format
export async function getStats(credentials: any) {
    const stats = await fetchStats(credentials.userId, credentials.APIKey)
    const screenTimes = stats.map((segment) => {
        return { day: segment.day, val: segment.overall_screen_time_ms }
    })
    const worstCycles = stats.map((segment) => {
        return { day: segment.day, val: segment.worst_cycle_ms }
    })
    const correctCycles = stats.map((segment) => {
        return { day: segment.day, val: segment.correct_cycles }
    })

    return {
        screenTimes,
        worstCycles,
        correctCycles,
    }
}

export function getDateFormat(date: number | Date): string {
    return new Date(date).toString().substr(4, 7)
}

// TODO: get a report from last 30 day

export function selectByDateRange(data: { day: string | Date }[], range: number): any[] {
    const controlDate = new Date()
    controlDate.setDate(controlDate.getDate() - range)
    return data.filter((val) => new Date(val.day) > controlDate)
}

export function convertToChartFormat(data: any[], threshold?: number): { x: number; y: number; color?: string }[] {
    return data.map((element) => {
        return {
            x: new Date(element.day).getTime(),
            y: Math.round(element.val / 6000) / 10,
            color: threshold && element.val > threshold ? '#f00' : undefined,
        }
    })
}

export function get30daysWorstCycleChartData(data: any[]): { x: number; y: number; color?: string }[] {
    return convertToChartFormat(selectByDateRange(data, 30), 2200000)
}

export function get30daysScreenTimeChartData(data: any[]): { x: number; y: number; color?: string }[] {
    return convertToChartFormat(selectByDateRange(data, 30), 1000 * 60 * 60 * 9)
}
