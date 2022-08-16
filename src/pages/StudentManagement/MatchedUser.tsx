import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { GithubUser } from '../../utils';
import styles from './MatchedUser.module.scss';

const MatchedUser = ({ user }: { user: GithubUser }) => {
  //   const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isErrored, setIsErrored] = useState(true);

  useEffect(() => {
    getUser(user.username)
      .then((user) => {
        setIsFetching(false);
      })
      .catch((err) => {
        console.warn(err);

        setIsErrored(true);
        setIsFetching(false);
      });
  }, []);

  const userExists = !isFetching && !isErrored;

  const style = userExists
    ? styles.success
    : isFetching
    ? styles.fetching
    : isErrored
    ? styles.errored
    : '';

  return (
    <div className={`${styles.user} ${style} `}>
      <p>
        {user.name} -{' '}
        <a href={`https://www.github.com/${user.username}`}>
          <code>{user.username}</code>
        </a>
      </p>
    </div>
  );
};

export default MatchedUser;
