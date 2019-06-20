import React, { Component } from 'react';
import Input from './input';
import List from './list';
import TodoFooter from './todoFooter';
import { FILTER_TYPE_ALL, FILTER_TYPE_ACTIVE, FILTER_TYPE_COMPLETED} from './visibilityFilterType'
import Footer from './footer';
import { runInNewContext } from 'vm';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { tasks: [], 
					   taskIDMax:0,
					   numOfLeft: 0, 
					   visibilityFilter:FILTER_TYPE_ALL,
					   editingTaskID : -1,
					};
	}

	SaveTasks() {
		localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
	}
	LoadTasks() {
		return JSON.parse(localStorage.getItem('tasks'));
	}
	SetVisibilityFilter(){
		localStorage.setItem('visibilityFilter',this.state.visibilityFilter);
	}
	GetVisibilityFilter(){
		return localStorage.getItem('visibilityFilter');
	}
	LoadTaskIDMax(){
		return JSON.parse(localStorage.getItem('taskIDMax'));
	}
	async SaveTaskIDMax(){
		if(this.state.taskIDMax>=Number.MAX_SAFE_INTEGER){
			await this.setState({taskIDMax:0});
		}
		localStorage.setItem('taskIDMax',this.state.taskIDMax);
	}

	componentDidMount(){
		let tasks = this.LoadTasks() || [];
		let taskIDMax = this.LoadTaskIDMax() || 0;
		let numOfLeft = tasks.filter((item)=> !item.isCompleted).length;
		let visibilityFilter = this.GetVisibilityFilter() || FILTER_TYPE_ALL;
		this.setState({tasks,numOfLeft,visibilityFilter,taskIDMax});
	}

	addTask = async(value) => {
		let tasks = [...this.state.tasks];
		let item = {
			value:value,
			isCompleted : false,
			id:(this.state.taskIDMax)+1
		}
		tasks.push(item);
		await this.setState({tasks,taskIDMax:this.state.taskIDMax+1});
		this.SaveTasks();
		this.SaveTaskIDMax();
		this.calculateNumOfLeft();
	}

	deleteTask = async(id) => {
		let tasks = [...this.state.tasks];
		let nextTasks = tasks.filter(item => item.id != id);
		await this.setState({tasks:nextTasks});
		this.SaveTasks();
		this.calculateNumOfLeft();
	}

	setEditingTaskID = (id) => {
		this.setState({editingTaskID:id});
	}
	
	resetEditingTaskID = () => {
		this.setState({editingTaskID:-1});
	}
	//update edtting task
	editTask = async (value) => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item)=>{
			if(item.id===this.state.editingTaskID) {
				item.value = value; 
			}
		});
		await this.setState({tasks});
		this.SaveTasks();
	}

	markAllAsCompletedTasks = async() => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item,i)=>{
			if(!item.isCompleted) item.isCompleted = true;
		});
		await this.setState({tasks});
		this.SaveTasks();
	}
	
	deleteCompletedTasks = async() => {
		let tasks = [...this.state.tasks];
		let nextTasks = tasks.filter(item => !item.isCompleted);
		await this.setState({ tasks: nextTasks });
		this.SaveTasks();
	}

	toggleIsCompleted = async(id) => {
		let tasks = [...this.state.tasks];
		tasks.forEach((item,i)=>{
			if(item.id === id) item.isCompleted = !item.isCompleted;
		})
		await this.setState({tasks});
		this.SaveTasks();
		this.calculateNumOfLeft();
	}
	
	changeVisibilityFilter = async(visibilityFilter) => {
		await this.setState({visibilityFilter:visibilityFilter});
		this.SetVisibilityFilter();
	}

	calculateNumOfLeft = async() => {
		let numOfLeft = this.state.tasks.filter((item) => !item.isCompleted).length;
		await this.setState({numOfLeft});
	}

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
					onToggleIsCompleted = {this.toggleIsCompleted}
					onSetEditingTaskID       = {this.setEditingTaskID}
					onResetEditingTaskID  = {this.resetEditingTaskID}
					onEditTask = {this.editTask}
					editingTaskID = {this.state.editingTaskID}
					onCalculateNumOfLeft = {this.calculateNumOfLeft}
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

