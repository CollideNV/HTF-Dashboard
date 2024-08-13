import { Player } from '@lottiefiles/react-lottie-player'
import { Button } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import lottie from '../../resources/assets/lottie'
import { ROUTES } from '../../resources/constants/routes-constants'

import styles from './NotFoundPage.module.scss'

const NotFoundPage: FC = () => {
    const navigate = useNavigate()

    const redirectToHomePage = () => {
        navigate(ROUTES.HOMEPAGE_ROUTE)
    }

    return (
        <div className={styles.NotFoundPage}>
            <div className={styles.lottieContainer}>
                <div style={{ backgroundColor: 'gray' }}>
                    <Player
                        src={lottie.CompassNotFound}
                        autoplay
                        loop
                        className={styles.layeredLottiePlayer}
                    />
                </div>
            </div>
            <p>{'It looks like your lost in the jungle!'}</p>
            <Button
                variant="contained"
                onClick={() => redirectToHomePage()}
                style={{
                    backgroundColor: '#135E46',
                    color: 'white'
                }}
            >
                Go Back to the jungle
            </Button>
        </div>
    )
}

export default NotFoundPage
