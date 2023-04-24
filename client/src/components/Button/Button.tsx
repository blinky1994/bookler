import styles from './Button.module.scss'
import { ReactNode } from 'react';

interface IButtonProps {
    style: string;
    children: ReactNode;
}

interface IButtonStyle {
    [key: string] : string
}

export const buttonStyle : IButtonStyle = {
    fill: styles.fill,
    stroke: styles.stroke
}

const Button : React.FC<IButtonProps> = ({style, children}) => {
  return (
    <button className={`${styles.main} ${style}`}>
        <span>
            {children}
        </span>
    </button>
  )
}

export default Button