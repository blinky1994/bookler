import { useNavigate } from 'react-router-dom'
import Button, { buttonStyle } from '../../../Button/Button'
import { ReactComponent as Icon_Tick } from '../../../Icons/Icon_Tick.svg'
import styles from './DeleteSuccessSection.module.scss'

const DeleteSuccessSection = ({handleModalOpen} : any) => {
    const navigate = useNavigate();
  
    const handleCloseButton = () => {
        handleModalOpen();
        navigate(0);
    }
  
    return (
        <div className={styles.main}>
        <div className={styles.headerSection}>
            <div className={styles.iconTick}>
                <Icon_Tick />
            </div>
            <h1>Booking deleted successfully</h1>
        </div> 
  
  
        <div className={styles.buttonsSection}>
                <Button onClick={handleCloseButton} buttonStyle={buttonStyle.fill}>Close</Button>
        </div>
    </div>
    )  
}

export default DeleteSuccessSection;