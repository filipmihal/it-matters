import { processScreenTime } from './utils'

const testOneCycle: any[] = [
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:07:52.024244+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:07:56.201957+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:00.382069+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:04.562239+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:08.749954+00:00',
    },
]

const testOneCycleWithSmallBreaks: any[] = [
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:07:52.024244+00:00',
    },
    {
        is_looking_at_screen: false,
        period: 4,
        recorded_at: '2020-12-28T16:07:56.201957+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:00.382069+00:00',
    },
    {
        is_looking_at_screen: false,
        period: 4,
        recorded_at: '2020-12-28T16:08:04.562239+00:00',
    },
    {
        is_looking_at_screen: false,
        period: 4,
        recorded_at: '2020-12-28T16:08:08.749954+00:00',
    },
]

const testOneBreak = [
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:22:23.457205+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:22:31.637611+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:22:39.814606+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:22:48.001683+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:22:56.181010+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:23:04.361830+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:23:12.541946+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:23:20.723139+00:00',
    },
    {
        is_looking_at_screen: false,
        period: 8,
        recorded_at: '2020-12-28T16:23:28.911121+00:00',
    },
    {
        is_looking_at_screen: false,
        period: 8,
        recorded_at: '2020-12-28T16:23:37.088657+00:00',
    },
    {
        is_looking_at_screen: false,
        period: 8,
        recorded_at: '2020-12-28T16:23:45.927321+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:23:54.526735+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:24:03.237174+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:24:11.817562+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:24:20.489671+00:00',
    },
]

const testOneInterruption = [
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:07:52.024244+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:07:56.201957+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:00.382069+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:04.562239+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 4,
        recorded_at: '2020-12-28T16:08:08.749954+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:23:54.526735+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:24:03.237174+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:24:11.817562+00:00',
    },
    {
        is_looking_at_screen: true,
        period: 8,
        recorded_at: '2020-12-28T16:24:20.489671+00:00',
    },
]

console.assert(
    JSON.stringify(processScreenTime(testOneCycle)) ===
        JSON.stringify({ screenTime: 16725, worstCycle: 16725, cycles: [16725] }),
    'one cycle failed',
)

console.assert(
    JSON.stringify(processScreenTime(testOneBreak)) ===
        JSON.stringify({ screenTime: 91828, worstCycle: 57266, cycles: [57266, 34562] }),
    'one break failed',
)

console.assert(
    JSON.stringify(processScreenTime(testOneInterruption)) ===
        JSON.stringify({ screenTime: 50688, worstCycle: 33963, cycles: [16725, 33963] }),
    'one interruption failed',
)

console.assert(
    JSON.stringify(processScreenTime(testOneCycleWithSmallBreaks)) ===
        JSON.stringify({ screenTime: 16725, worstCycle: 16725, cycles: [16725] }),
    'one cycle with small breaks failed',
)
