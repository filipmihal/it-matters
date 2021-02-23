interface IStatsRaw {
    overall_screen_time_ms: number
    correct_cycles: number
    worst_cycle_ms: number
    day: string
}
export async function fetchStats(userId: string, APIKey: string): Promise<IStatsRaw[]> {
    const response = await fetch(`/api/user/${userId}/stats`, {
        headers: {
            Authorization: `Bearer ${APIKey}`,
        },
    })
    if (response.ok) {
        return response.json()
    } else {
        throw Error('Could not load stats')
    }
}
