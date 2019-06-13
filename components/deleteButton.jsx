import React, { Component } from 'react';

export default class DeleteButton extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.deleteTask(this.props.index)}>delete</button>
            </div>
        )
  }
}