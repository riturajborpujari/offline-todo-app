import styles from './index.module.css';

export default function Section({ children, icon, title, description }) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.icon}>
          {
            icon && icon
          }
        </div>
        <div>
          {
            title && <h1 className={styles.title}>
              {title}
            </h1>
          }
          {
            description && <p>{description}</p>
          }
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  )
}
