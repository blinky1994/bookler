import styles from './CategoryCard.module.scss'
import { ICategory } from '../../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom'

type CategoryCardProps = ICategory;

const CategoryCard: React.FC<CategoryCardProps> = ({name, id, image_url}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/facilities/${id}`);
  }

  return (
    <div onClick={handleClick} className={styles.main}>
        <div className={styles.content}>
            <img className={styles.bgImage} src={image_url}></img>
            <h2>{name}</h2>
        </div>
    </div>
  )
}

export default CategoryCard