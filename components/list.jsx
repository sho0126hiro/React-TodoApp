import React from 'react';
import ListElement from './listElement';
import {FILTER_TYPE_ALL,FILTER_TYPE_ACTIVE,FILTER_TYPE_COMPLETED} from './visibilityFilterType';
export default (props) => {
    if(props.tasks.length === 0)  return <div></div>
    let viewTasks = props.tasks;
    switch(props.visibilityFilter){
        case FILTER_TYPE_ACTIVE:
            viewTasks = props.tasks.filter( item => !item.isCompleted);
            break;
        case FILTER_TYPE_COMPLETED:
            viewTasks = props.tasks.filter( item => item.isCompleted);
            break;
    }
    return (
        <div>
            <ul>
                {viewTasks.map((item,i) => {
                    return <li key={item.id}>
                                <button onClick={() => props.onToggleIsCompleted(item.id)}>✅</button>
                                <label onDoubleClick={() => props.onSetEditingTaskID(item.id)}>
                                    <ListElement 
                                                task={item}
                                                value={item.value}
                                                editingTaskID={props.editingTaskID}
                                                onResetEditTask ={props.onResetEditingTaskID}
                                                onEditTask = {props.onEditTask}/>
                                </label>
                                <button onClick={() => props.onDeleteTask(item.id)}>x</button>
                            </li>
                })}
            </ul>     
        </div>
    )
}