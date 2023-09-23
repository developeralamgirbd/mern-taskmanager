import React, {useEffect} from 'react';
import {Card, Container, Form, InputGroup} from "react-bootstrap";
import {AiOutlineEdit, AiOutlineCalendar, AiOutlineDelete} from "react-icons/ai";
import {getSearchTask, getTaskGroupByStatus, getTasksByGroup, getTasksByStatus} from "../../APIRequest/taskApi";
import {useSelector} from "react-redux";
import {UpdateAlert} from "../../helpers/updateAlert";
import {deleteAlert} from "../../helpers/deleteAlert";
import {useSearchParams} from "react-router-dom";

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('q');
    useEffect(()=> {
        getSearchTask(keyword)
    }, [keyword]);


    const searchTaskList = useSelector((state) => state.search.task);

    const updateHandle = (id, status)=>{
        UpdateAlert(id, status).then(result => {
            if (result){
                getTasksByStatus('progress');
                getTaskGroupByStatus('progress')
            }
        });
    }

    const deleteAlertHandle = (id)=>{
        deleteAlert(id).then(result => {
            if (result){
                getTasksByStatus('progress');
            }
        })
    }


    return (
        <Container fluid={true} className="content-body">
            <div className="row p-0 m-0">
                <div className="col-12 col-md-6 col-lg-8 px-3">
                    <h5>Search for: {keyword}</h5>
                </div>

            </div>

            <div className="row p-0 m-0">
                {
                    searchTaskList.length > 0 ?
                    searchTaskList.map((task, i) => (
                        <div className="col-12 col-lg-4 col-sm-6 col-md-4  p-2" key={task._id}>
                            <Card className="card h-100">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <p></p>
                                        <p className="badge float-end bg-primary m-0 p-2">
                                            {task.status}
                                        </p>
                                    </div>
                                    <h6 className="animated fadeInUp">{task.title}</h6>
                                    <p className="animated fadeInUp">{task.description}</p>

                                    <div className="m-0 animated fadeInUp p-0 d-flex justify-content-between mt-5 align-items-center">
                                        <div className='d-flex align-items-center gap-2'>
                                            <AiOutlineCalendar/>{task.createdDate}

                                            <p className="pl-2 mb-0 pb-0">
                                                Group: <span className='text-info'> {task.groupName} </span>
                                            </p>
                                        </div>



                                        <div>
                                            <button onClick={updateHandle.bind(this, task._id, task.status)} className="icon-nav text-primary mx-1 border-0">
                                                <AiOutlineEdit />
                                            </button>
                                            <button onClick={deleteAlertHandle.bind(this, task._id)} className="icon-nav text-danger mx-1 border-0"><AiOutlineDelete /></button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))
                    : (
                        <div className='mt-5 d-flex justify-content-center align-items-center'>
                            <h1>Task not found</h1>
                        </div>
                        )
                }


            </div>
        </Container>
    );
};

export default Search;