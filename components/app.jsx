import React, { Component } from 'react';
import Input from './input';
import List from './list';
import TodoFooter from './todoFooter';
// import Footer from './footer';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { tasks: [], 
					   numOfLeft: 0, 
					   viewType:'All',
					   doubleClickIndex : -1
					};
        /**
         * tasks [ { value : "input_value" ,
         *           type  : type ("Active" or "Completed") } ]
		 * viewType : "All" or "Active" or "Completed"
         */
	}

	// LocalStrageにタスクをセット
	SetTask(task) {
		localStorage.setItem('tasks', JSON.stringify(task));
	}
	// LocalStrageからタスクを取得
	GetTask() {
		return JSON.parse(localStorage.getItem('tasks'));
	}

	// LocalStrageにViewTypeをセット
	SetViewType(viewType){
		localStorage.setItem('viewType',viewType);
	}
	// LocalStrageからViewTypeを取得
	GetViewType(){
		return localStorage.getItem('viewType');
	}

	componentDidMount() {
		let items = this.GetTask();
		if (items === null){
			items = [];
		}else{
			// numOfLeftの初期値を定める
			let initValue = 0;
			items.forEach((item, i) => {
				if (item.type === "Active") initValue++;
			});
			this.setState({ tasks: items, numOfLeft: initValue });
		}
		// viewTypeの初期値を取得する
		let viewType = this.GetViewType();
		if(viewType) this.setState({viewType:viewType});
		else         this.SetViewType('All');
	}

	// タスクの追加　Input Component で使われる
	addTask = (value) => {
		let tasks = [...this.state.tasks];
		// let item = value;
		let item = {
			value: value,
			type: "Active"
		}
		if (tasks === null) tasks = [item];
		else tasks.push(item);
		this.SetTask(tasks);
		this.setState({ tasks: tasks, numOfLeft: this.state.numOfLeft + 1 });
	}

	deleteTask = (index) => {
		let tasks = [...this.state.tasks];
		const updated = tasks.filter(n => n != tasks[index]);
		localStorage.setItem('tasks', JSON.stringify(updated));
		if (tasks[index].type === "Active") this.setState({ tasks: updated, numOfLeft: this.state.numOfLeft - 1 });
		else this.setState({ tasks: updated });
	}

	editTask = (index) => {
		this.setState({doubleClickIndex:index});
	}
	
	resetEditTask = () => {
		this.setState({doubleClickIndex:-1});
	}

	allCompletedTask = () => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item,i) => {
			if(item.type === "Active") item.type = "Completed";
		})
		this.setState({tasks:tasks,numOfLeft:0});
	}

	// Active <=> Completed 切り替え
	switchTaskType = (index) => {
		let tasks = [...this.state.tasks];
		switch (tasks[index].type) {
			case "Active":
				tasks[index].type = "Completed";
				this.setState({ numOfLeft: this.state.numOfLeft - 1 })
				break;
			case "Completed":
				tasks[index].type = "Active";
				this.setState({ numOfLeft: this.state.numOfLeft + 1 })
				break;
		}
		this.SetTask(tasks);
		this.setState({ tasks: tasks });
	}
	
	changeViewType = (viewType) => {
		this.SetViewType(viewType);
		this.setState({viewType:viewType});
	}

	deleteCompletedTasks = () => {
		let tasks = [...this.state.tasks];
		for (let i = tasks.length - 1; i >= 0; i--) {
			if (tasks[i].type === "Completed") tasks.splice(i, 1);
		}
		this.SetTask(tasks);
		this.setState({ tasks: tasks });
	}

	render() {
		return (
			<div>
				<Input
					onAddTask = {this.addTask}
					onAllCompleted={this.allCompletedTask}
				/>
				<List
					tasks            = {this.state.tasks}
					viewType         = {this.state.viewType}
					onDeleteTask     = {this.deleteTask}
					onSwitchTaskType = {this.switchTaskType}
					onEditTask       = {this.editTask}
					onResetEditTask  = {this.resetEditTask}
					doubleClickIndex = {this.state.doubleClickIndex}
				/>
				<TodoFooter
					numOfLeft              = {this.state.numOfLeft}
					onChangeViewType       = {this.changeViewType}
					onDeleteCompletedTasks = {this.deleteCompletedTasks}
				/>
			</div>
		);
	}
}