import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useMemo } from 'react';
import useApi from '../../hooks/useApi';
import { CommitResponse, Fork } from '../../types';
import styles from './ForkData.module.scss';
dayjs.extend(RelativeTime);

const ForkData = ({ fork }: { fork: Fork }) => {
  const createdAt = dayjs(fork.created_at).format('D/MMM/YY HH:MM');
  const lastPushed = dayjs(fork.pushed_at).fromNow();

  const {
    apiData: commits,
    fetchFromApi: fetchCommits,
    isErrored,
    isLoading,
  } = useApi<CommitResponse[]>([]);

  useEffect(() => {
    fetchCommits(`/repos/${fork.owner.login}/react-element-cloner/commits`);
  }, [fork.owner.login]);

  const userCommits = useMemo(
    () => commits.filter((commit) => commit.author.login === fork.owner.login),
    [commits]
  );

  return (
    <div>
      <a href={fork.html_url} target="_blank" className={styles['fork-info']}>
        {fork.default_branch}
      </a>
      <p className={styles['fork-info']}>forked: {createdAt}</p>
      <p className={styles['fork-info']}>pushed: {lastPushed}</p>
      {isLoading ? (
        <p>loading commits...</p>
      ) : (
        <p>{userCommits.length} commits</p>
      )}
    </div>
  );
};

export default ForkData;
