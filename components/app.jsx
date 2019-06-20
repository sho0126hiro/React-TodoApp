import React, { Component } from 'react';
import Input from './input';
import List from './list';
import TodoFooter from './todoFooter';
import { FILTER_TYPE_ALL, FILTER_TYPE_ACTIVE, FILTER_TYPE_COMPLETED} from './visibilityFilterType'
import Footer from './footer';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { tasks: [], 
					   numOfLeft: 0, 
					   visibilityFilter:FILTER_TYPE_ALL,
					   editingTaskID : -1
					};

	}

	SaveTasks(task) {
		localStorage.setItem('tasks', JSON.stringify(task));
	}
	LoadTasks() {
		return JSON.parse(localStorage.getItem('tasks'));
	}
	SetVisibilityFilter(visibilityFilter){
		localStorage.setItem('visibilityFilter',visibilityFilter);
	}
	GetVisibilityFilter(){
		return localStorage.getItem('visibilityFilter');
	}

	componentDidMount() {
		let items = this.LoadTasks();
		if (items === null){
			items = [];
		}else{
			// numOfLeftの初期値を定める
			let initValue = 0;
			items.forEach((item, i) => {
				if (item.visibilityFilter === FILTER_TYPE_ACTIVE) initValue++;
			});
			this.setState({ tasks: items, numOfLeft: initValue });
		}
		// visibilityFilterの初期値を取得する
		let visibilityFilter = this.GetVisibilityFilter() || FILTER_TYPE_ALL;
		this.setState({visibilityFilter})
	}

	// ---------------------- task ----------------------
	addTask = (value) => {
		let tasks = [...this.state.tasks];
		let item = {
			value: value,
			visibilityFilter: FILTER_TYPE_ACTIVE
		}
		if (tasks === null) tasks = [item];
		else tasks.push(item);
		this.SaveTasks(tasks);
		this.setState({ tasks: tasks, numOfLeft: this.state.numOfLeft + 1 });
	}

	deleteTask = (index) => {
		let tasks = [...this.state.tasks];
		const updated = tasks.filter(n => n != tasks[index]);
		this.SaveTasks(updated);
		if (tasks[index].visibilityFilter === FILTER_TYPE_ACTIVE) this.setState({ tasks: updated, numOfLeft: this.state.numOfLeft - 1 });
		else this.setState({ tasks: updated });
	}

	setEditingTaskID = (index) => {
		this.setState({editingTaskID:index});
	}
	
	resetEditingTaskID = () => {
		this.setState({editingTaskID:-1});
	}

	editTask = (item) => {
		let tasks = [...this.state.tasks];
		let newTask = {
			value: item,
			visibilityFilter: this.state.tasks[this.state.editingTaskID].visibilityFilter
		}
		tasks.splice(this.state.editingTaskID,1,newTask);
		this.SaveTasks(tasks);
		this.setState({tasks});
	}

	markAllAsCompletedTasks = () => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item,i) => {
			if(item.visibilityFilter === FILTER_TYPE_ACTIVE) item.visibilityFilter = FILTER_TYPE_COMPLETED;
		})
		this.setState({tasks:tasks,numOfLeft:0});
	}
	
	deleteCompletedTasks = () => {
		let tasks = [...this.state.tasks];
		let update = tasks.filter(item => item.visibilityFilter != FILTER_TYPE_COMPLETED);
		this.SaveTasks(update);
		this.setState({ tasks: update });
	}

	// ---------------------- visibleFilter ----------------------
	switchVisibilityFilter = (index) => {
		let tasks = [...this.state.tasks];
		switch (tasks[index].visibilityFilter) {
			case FILTER_TYPE_ACTIVE:
				tasks[index].visibilityFilter = FILTER_TYPE_COMPLETED;
				this.setState({ numOfLeft: this.state.numOfLeft - 1 })
				break;
			case FILTER_TYPE_COMPLETED:
				tasks[index].visibilityFilter = "Active";
				this.setState({ numOfLeft: this.state.numOfLeft + 1 })
				break;
		}
		this.SaveTasks(tasks);
		this.setState({ tasks: tasks });
	}
	
	changeVisibilityFilter = (visibilityFilter) => {
		this.SetVisibilityFilter(visibilityFilter);
		this.setState({visibilityFilter:visibilityFilter});
	}
	// --------------------------------------------

	render() {
		return (
			<div className="app">
				<Input
					onAddTask = {this.addTask}
					onMarkAllAsCompletedTasks={this.markAllAsCompletedTasks}
				/>
				<List
					tasks            = {this.state.tasks}
					visibilityFilter         = {this.state.visibilityFilter}
					onDeleteTask     = {this.deleteTask}
					onSwitchVisibilityFilter = {this.switchVisibilityFilter}
					onSetEditingTaskID       = {this.setEditingTaskID}
					onResetEditingTaskID  = {this.resetEditingTaskID}
					onEditTask = {this.editTask}
					editingTaskID = {this.state.editingTaskID}
				/>
				<TodoFooter
					numOfLeft              = {this.state.numOfLeft}
					onChangeVisibilityFilter = {this.changeVisibilityFilter}
					onDeleteCompletedTasks = {this.deleteCompletedTasks}
					numOfTask = {this.state.tasks.length}					
				/>
				<Footer/>
			</div>
		);
	}
}

