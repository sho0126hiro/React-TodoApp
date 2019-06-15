import React, { Component } from 'react';
import Input from './input';
import List from './list';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {tasks:[]};
    }
    
    componentDidMount(){
        let items = JSON.parse(localStorage.getItem('tasks'));
        this.setState({tasks:items});
    }

    // タスクの追加　Input Component で使われる
    addTask = (item) => {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      if(tasks == null) tasks = [item];
      else              tasks.push(item);
      localStorage.setItem('tasks',JSON.stringify(tasks));
      this.setState({tasks:tasks});
    }
    
    //タスクの削除 右のXをクリック時、clear completed時に使用する
    deleteTask = () => {
        // alert("hoge")
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