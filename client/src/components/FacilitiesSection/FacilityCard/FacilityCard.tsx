import styles from './FacilityCard.module.scss'

interface FacilityCardProps {
    name: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({name}) => {
  return (
    <div className={styles.main}>
        <div className={styles.content}>
            <h2>{name}</h2>
        </div>
    </div>
  )
}

export default FacilityCard