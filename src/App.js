import React, { useReducer, useRef } from 'react';
import './App.css';

// Helper function to generate unique IDs
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

function App() {
  const initialState = {
    tasks: [],
    countCompletedTasks: 0,
  };

  const toDoListReducer = (state, action) => {
    switch (action.type) {
      case 'add_task':
        return {
          ...state,
          tasks: [
            ...state.tasks,
            { id: generateUniqueId(), name: action.data.name, completeStatus: action.data.completeStatus }, // Add new task with id and name
          ],
        };
      case 'remove_task':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.data.id), // Use id to remove
        };
      case 'complete_task':
        return { ...state, 
          tasks: state.tasks.map(task=> task.id === action.data.id ? {...task, completeStatus: !task.completeStatus} : task)
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(toDoListReducer, initialState);
  const reftask = useRef();

  const addTask = () => {
    const taskName = reftask.current.value;
    if (taskName.trim() === '') return; // Prevent adding empty tasks
    dispatch({ type: 'add_task', data: {name: taskName, completeStatus: false} });
    reftask.current.value = ''; // Clear the textarea
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <p>Add Tasks:</p>
      <textarea ref={reftask} placeholder="Add your tasks here..."></textarea>
      <br />
      <button type="button" onClick={addTask}>
        Add Your Tasks: 
      </button>
      <ul>
        {state.tasks.map(task => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => dispatch({ type: 'remove_task', data: {id: task.id } })}>
              Remove
            </button>
           
            <button onClick={() => dispatch({ type: 'complete_task', data: {id: task.id }})}>
              {task.completeStatus ? "completed" : "complete"}
              
            </button>
          </li>
        ))}
      </ul>
      <p>All Tasks: {state.tasks.length}</p>
      <p>Completed Tasks: {
        state.tasks.filter(task=>task.completeStatus).length
        }</p>
    </div>
  );
}

export default App;
