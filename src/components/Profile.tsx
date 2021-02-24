import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/emanuelgois.png"  alt="Emanuel Gois" />
            <div>
                <strong>Emanuel Gois</strong>
                <p>
                    <img src="icons/level.svg"  alt="" />     
                    Level 1
                </p>
            </div>
        </div>
    )
}