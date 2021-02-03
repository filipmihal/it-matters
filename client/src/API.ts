interface IStatsRaw {
    overall_screen_time_ms: number
    correct_cycles: number
    worst_cycle_ms: number
    day: string
}
export async function fetchStats(userId: string): Promise<IStatsRaw[]> {
    const response = await fetch(`/api/user/${userId}/stats`, {
        headers: {
            Authorization: 'Bearer n2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C*F-JaNdRg',
        },
    })
    if (response.ok) {
        return response.json()
    } else {
        throw Error('Could not load stats')
    }
}
