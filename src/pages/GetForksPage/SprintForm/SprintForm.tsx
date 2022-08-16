import { useState } from 'react';

const sprints = {
  INTRO: ['intro1', 'intro2', 'intro3'],
  FUN: ['fun1', 'fun2'],
  BE: ['be1', 'be2'],
  FE: ['fe1'],
};

const firstSprint = Object.values(sprints)[0][0];

const SprintForm = () => {
  const [selectedSprint, setSelectedSprint] = useState(firstSprint);
  const [customSprintInput, setCustomSprintInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /// then what...
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NC Sprint:
        <select
          name="nc-sprints"
          value={selectedSprint}
          onChange={(e) => setSelectedSprint(e.target.value)}
        >
          {Object.entries(sprints).map(([block, sprints]) => {
            return (
              <optgroup label={block} key={block}>
                {sprints.map((sprint) => (
                  <option value={sprint} key={sprint}>
                    {sprint}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </label>

      <label>
        Custom Sprint:
        <input
          type="text"
          onChange={(e) => setCustomSprintInput(e.target.value)}
          value={customSprintInput}
        />
        <button
          type="button"
          onClick={() => setSelectedSprint(customSprintInput)}
        >
          set
        </button>
      </label>
      <button type="submit">get {selectedSprint} forks</button>
    </form>
  );
};

export default SprintForm;
