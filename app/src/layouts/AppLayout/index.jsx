import {BiTask as TaskIcon} from '@react-icons/all-files/bi/BiTask';

import styles from './index.module.css';

export default function AppLayout({children}) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <TaskIcon fontSize={32} className={styles.logo}/>
        <h1>Todo Manager</h1>
      </header>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}