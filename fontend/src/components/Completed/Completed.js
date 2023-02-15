import React, {useEffect} from 'react';
import {Card, Container, Form, InputGroup} from "react-bootstrap";
import {AiOutlineEdit, AiOutlineCalendar, AiOutlineDelete} from "react-icons/ai";
import {getTaskGroupByStatus, getTasksByGroup, getTasksByStatus} from "../../APIRequest/taskApi";
import {useSelector} from "react-redux";
import completed from "./Completed";
import {UpdateAlert} from "../../helpers/updateAlert";
import {deleteAlert} from "../../helpers/deleteAlert";

const Completed = () => {


    useEffect(()=> {
        getTasksByStatus('completed');
        getTaskGroupByStatus('completed')
    }, []);

    const newTaskList = useSelector((state) => state.task.completed);
    const taskGroup = useSelector((state) => state.task.taskGroup);

    const updateHandle = (id, status)=>{
        UpdateAlert(id, status).then(result => {
            if (result){
                getTasksByStatus('completed');
                getTaskGroupByStatus('completed')
            }
        });
    }

    const deleteAlertHandle = (id)=>{
        deleteAlert(id).then(result => {
            if (result){
                getTasksByStatus('completed');
            }
        })
    }

    const handleOnchange = (e)=>{
        const value = e.target.value.toLowerCase();
        getTasksByGroup(value, 'completed')
    }

    return (
        <Container fluid={true} className="content-body">
            <div className="row p-0 m-0">
                <div className="col-12 col-md-6 col-lg-8 px-3">
                    <h5>New Task</h5>
                </div>




                <div className="row ">
                    <div className='col-4'>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Group</Form.Label>
                            <Form.Select onChange={handleOnchange}>
                                <option selected disabled>select a group</option>
                                {
                                    taskGroup.map((group, i) => (
                                        <option key={group._id.groupName} value={group._id.groupName}>{group._id.groupName}</option>
                                    ))
                                }

                            </Form.Select>
                        </Form.Group>
                    </div>

                </div>


            </div>
            <div className="row p-0 m-0">
                {
                    newTaskList.map((task, i) => (
                        <div className="col-12 col-lg-4 col-sm-6 col-md-4  p-2" key={task._id}>
                            <Card className="card h-100">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <p></p>
                                        <p className="badge float-end bg-success m-0 p-2">
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
                }

            </div>
        </Container>
    );
};

export default Completed;