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
					   visibilityFilter:FILTER_TYPE_ALL,
					   editingTaskID : -1,
					};
	}

	SaveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
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

	componentDidMount(){
		let tasks = this.LoadTasks() || [];
		let numOfLeft = tasks.filter((item)=> !item.isCompleted).length;
		let visibilityFilter = this.GetVisibilityFilter() || FILTER_TYPE_ALL;
		this.setState({tasks,numOfLeft,visibilityFilter});
	}

	getActiveTasks = () => {
		return this.state.tasks.filter((item) => !item.isCompleted);
	}

	getTaskIDMax = () => {
		if(this.state.tasks.length){
			return Math.max.apply(null,this.state.tasks.map((item)=>(item.id)))
		}
		return 1;
	}

	addTask = (value) => {
		let tasks = [...this.state.tasks];
		let item = {
			value:value,
			isCompleted : false,
			id:this.getTaskIDMax()+1
		}
		tasks.push(item);
		this.setState({tasks});
		this.SaveTasks(tasks);
	}

	deleteTask = (id) => {
		let tasks = [...this.state.tasks];
		let nextTasks = tasks.filter(item => item.id != id);
		this.setState({tasks:nextTasks});
		this.SaveTasks(nextTasks);
	}

	setEditingTaskID = (id) => {
		this.setState({editingTaskID:id});
	}
	
	resetEditingTaskID = () => {
		this.setState({editingTaskID:-1});
	}

	updateEditingTask = (value) => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item)=>{
			if(item.id===this.state.editingTaskID) {
				item.value = value; 
			}
		});
		this.setState({tasks});
		this.SaveTasks(tasks);
	}

	markAllAsCompletedTasks = () => {
		let tasks = [...this.state.tasks];
		if(this.getActiveTasks().length){
			tasks.forEach((item,i) => {
				item.isCompleted = true;
			});
		}else{
			tasks.forEach((item) => {
				item.isCompleted = false;
			})
		}
		this.setState({tasks});
		this.SaveTasks(tasks);
	}
	
	deleteCompletedTasks = () => {
		let tasks = [...this.state.tasks];
		let nextTasks = tasks.filter(item => !item.isCompleted);
		this.setState({ tasks: nextTasks });
		this.SaveTasks(nextTasks);
	}

	toggleIsCompleted = (id) => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item,i)=>{
			if(item.id === id) item.isCompleted = !item.isCompleted;
		})
		this.setState({tasks});
		this.SaveTasks(tasks);
	}
	
	changeVisibilityFilter = (visibilityFilter) => {
		this.setState({visibilityFilter});
		this.SetVisibilityFilter(visibilityFilter);
	}

	getListViewTasks = () => {
		if(this.state.tasks.length === 0)  return [];
    	let viewTasks = this.state.tasks;
    	switch(this.state.visibilityFilter){
        	case FILTER_TYPE_ACTIVE:
            	viewTasks = this.state.tasks.filter( item => !item.isCompleted);
    	        break;
        	case FILTER_TYPE_COMPLETED:
            	viewTasks = this.state.tasks.filter( item => item.isCompleted);
            	break;
		}
		return viewTasks;
	}

	render() {
		return (
			<div className="app">
				<div className="app-main">
					<Input
						onAddTask = {this.addTask}
						onMarkAllAsCompletedTasks={this.markAllAsCompletedTasks}
					/>
					<List
						viewTasks = {this.getListViewTasks()}
						onDeleteTask = {this.deleteTask}
						onToggleIsCompleted = {this.toggleIsCompleted}
						onSetEditingTaskID = {this.setEditingTaskID}
						onResetEditingTaskID = {this.resetEditingTaskID}
						onUpdateEditingTask = {this.updateEditingTask}
						editingTaskID = {this.state.editingTaskID}
					/>
					<TodoFooter
						tasks = {this.state.tasks}
						visibilityFilter = {this.state.visibilityFilter}
						onChangeVisibilityFilter = {this.changeVisibilityFilter}
						onDeleteCompletedTasks = {this.deleteCompletedTasks}
						numOfLeft = {this.getActiveTasks().length}					
					/>
				</div>
				<div class="lap1"></div>
				<div class="lap2"></div>
				<Footer/>
			</div>
		);
	}
}