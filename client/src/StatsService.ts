import { fetchStats } from './API'

// convert stats to meaningful format
export async function getStats() {
    const userId = '9ce50074-7c9f-43d8-b4de-3298ee5c8b86'
    const stats = await fetchStats(userId)
    const screenTimes = stats.map((segment) => {
        return { day: segment.day, overallScreenTime: segment.overall_screen_time_ms }
    })
    const worstCycles = stats.map((segment) => {
        return { day: segment.day, worstCycles: segment.worst_cycle_ms }
    })
    const correctCycles = stats.map((segment) => {
        return { day: segment.day, correctCycles: segment.correct_cycles }
    })

    return {
        screenTimes,
        worstCycles,
        correctCycles,
    }
}
