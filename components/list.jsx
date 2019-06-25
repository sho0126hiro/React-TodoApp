import React from 'react';
import ListElement from './listElement';
export default (props) => {
    if(props.viewTasks.length === 0) return <div></div>

    return (
        <div>
            <ul className="todo-list">
                {props.viewTasks.map((item,i) => {
                    const isCompleted = (item.isCompleted ? 'is-completed': '');
                    const isEditing = (item.id === props.editingTaskID ? 'isEditing' : '');
                    return <li className="todo-list-element" key={item.id}>
                                <button className={`todo-check-button ${isCompleted} ${isEditing}`}
                                        onClick={() => props.onToggleIsCompleted(item.id)}>✔</button>
                                <label  className="todo-value" 
                                        onDoubleClick={() => props.onSetEditingTaskID(item.id)}>
                                <ListElement 
                                        task={item}
                                        value={item.value}
                                        editingTaskID={props.editingTaskID}
                                        onResetEditTask ={props.onResetEditingTaskID}
                                        onUpdateEditingTask = {props.onUpdateEditingTask}/>
                                </label>
                                <button className="todo-delete-button" 
                                        onClick={() => props.onDeleteTask(item.id)}>x</button>
                            </li>
                })}
            </ul>     
        </div>
    )
}