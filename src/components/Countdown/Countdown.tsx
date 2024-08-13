import { FC, useMemo } from 'react'
import useCountdown from '../../hooks/useCountdown'
import styles from './Countdown.module.scss'

interface CountdownProps {
    'data-testid'?: string
    targetDate: string | number | Date
}

function addLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, '0')
}

const Countdown: FC<CountdownProps> = ({
    'data-testid': dataTestId = 'Countdown',
    targetDate
}) => {
    const [hours, minutes, seconds] = useCountdown(targetDate)

    const showExpiredNotice = () => {
        return <span className={styles.expiredNotice}>Time is up</span>
    }

    const showCountdown = useMemo(() => {
        return (
            <>
                {addLeadingZeros(hours, 2)}:{addLeadingZeros(minutes, 2)}:
                {addLeadingZeros(seconds, 2)}
            </>
        )
    }, [hours, minutes, seconds])

    return (
        <div className={styles.Countdown} data-testid={dataTestId}>
            {hours + minutes + seconds <= 0
                ? showExpiredNotice()
                : showCountdown}
        </div>
    )
}

export default Countdown
