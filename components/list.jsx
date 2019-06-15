import React from 'react';
import ListElement from './listElement';
export default (props) => {
    if(props.tasks.length === 0)  return <div><p>NONE</p></div>
    return (
        <div>
            <ul>
                {props.tasks.map((item,i) => {
                    if(item.type === props.viewType || props.viewType == 'All'){                     
                        return  <li key={i}>
                                    <button onClick={() => props.onSwitchTaskType(i)}>✅</button>
                                    <label onDoubleClick={() => props.onEditTask(i)}>
                                        <ListElement value={item.value} 
                                                     index={i}
                                                     doubleClickIndex={props.doubleClickIndex} 
                                                     onResetEditTask ={props.onResetEditTask}/>
                                    </label>
                                    <button onClick={() => props.onDeleteTask(i)}>x</button>
                                </li>
                    }
                })}
            </ul>     
        </div>
    )
}