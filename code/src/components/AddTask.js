import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import tasks from 'reducers/tasks';
import { Counter } from './Counter';

// stringToCapitalize makes only the first letter to uppercase
const capitalize = (stringToCapitalise) => {
  return stringToCapitalise.charAt(0).toUpperCase() + stringToCapitalise.slice(1);
}

const AddTask = () => {
  const [inputValue, setInputValue] = useState(''); // useState använder vi för att det ska uppdateras
  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    // för att sidan inte ska reload efter input event.PreventDefault måste in
    event.preventDefault();

    // in newTask im creating a new id, name
    const newTask = {
      id: Date.now().toString(), // Date.now takes the todays date and makes it into a string
      taskName: capitalize(inputValue), // byta plats på dessa för att capitalizefunction ska funka.
      isChecked: false // använder sen när jag har checkboxes. I wanna
    };
    dispatch(tasks.actions.addTask(newTask)); // newtask is the payload.
    setInputValue('');
  };

  const onResetToDoClick = () => {
    dispatch(tasks.actions.deleteAllTasks());
  };

  return (
    <section>
      <Counter />
      <div className="input">
        <form onSubmit={onFormSubmit}>
          <label htmlFor="addTaskInput">
            <button
              type="submit"> Add Task!
            </button>
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              id="addTaskInput"
              type="text"
              placeholder="Next To-Do.." />
          </label>

        </form>
      </div>
      <button
        className="resetButton"
        type="button"
        onClick={onResetToDoClick}><div title="Reset tasklist"> ☑️ </div>
      </button>
    </section>
  )
};

export default AddTask;