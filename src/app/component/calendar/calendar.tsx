import data from '../../data/input.json';
import {useState} from 'react';
import styles from './calendar.module.css'
import Appointment from "@/app/component/appointement/appointment";
import { groupEvents} from "@/app/utils/utils";

const Calendar = () => {
        const hours = 12;
        const [appointmentList] = useState(groupEvents(data));

    /**
     * Calculate the hours to display on the left side of the calendar
     * @param index
     */
    const calHours = (index: number) => {
        if ((9 + index)%12 === 0) return 12 + ' AM'
            return (9 + index)%12 + (index < 4 ? ' AM' : ' PM') ;
    }
        return (
            <>
                <div className={styles.calendar_box}>
                    {[...Array(hours)].map((_, index) =>
                        <div key={index} className={styles.calendar__hour}>
                            {calHours(index)}
                        </div>)}
                </div>
                <Appointment appointmentList={appointmentList} />
            </>
        );
    }
;

export default Calendar;
