import React, { Component } from 'react';
export default (props) => {
    if(props.tasks.length == 0)  return <div><p>NONE</p></div>
    return (
        <div>
            <ul>
                {props.tasks.map((item,i)=>{
                    return  <div key={i}>
                                <li>{item}</li>
                                <button onClick={props.onDeleteTask}>x</button>
                            </div>
                })}
            </ul>     
        </div>
    )
}
