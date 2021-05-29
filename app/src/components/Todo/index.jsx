import { MdDone as DoneIcon } from '@react-icons/all-files/md/MdDone';
import { MdDelete as DeleteIcon } from '@react-icons/all-files/md/MdDelete';

import styles from './index.module.css';
import Icon from '../../lib/Icon';

export default function Todo({
  todo: { id, title, checked, created_at, description },
  handleCheckIconClick,
  handleDeleteIconClick,
  ...rest }
) {
  return (
    <div className={styles.todo}>
      <div>
        <Icon
          Icon={DoneIcon}
          onClick={() => handleCheckIconClick(id, checked)}
          className={styles.todo_checked_icon}
          color={checked ? 'blue' : '#666'}
        />

        <Icon
          className={styles.todo_delete_icon}
          onClick={() => handleDeleteIconClick(id)}
          Icon={DeleteIcon}
        />
      </div>
      
      <div {...rest}>
        <h2 className={styles.todo_title}>
          {title}
        </h2>
        <span className={styles.todo_date}>
          {new Date(created_at).toDateString()}
        </span>

        <p className={styles.todo_description}>{description}</p>
      </div>
    </div>
  );
}