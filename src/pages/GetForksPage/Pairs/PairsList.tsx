import { useState } from 'react';
import { Fork, Pair } from '../../../types';
import styles from './PairsList.module.scss';
import StudentCard from './StudentCard';

const PairsList = ({ pairs }: { pairs: Pair[] }) => {
  const [forks, setForks] = useState<Fork[]>();

  return (
    <section>
      {pairs.map(([studentA, studentB]) => {
        return (
          <div className={styles.pair}>
            <StudentCard name={studentA} />
            <StudentCard name={studentB} />
          </div>
        );
      })}
    </section>
  );
};

export default PairsList;
