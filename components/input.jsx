import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {value:''};
    }
    
    changeItem = (event) => {
        this.setState({value:event.target.value});
    }

    async addItem(event){
        if(event.key === 'Enter'){
            this.props.onAddTask(this.state.value);
            await this.setState({value:''});
        }
    }
    render() {
        return (
            <div className="input-container">
                <button className="button"
                        onClick={() => this.props.onMarkAllAsCompletedTasks()}>v</button>
                <input  type="text" 
                        value={this.state.value} 
                        placeholder="What needs to be done?"
                        onChange={this.changeItem}
                        onKeyDown={(e)=>this.addItem(e)}
                        className="input-box"
                        />
            </div>
    );
  }
}