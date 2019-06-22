import React, { Component } from 'react';

export default class ListInput extends Component {
    constructor(props){
        super(props);
        this.state = {value:this.props.initial};
    }
    
    changeItem = (event) => {
        this.setState({value:event.target.value});
    }

    addItem(event){
        if(event.key === 'Enter'){
            this.props.onUpdateEditingTask(this.state.value);
            this.setState({value:''});
            event.target.blur()
        }
    }
    render() {
        return (
            <div>
                <input  type="text"
                        value={this.state.value}
                        autoFocus={true} 
                        onChange={this.changeItem}
                        onKeyDown={(e)=>this.addItem(e)}
                        onBlur={()=>this.props.onResetEditTask()}
                         />
            </div>
    );
  }
}