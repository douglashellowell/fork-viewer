import { Pair } from '../types';

export function parsePairs(pairsString: string): Pair[] {
  if (pairsString.length === 0) return [];

  const emojisRemoved = pairsString.replaceAll(/:\w+:/g, '');
  const trimmedNames = emojisRemoved
    .split('\n')
    .map((pair) => pair.split(/\s{1}-\s{1}/).map((s) => s.trim()));

  const lineBreaksRemoved = trimmedNames.filter((pair) => {
    const isALineBreak = pair.length === 1 && pair[0] === '';
    return !isALineBreak;
  });

  return lineBreaksRemoved;
}

export type GithubUser = {
  name: string;
  username: string;
};

/**
 * This function takes line-break seperated text
 * the last word in a line of text should be the github username
 *
 * this should work with text copy-able from google sheets
 *
 * @example
 * ```ts
 * const users = matchGithubUsers(`
 * Douglas Hellowell douglashellowell
 * Alice Beardmore ajbeardy123
 * `)
 * // [{name: "Douglas Hellowell", username: "douglashellowell"}, {name: "Alice Beardmore", username: "ajbeardy123"}]
 * ```
 */
export function matchGithubUsers(usersString: string): GithubUser[] {
  const rows = usersString.split('\n');

  const githubUsers = rows.reduce<GithubUser[]>((users, row) => {
    const parsedRow = parseRow(row);

    if (parsedRow !== null) {
      return [...users, parsedRow];
    } else {
      return users;
    }
  }, []);

  return githubUsers;
}

function parseRow(row: string): GithubUser | null {
  if (row.trim().length === 0) return null;

  const trimmedUserStr = row.trim();
  const username = trimmedUserStr
    .trim()
    .slice(trimmedUserStr.lastIndexOf(' ') + 1);
  const name = trimmedUserStr.slice(0, trimmedUserStr.lastIndexOf(' '));

  return { username, name };
}

export function debounce(func: Function, timeoutDelay: number) {
  let timeout: NodeJS.Timeout;

  return () => {
    if (timeout) {
      clearTimeout();
      const timeoutCanceller = setTimeout(() => {}, timeoutDelay);
    } else {
      return func();
    }
  };
}
