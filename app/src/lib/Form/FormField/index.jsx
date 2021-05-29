import styles from './index.module.css';

export default function FormField({ children, labelText, ...rest }) {
  return (
    <div className={styles.form_field} {...rest} >
      <label className={styles.label}>
        {labelText}
      </label>
      {children}
    </div>
  )
}
