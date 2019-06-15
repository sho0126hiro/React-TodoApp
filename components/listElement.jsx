import React from 'react';

export default (props) => {
    if(props.index === props.doubleClickIndex) {
        return (
            <input type="text"  autoFocus={true} onBlur={() => props.onResetEditTask()}/>
        )
    }
    return (
        <label>
            {props.value}
        </label>
    )
}