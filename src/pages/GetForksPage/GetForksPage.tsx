import { createContext, useEffect, useMemo, useState } from 'react';
import useApi from '../../hooks/useApi';
import { Fork } from '../../types';
import { parsePairs } from '../../utils';
import Pairs from './Pairs/Pairs';
import SprintForm from './SprintForm/SprintForm';

export const ForkContext = createContext<{
  forks: Fork[];
  forksExist: boolean;
}>({ forks: [], forksExist: false });

const GetForksPage = () => {
  // FORM STATE
  const [ncSprint, setNcSprint] = useState('');
  const [hasSetCustom, setHasSetCustom] = useState(false);
  const [customSprintInput, setCustomSprintInput] = useState(
    'react-element-cloner'
  );

  /// FORKS STATE
  // const { fetchForks, forks, forksExist, isErrored, isLoading } = useForks();

  const {
    apiData: forks,
    fetchFromApi,
    isErrored,
    isLoading,
  } = useApi<Fork[]>([]);
  const forksExist = forks.length > 0 && !isLoading;

  useEffect(() => {
    fetchFromApi(`/repos/douglashellowell/${customSprintInput}/forks`);
  }, []);

  // console.log('forks:', forks);
  const [pairs, setPairs] =
    useState(`:pear: Douglas Hellowell - Andrea Catania :pear:
:pear: Christian Dutton - Douglas Hellowell :pear:
:apple: Douglas Hellowell :apple:`);

  const parsedPairs = useMemo(() => {
    return parsePairs(pairs);
  }, [pairs]);

  return (
    <div>
      <h2>get-forks</h2>
      <SprintForm />
      <Pairs />
    </div>
  );
};

export default GetForksPage;
