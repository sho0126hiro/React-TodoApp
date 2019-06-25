import React from 'react';
import { FILTER_TYPE_ALL,FILTER_TYPE_ACTIVE,FILTER_TYPE_COMPLETED} from './visibilityFilterType'
export default (props) => {
    const isVisible = props.tasks.length - props.numOfLeft;
    const filters = [
        {
            "value":"All",
            "filter":FILTER_TYPE_ALL
        },
        {
            "value":"Active",
            "filter":FILTER_TYPE_ACTIVE
        },
        {
            "value":"Completed",
            "filter":FILTER_TYPE_COMPLETED
        }
    ]
    if(props.tasks.length===0) return <div></div>
    return  <div className="todo-footer">
                <p className="num-of-left">{String(props.numOfLeft)} items left</p>
                <div>
                    {
                        filters.map(({filter,value})=>{
                            return (
                                <button 
                                    className={`filter-button ${props.visibilityFilter === filter ? 'current':''}`}
                                    onClick={() => props.onChangeVisibilityFilter(value)}
                                    >
                                    {value}
                                </button>
                            )
                        })
                    }
                </div>
                <button className={`clear-comp-button ${!isVisible ? 'is-visible': ''}`}
                        onClick={() => props.onDeleteCompletedTasks()}>Clear competed</button>      
            </div>
}