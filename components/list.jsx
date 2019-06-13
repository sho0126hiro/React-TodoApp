import React, { Component } from 'react';
import DeleteButton from './deleteButton';

export default class List extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.tasks == null) return <div><p>NONE</p></div>
        else {
            return (
                <div>
                    <ul>
                        {this.props.tasks.map((item,i)=>{
                            return  <div>
                                        <li key={i}>{item}</li>
                                        <button onClick={this.props.onDeleteTask}/>
                                    </div>
                        })}
                    </ul>
                </div>
            )
        }
  }
}