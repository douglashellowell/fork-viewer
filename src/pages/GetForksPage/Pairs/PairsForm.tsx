import { useEffect, useState } from 'react';
import { Pair } from '../../../types';
import { parsePairs } from '../../../utils';

const placeholder = `:pear: Douglas Hellowell - Andrea Catania :pear:
:pear: Christian Dutton - Douglas Hellowell :pear:
:apple: Douglas Hellowell :apple:`;

const PairsForm = ({
  setPairs,
}: {
  setPairs: React.Dispatch<React.SetStateAction<Pair[]>>;
}) => {
  const [pairsInput, setPairsInput] = useState(placeholder);

  useEffect(() => {
    const parsedPairs = parsePairs(pairsInput);
    setPairs(parsedPairs);
  }, [pairsInput]);

  return (
    <form>
      <label>
        Pairs:{' '}
        <textarea
          value={pairsInput}
          onChange={(e) => setPairsInput(e.target.value)}
          placeholder={placeholder}
        ></textarea>
      </label>
    </form>
  );
};

export default PairsForm;
