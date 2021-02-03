const BREAK_SIZE_MILLISECONDS = 20000

export interface processedScreenTime {
    screenTime: number
    worstCycle: number
    cycles: number[]
}

export function processScreenTime(sortedReports: any[]): processedScreenTime {
    if (sortedReports.length === 0) {
        return {
            screenTime: 0,
            worstCycle: 0,
            cycles: [],
        }
    }

    let screenTime = 0
    let worstCycle = 0
    const cycles: number[] = []
    let breakSizeBuffer = 0
    let cycleSizeBuffer = 0
    let latestRecord: Date = new Date(sortedReports[0].recorded_at)

    const finishCycle = () => {
        if (cycleSizeBuffer > 600000) {
            cycles.push(cycleSizeBuffer)
        }
        worstCycle = Math.max(cycleSizeBuffer, worstCycle)
        breakSizeBuffer = 0
        cycleSizeBuffer = 0
    }

    const addWatchTime = (time: number) => {
        screenTime += time
        cycleSizeBuffer += time
    }

    sortedReports.forEach((report) => {
        const controlRecord = new Date(latestRecord)
        // There might be small difference between period and actual time difference
        // In addition, there might be an interruption of received data (PC was turned off)
        controlRecord.setSeconds(controlRecord.getSeconds() + BREAK_SIZE_MILLISECONDS / 1000)
        const currentRecord = new Date(report.recorded_at)
        let differenceMilliseconds = currentRecord.getTime() - latestRecord.getTime()

        // check if there was any interruption
        if (controlRecord < currentRecord) {
            addWatchTime(breakSizeBuffer)
            finishCycle()
            differenceMilliseconds = report.period * 1000
        }

        if (report.is_looking_at_screen) {
            addWatchTime(differenceMilliseconds)

            // if the break size has not reach the required limit, I count it as watch time
            addWatchTime(breakSizeBuffer)

            breakSizeBuffer = 0
        } else {
            breakSizeBuffer += differenceMilliseconds
            if (breakSizeBuffer >= BREAK_SIZE_MILLISECONDS) {
                finishCycle()
            }
        }
        latestRecord = currentRecord
    })

    if (cycleSizeBuffer > 0) {
        addWatchTime(breakSizeBuffer)
        worstCycle = Math.max(cycleSizeBuffer, worstCycle)
        cycles.push(cycleSizeBuffer)
    }

    return {
        screenTime,
        worstCycle,
        cycles,
    }
}
