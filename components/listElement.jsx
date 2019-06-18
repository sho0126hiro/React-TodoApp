import React from 'react';
import ListInput from './listInput'
export default (props) => {
    if(props.index === props.editingTaskID) {
        return (
            <div>
                <ListInput  onResetEditTask = {props.onResetEditTask}
                            onEditTask = {props.onEditTask}/>
            </div>
        )
    }
    return (
        <label>
            {props.value}
        </label>
    )
}