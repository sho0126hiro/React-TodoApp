import React from 'react';
export default (props) => (
    <div>
        <p>{String(props.numOfLeft)} items left</p>
        <div>
            <button onClick={() => props.onChangeViewType('All')}>All</button>
            <button onClick={() => props.onChangeViewType('Active')}>Active</button>
            <button onClick={() => props.onChangeViewType('Completed')}>Completed</button>
        </div>
        <button onClick={() => props.onDeleteCompletedTasks()}>Clear competed</button>
    </div>
)

