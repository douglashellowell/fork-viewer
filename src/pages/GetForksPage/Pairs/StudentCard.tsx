import { useContext } from 'react';
import { GithubUser } from '../../../utils';
import ForkData from '../ForkData';
import { ForkContext } from '../GetForksPage';
import styles from './StudentCard.module.scss';

// to come from state
const ghUsers: GithubUser[] = [
  { name: 'Douglas Hellowell', username: 'douglashellowell' },
  { name: 'Christian Dutton', username: 'Dutton1990' },
  { name: 'Andrea Catania', username: 'Angaca' },
  { name: 'August A', username: 'Augs0' },
];

const StudentCard = ({ name }: { name: string }) => {
  const user = ghUsers.find((user) => user.name === name);
  const { forks, forksExist: forksHaveBeenLoaded } = useContext(ForkContext);

  const studentsFork = forks.find(
    (fork) => fork.owner.login === user?.username
  );
  const studentHasForked = forksHaveBeenLoaded && studentsFork !== undefined;

  return (
    <div className={styles['student-card']}>
      <p className={styles['name']}>{name}</p>
      {user !== undefined ? (
        <div>
          <a
            href={`https://github.com/${user.username}`}
            className={styles['username']}
            target="_blank"
          >
            {user.username}
          </a>
          {studentHasForked ? (
            <ForkData fork={studentsFork} />
          ) : forksHaveBeenLoaded ? (
            <p>no fork exists</p>
          ) : null}
        </div>
      ) : (
        <p className={styles['unmatched']}>
          ⚠ no matching name - check student-management
        </p>
      )}
    </div>
  );
};

export default StudentCard;
