import React from 'react';

const TaskCard = ({ task, onDelete, onUpdate }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <div>
        {task.status !== 'todo' && <button onClick={() => onUpdate('todo')}>Set TODO</button>}
        {task.status !== 'in-progress' && <button onClick={() => onUpdate('in-progress')}>Set In-Progress</button>}
        {task.status !== 'done' && <button onClick={() => onUpdate('done')}>Set Done</button>}
        <button onClick={onDelete} style={{ marginLeft: 8 }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
