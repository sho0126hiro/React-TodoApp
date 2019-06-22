import React from 'react';
import ListElement from './listElement';
export default (props) => {
    if(props.viewTasks.length === 0) return <div></div>
    return (
        <div>
            <ul>
                {props.viewTasks.map((item,i) => {
                    return <li key={item.id}>
                                <button onClick={() => props.onToggleIsCompleted(item.id)}>✅</button>
                                <label onDoubleClick={() => props.onSetEditingTaskID(item.id)}>
                                    <ListElement 
                                                task={item}
                                                value={item.value}
                                                editingTaskID={props.editingTaskID}
                                                onResetEditTask ={props.onResetEditingTaskID}
                                                onUpdateEditingTask = {props.onUpdateEditingTask}/>
                                </label>
                                <button onClick={() => props.onDeleteTask(item.id)}>x</button>
                            </li>
                })}
            </ul>     
        </div>
    )
}