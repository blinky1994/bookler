import styles from './FacilityCard.module.scss'
import { IFacility } from '../../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom'

type FacilityCardProps = IFacility;

const FacilityCard: React.FC<FacilityCardProps> = (facility) => {
  const navigate = useNavigate();

  
  const { id, name } = facility;
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/facilities/facility/${id}`);
  }

  return (
    <div onClick={handleClick} className={styles.main}>
        <div className={styles.content}>
          <img className={styles.bgImage} src={facility.image_url}></img>
          <h2>{name}</h2>
        </div>
    </div>
  )
}

export default FacilityCard