import React from 'react';
import styles from "@/app/component/calendar/calendar.module.css";
import AppointmentItem from "@/app/component/appointement/AppointmentIIem";
import {AppointmentType} from "@/app/utils/utils";


export type AppointmentItemProps ={
    duration: AppointmentType['duration'],
    start: AppointmentType['start'],
    end: AppointmentType['end'],
    position: AppointmentType['position'],
}

/**
 * Events Component
 * @param appointmentList list of events
 * @constructor
 */
export const Appointment = ({appointmentList}: {
    appointmentList: AppointmentType[]
}) => {
    return (
        <div className={styles.calendar}>
            {
                appointmentList.map((appointment: AppointmentType, index) => <AppointmentItem
                    key={index}
                    duration={appointment.duration}
                    start={appointment.start}
                    end={appointment.end}
                    position={appointment.position}
                />)
            }
        </div>
    );
};

export default Appointment;
