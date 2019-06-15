import React from 'react';
export default (props) => {
    if(props.tasks.length === 0)  return <div><p>NONE</p></div>
    return (
        <div>
            <ul>
                {props.tasks.map((item,i)=>{
                    return  <div key={i}>
                                <button onClick={() => props.onSwitchTaskType(i)}>✅</button>
                                <li>{item.value}</li>
                                <button onClick={() => props.onDeleteTask(i)}>x</button>
                            </div>
                })}
            </ul>     
        </div>
    )
}
