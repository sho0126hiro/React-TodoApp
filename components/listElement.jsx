import React from 'react';
import ListInput from './listInput'
export default (props) => {
    if(props.task.id === props.editingTaskID) {
        return (
            <div>
                <ListInput  onResetEditTask = {props.onResetEditTask}
                            onUpdateEditingTask = {props.onUpdateEditingTask}
                            initial={props.task.value}/>
            </div>
        )
    }
    return (
        <label>
            {props.task.value}
        </label>
    )
}