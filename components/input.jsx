import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {value:''};
    }
    
    changeItem = (event) => {
        this.setState({value:event.target.value});
    }

    addItem(event){
        if(event.key === 'Enter'){
            this.props.onAddTask(this.state.value);
            this.setState({value:''});
        }
    }
    render() {
        return (
            <div>
                <button onClick={() => this.props.onAllCompleted()}>👅</button>
                <input type="text" value={this.state.value} onChange={this.changeItem}
                        onKeyDown={(e)=>this.addItem(e)}/>
            </div>
    );
  }
}