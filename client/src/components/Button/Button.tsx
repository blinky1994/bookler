import styles from './Button.module.scss'
import { ReactNode } from 'react';
import { HTMLAttributes } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    buttonStyle: string;
    children: ReactNode;
}

interface IButtonStyle {
    [key: string] : string
}

export const buttonStyle : IButtonStyle = {
    fill: styles.fill,
    stroke: styles.stroke
}

const Button : React.FC<IButtonProps> = ({buttonStyle, children, ...rest}) => {
  return (
    <button className={`${styles.main} ${buttonStyle}`} {...rest}>
        <span>
            {children}
        </span>
    </button>
  )
}

export default Button