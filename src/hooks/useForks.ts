import { useState } from 'react';
import * as api from '../api';
import { Fork } from '../types';

const useForks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);
  const [forks, setForks] = useState<Fork[]>([]);
  const forksExist = forks.length > 0 && isLoading === false;

  const fetchForks = (ncSprint: string) => {
    setIsLoading(true);
    setIsErrored(false);
    return api
      .getForks(ncSprint)
      .then((forks) => {
        setIsLoading(false);
        setForks(forks);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setIsErrored(true);
      });
  };

  return {
    isLoading,
    isErrored,
    forks,
    fetchForks,
    forksExist,
  };
};

export default useForks;
