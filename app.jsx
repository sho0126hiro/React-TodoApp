import React, { Component } from 'react';
import Input from './components/input';
import List from './components/list';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {tasks:null};
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    componentDidMount(){
        let items = JSON.parse(localStorage.getItem('tasks');
        this.setState({tasks:items});
    }
    addTask(item){
        localStorage.setItem('tasks',JSON.stringify(item));
        this.setState({tasks:item});
    }
    deleteTask(index){
        
    }
    render() {
        return (
            <div>
                <Input
                  onAddTask={this.addTask} 
                />
                <List
                  tasks={this.state.tasks} onDeleteTask={this.deleteTask}
                />
            </div>
    );
  }
}