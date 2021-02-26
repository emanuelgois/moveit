import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level}   = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/emanuelgois.png"  alt="Emanuel Gois" />
            <div>
                <strong>Emanuel Gois</strong>
                <p>
                    <img src="icons/level.svg"  alt="" />     
                   { level }
                </p>
            </div>
        </div>
    )
}