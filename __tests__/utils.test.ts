import { describe, expect, it } from 'vitest';
import { Pair } from '../src/types';
import { GithubUser, matchGithubUsers, parsePairs } from '../src/utils';

describe('parse pairs', () => {
  it('returns an empty array when passed empty string', () => {
    // arrange
    const pairsString = ``;
    const expected: Pair[] = [];
    // act
    const pairs = parsePairs(pairsString);
    // assert
    expect(pairs).toEqual(expected);
  });
  it('returns single pair when passed two names', () => {
    // arrange
    const pairsString = `:pear: Student A - Student B :pear:`;
    const expected: Pair[] = [['Student A', 'Student B']];
    // act
    const pairs = parsePairs(pairsString);
    // assert
    expect(pairs).toEqual(expected);
  });
  it('returns multiple pairs when passed multiple names', () => {
    // arrange
    const pairsString = `:pear: Student A - Student B :pear:
    :pear: Student C - Student D :pear:`;
    const expected: Pair[] = [
      ['Student A', 'Student B'],
      ['Student C', 'Student D'],
    ];
    // act
    const pairs = parsePairs(pairsString);
    // assert
    expect(pairs).toEqual(expected);
  });
  it('ignores leading & trailing line-breaks', () => {
    // arrange
    const pairsString = `
    :pear: Student A - Student B :pear:
    :pear: Student C - Student D :pear:
    `;
    const expected: Pair[] = [
      ['Student A', 'Student B'],
      ['Student C', 'Student D'],
    ];
    // act
    const pairs = parsePairs(pairsString);
    // assert
    expect(pairs).toEqual(expected);
  });
  it('keeps solo-ers', () => {
    // arrange
    const pairsString = `:apple: Jane Smith :apple:`;
    const expected: Pair[] = [['Jane Smith']];
    // act
    const pairs = parsePairs(pairsString);
    // assert
    expect(pairs).toEqual(expected);
  });
});

describe('matchGithubUsers', () => {
  it('returns an empty array when passed empty string', () => {
    // arrange
    const usersString = '';
    const expected: GithubUser[] = [];
    // act
    const githubUsers = matchGithubUsers(usersString);
    // assert
    expect(githubUsers).toEqual(expected);
  });
  it('returns a single user when passed one user', () => {
    // arrange
    const usersString = 'Douglas Hellowell douglashellowell';
    const expected: GithubUser[] = [
      { name: 'Douglas Hellowell', username: 'douglashellowell' },
    ];
    // act
    const githubUsers = matchGithubUsers(usersString);
    // assert
    expect(githubUsers).toEqual(expected);
  });
  it('ignores whitespace after the github username', () => {
    // arrange
    const usersString = 'Douglas Hellowell douglashellowell ';
    const expected: GithubUser[] = [
      { name: 'Douglas Hellowell', username: 'douglashellowell' },
    ];
    // act
    const githubUsers = matchGithubUsers(usersString);
    // assert
    expect(githubUsers).toEqual(expected);
  });
  it('matches two lines', () => {
    // arrange
    const usersString = `Douglas Hellowell douglashellowell
Alice Beardmore ajbeardy123`;
    const expected: GithubUser[] = [
      { name: 'Douglas Hellowell', username: 'douglashellowell' },
      { name: 'Alice Beardmore', username: 'ajbeardy123' },
    ];
    // act
    const githubUsers = matchGithubUsers(usersString);
    // assert
    expect(githubUsers).toEqual(expected);
  });
  it('ignores leading and trailing empty blank lines', () => {
    // arrange
    const usersString = `
    Douglas Hellowell douglashellowell
`;
    const expected: GithubUser[] = [
      { name: 'Douglas Hellowell', username: 'douglashellowell' },
    ];
    // act
    const githubUsers = matchGithubUsers(usersString);
    // assert
    expect(githubUsers).toEqual(expected);
  });
});
