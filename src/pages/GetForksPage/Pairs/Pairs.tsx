import { useState } from 'react';
import { Pair } from '../../../types';
import styles from './Pairs.module.scss';
import PairsForm from './PairsForm';
import PairsList from './PairsList';

const Pairs = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);

  return (
    <div id={styles.pairs}>
      <PairsForm setPairs={setPairs} />
      <PairsList pairs={pairs} />
    </div>
  );
};

export default Pairs;
