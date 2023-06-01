import {
    AppointmentItemProps
} from "@/app/component/appointement/appointment";
import styles from './event.module.css'
import {calcWidth, setVerticalPosition} from "@/app/utils/utils";

/**
 * AppointmentItem for event component
 * @param duration
 * @param start
 * @param end
 * @param position
 * @constructor
 */
export default function AppointmentItem({duration, start, end, position}: AppointmentItemProps) {

    return (
        <div
            className={styles.event}
            style={{
                top: `${setVerticalPosition(start)}vh`,
                width: `calc((98vw/${position?.width}))`,
                marginLeft: `${calcWidth(position?.position || 1, position?.width || 1)}vw`,
                height: `calc((100vh/12)*${(duration) / 60})`,
            }}
        >
            <div
                className={styles.event__title}
            >
                <p className={styles.event__time}
>
                    Start-time: {start}
                </p>
            </div>
            <div>
                <p className={styles.event__time} >
                    End-time: {end}
                </p>
            </div>
        </div>
    );
}