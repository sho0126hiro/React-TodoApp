import React from 'react';
import { FILTER_TYPE_ALL,FILTER_TYPE_ACTIVE,FILTER_TYPE_COMPLETED} from './visibilityFilterType'
export default (props) => {
    const isVisible = props.tasks.length - props.numOfLeft;
    return  <div className="todo-footer">
                <p className="num-of-left">{String(props.numOfLeft)} items left</p>
                <div>
                    <button className={`filter-button ${props.visibilityFilter === FILTER_TYPE_ALL ? 'current': ''}`} 
                            onClick={() => props.onChangeVisibilityFilter('All')}>All</button>
                    <button className={`filter-button ${props.visibilityFilter === FILTER_TYPE_ACTIVE ? 'current': ''}`} 
                            onClick={() => props.onChangeVisibilityFilter('Active')}>Active</button>
                    <button className={`filter-button ${props.visibilityFilter === FILTER_TYPE_COMPLETED ? 'current': ''}`} 
                            onClick={() => props.onChangeVisibilityFilter('Completed')}>Completed</button>
                </div>
                <button className={`filter-button ${!isVisible ? 'is-visible': ''}`}
                        onClick={() => props.onDeleteCompletedTasks()}>Clear competed</button>      
            </div>
}