import React from 'react';
import ListElement from './listElement';
import {FILTER_TYPE_ALL} from './visibilityFilterType';
export default (props) => {
    if(props.tasks.length === 0)  return <div></div>
    return (
        <div>
            <ul>
                {props.tasks.map((item,i) => {
                    if(item.visibilityFilter === props.visibilityFilter || props.visibilityFilter == FILTER_TYPE_ALL){                     
                        return  <li key={i}>
                                    <button onClick={() => props.onSwitchVisibilityFilter(i)}>✅</button>
                                    <label onDoubleClick={() => props.onSetEditingTaskID(i)}>
                                        <ListElement value={item.value} 
                                                     index={i}
                                                     editingTaskID={props.editingTaskID}
                                                     onResetEditTask ={props.onResetEditingTaskID}
                                                     onEditTask = {props.onEditTask}/>
                                    </label>
                                    <button onClick={() => props.onDeleteTask(i)}>x</button>
                                </li>
                    }
                })}
            </ul>     
        </div>
    )
}