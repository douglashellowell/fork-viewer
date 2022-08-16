import { CommitResponse, Fork } from '../types';

const API = `http://api.github.com`;

export async function getUser(username: string) {
  const res = await fetch(`${API}/users/${username}`);
  const user = await res.json();
  console.log(user);
  return user;
}

export async function getForks(repoName: string) {
  const res = await fetch(
    `${API}/repos/douglashellowell/react-element-cloner/forks`
  );
  const forks = (await res.json()) as Fork[];
  return forks;
}

export async function getCommits(repoName: string, username: string) {
  const res = await fetch(
    `${API}/repos/${username}/react-element-cloner/commits`
  );
  const allCommits = (await res.json()) as CommitResponse[];
  const usersCommits = allCommits.filter(
    (commit) => commit.author.login === username
  );

  return usersCommits;
}
