import React, {useEffect, useState} from 'react';
import {getTaskCountGroup, getTaskCountStatus} from "../../APIRequest/taskApi";
import {useSelector} from "react-redux";

const Dashboard = () => {

    const taskCount = useSelector(state => state.task.taskCount);
    const countByGroup = useSelector(state => state.task.countByGroup);


    useEffect(()=> {
        getTaskCountStatus();
        getTaskCountGroup()
    }, [])

   const totalStatus = taskCount.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue.sum

    }, 0);
    const totalGroup = countByGroup.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue.sum

    }, 0);


    return (

        <>
            <h3 className=''>Count by Status</h3>
            <div className='row'>
                <div  className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="animated fadeInUp">Total</h5>
                            <h6 className="text-secondary animated fadeInUp">{totalStatus}</h6>
                        </div>
                    </div>
                </div>

                {
                    taskCount.map(task => (
                        <div key={task._id} className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="animated fadeInUp">{task._id}</h5>
                                    <h6 className="text-secondary animated fadeInUp">{task.sum}</h6>
                                </div>
                            </div>
                        </div>


                    ))
                }
            </div>

            <h3 className='mt-5'>Count by Group</h3>
            <div className='row'>
                <div  className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="animated fadeInUp">Total</h5>
                            <h6 className="text-secondary animated fadeInUp">{totalGroup}</h6>
                        </div>
                    </div>
                </div>

                {
                    countByGroup.map(task => (
                        <div key={task._id} className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="animated fadeInUp">{task._id}</h5>
                                    <h6 className="text-secondary animated fadeInUp">{task.sum}</h6>
                                </div>
                            </div>
                        </div>


                    ))
                }
            </div>

        </>



    );
};

export default Dashboard;