import { useMemo, useState } from 'react';
import { matchGithubUsers } from '../../utils';
import MatchedUser from './MatchedUser';
import './StudentManagement.module.scss';

const StudentManagement = () => {
  const [textAreaInput, setTextAreaInput] = useState('');
  const textAreaIsEmpty = textAreaInput === '';

  const matchedUsers = useMemo(() => {
    return matchGithubUsers(textAreaInput);
  }, [textAreaInput]);

  return (
    <section>
      <p>paste in students names and their git hub usernames</p>
      <p>eg</p>
      <pre>
        Douglas Hellowell douglashellowell <br />
        Alice Beardmore ajbeardmore99
      </pre>

      <textarea
        onChange={({ target: { value } }) => setTextAreaInput(value)}
        value={textAreaInput}
      >
        asd
      </textarea>

      <section>
        {matchedUsers.length > 0
          ? matchedUsers.map((user, i) => {
              return <MatchedUser user={user} key={i} />;
            })
          : null}
      </section>

      <button disabled={textAreaIsEmpty}>
        {textAreaIsEmpty ? 'Paste in some users! ' : 'Looks good to me!'}
      </button>
    </section>
  );
};

export default StudentManagement;
