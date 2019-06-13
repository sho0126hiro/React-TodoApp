import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state = {item:'',flg:false};
        this.ChangeItem = this.ChangeItem.bind(this);
    }
    
    ChangeItem(event){
        this.setState({item:event.target.value});
    }

    AddItem(event){
        if(event.keyCode === 13){
            let items = JSON.parse(localStorage.getItem('tasks'));
            if(items==null){
                items=[this.state.item];
            }else{
                items.push(this.state.item);
            }
            this.props.onAddTask(items);
            this.setState({item:''});
        }
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.item} onChange={this.ChangeItem}
                        onKeyDown={(e)=>this.AddItem(e)}/>
            </div>
    );
  }
}