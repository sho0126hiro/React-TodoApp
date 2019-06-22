import React from 'react';
const styleGenerator =  (size) => ({
    visibility : size ? 'visible' : 'hidden'
});
export default (props) => {
    return  <div>
                <p>{String(props.numOfLeft)} items left</p>
                <div>
                    <button onClick={() => props.onChangeVisibilityFilter('All')}>All</button>
                    <button onClick={() => props.onChangeVisibilityFilter('Active')}>Active</button>
                    <button onClick={() => props.onChangeVisibilityFilter('Completed')}>Completed</button>
                </div>
                <button style={styleGenerator(props.tasks.length - props.numOfLeft)} onClick={() => props.onDeleteCompletedTasks()}>Clear competed</button>
            </div>
}