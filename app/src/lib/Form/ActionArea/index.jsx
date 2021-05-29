import styles from './index.module.css';

export default function ActionArea({ children, ...rest}) {
  return (
    <div className={styles.action_area} {...rest} >
      {children}
    </div>
  )
}
