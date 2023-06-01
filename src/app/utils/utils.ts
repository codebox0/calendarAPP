
export type AppointmentType = {
    id: number,
    start: string,
    end?: string,
    duration: number
    position?: {
        width?: number,
        position?: number,
    }
}

/**
 * Sorts the events by start time and calculates the end time
 * @param appointments
 */
const sortEvents = (appointments: AppointmentType[]) => {
    for (let i = 0; i < appointments.length; i++) {
        const startTime = appointments[i].start;
        const duration = appointments[i].duration;
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const end = new Date();
        end.setHours(startHours + Math.floor((startMinutes + duration) / 60));
        end.setMinutes((startMinutes + duration) % 60);
        const endHours = end.getHours().toString().padStart(2, "0");
        const endMinutes = end.getMinutes().toString().padStart(2, "0");
        appointments[i].start = `${startHours.toString().padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;
        appointments[i].end = `${endHours}:${endMinutes}`;
    }
    // @ts-ignore
    return appointments.sort((a, b) =>
        a?.start?.localeCompare(b?.start) || a?.end?.localeCompare(b?.end)
    );

}

/**
 * Flattens the arrays into one array
 * @param arrays
 */
const flattenArrays = (...arrays: any[]) => {
    let combinedArray: any = [];
    arrays.forEach((array) => {
        combinedArray = combinedArray.concat(array);
    });
    return combinedArray;
}


/**
 * Events are grouped by position and duration
 * @param start
 */
export function setVerticalPosition(start: string){
    const [hour, minutes] = start?.split(':');
    if (minutes !=='00') return (100*((parseInt(hour) - 9) + (parseInt(minutes)/60 )))/12
    return (100* (parseInt(hour) -9))/12
}

/**
 * Builds the calendar events by comparing the start and end times
 * @param sortedEvents
 * @param endGroup
 */
const buildCalendarEvents = (sortedEvents: AppointmentType[], endGroup: Array<AppointmentType>) => {
    sortedEvents.forEach((group) => {
        let eventBefore = 0;
        let eventAfter = 0;
        endGroup.map((item, index) => {
            // if the event is before the current event and ends after the current event starts
            if (item.start < group.start) {
                // if the event ends after the current event starts
                if (item?.end > group.start) {
                    if (item?.position?.position === 1) {
                        const count = endGroup.filter((item, index) => {
                            return item.start < group.start && item.end >= group.start
                        }).length;
                        const countAfter = endGroup.filter((item, index) => {
                            return item.start >= group.start && item.end >= group.start
                        }).length;
                        endGroup[index] = {
                            ...endGroup[index],
                            position: {
                                width: count + countAfter + 1,
                                position: (item?.position?.position) || 1,
                            }
                        }
                        eventBefore = count
                    } else {
                        eventAfter++;
                    }
                }
            }
            // if the event is after the current event and starts before the current event ends
            else if (item.start === group.start) {
                endGroup[index] = {
                    ...endGroup[index],
                    position: {
                        width: (item?.position?.width + 1) || 1,
                        position: item?.position?.position,
                    }
                }
                eventBefore++;
            } else {
                if (item?.start < group?.end && item?.end < group?.end) {
                    item.position = {
                        width: item?.position?.width + 1 || 1,
                        position: item?.position?.position,
                    }
                }
                else if (item?.start < group?.end && item?.end < group?.end) {
                    item.position = {
                        width: item?.position?.width + 1 || 1,
                        position: item?.position?.position,
                    }
                }
                else if (item?.start <= group?.end && item?.end <= group?.end) {
                    item.position = {
                        width: item?.position?.width + 1 || 1,
                        position: item?.position?.position,
                    }
                    eventBefore++;
                }
                else if (item?.start < group?.end && item?.end > group?.end) {
                    item.position = {
                        width: item?.position?.width + 1 || 1,
                        position: (eventBefore + eventAfter) > 0 ? item?.position?.position : item?.position?.position + 1,
                    }
                    eventAfter++;
                }
            }
        });
        endGroup.push({
            ...group,
            position: {
                width: eventBefore + eventAfter + 1,
                position: eventBefore + 1,
            }
        });
    });
}

/**
 * Calculates the width of the event
 * @param position
 * @param width
 */
export const calcWidth = (position: number, width: number) => {
    return (98 / width) * (position - 1)
}

/**
 * Calculates the left position of the event based on the width of the event
 * @param events - the events to be grouped
 */
export const groupEvents = (events: AppointmentType[]) => {
    const sortedEvents = sortEvents(events)
    let endGroup: Array<AppointmentType> = [];
    buildCalendarEvents(sortedEvents, endGroup);
    return flattenArrays(...endGroup);
}
