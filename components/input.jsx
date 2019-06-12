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
            let items = JSON.parse(localStorage.getItem('items'));
            if(items==null){
                items=[this.state.item];
            }else{
                items.push(this.state.item);
            }
            localStorage.setItem('items',JSON.stringify(items));
            // console.log(items);
            this.setState({item:''});
        }
    }
    render() {
        return (
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type="text" value={this.state.item} onChange={this.ChangeItem}
                        onKeyDown={(e)=>this.AddItem(e)}/>
                {/* <p>{String(this.state.item)}</p> */}
            </form>
    );
  }
}