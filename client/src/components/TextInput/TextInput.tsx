import styles from './TextInput.module.scss';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const TextInput: React.FC<TextInputProps> = ({error, ...rest}) => {
  return (
    <div className={styles.main}>
        <input className={`${styles.formField} ${error && styles.formFieldError}`} {...rest} />
        { error && <span>{error}</span> }
    </div>
  )
}

export default TextInput