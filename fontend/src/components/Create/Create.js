import React, {useEffect, useRef, useState} from 'react';
import {Container, Form, InputGroup, Row} from "react-bootstrap";
import {errorToast, isEmpty} from "../../helpers/formHelper";
import {createTaskRequest, getTaskGroupByStatus, getTaskGroups, getTasksByStatus} from "../../APIRequest/taskApi";
import {useNavigate} from "react-router-dom";
import {Label} from "recharts";
import {useSelector} from "react-redux";

const Create = () => {

    let taskGroupRef, titleRef, descriptionRef  = useRef();
    const navigate = useNavigate();
    const taskGroup = useSelector((state) => state.task.taskGroup);

    const [group, setGroup] = useState('');

    useEffect(()=> {
        getTaskGroups()
    }, []);

    const CreateNew = (e)=>{

        e.preventDefault();

        let groupName = '';
        let exitGroup = '';

        if (isEmpty(group)){
            groupName = taskGroupRef.value.trim();
        }else {
            exitGroup = group
        }

        const title = titleRef.value.trim();
        const description = descriptionRef.value.trim();

        // const test = !isEmpty(exitGroup) && !isEmpty(groupName) ? true : false

        if (isEmpty(exitGroup) && isEmpty(groupName)){
            errorToast('Group Name is required');
        }else if (isEmpty(title)){
            errorToast('Title is required');

        }else if (isEmpty(description)){
            errorToast('Description is required');
        }else {
            createTaskRequest(groupName, title, description, exitGroup).then(result => {
                if (result){
                    navigate('/all')
                }
            }).catch()
        }

    }

    const handleOnchange = (e)=>{
        const group = e.target.value;
        setGroup(group)
    }

    return (
        <Container fluid={true} className="content-body">
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 className='mb-5'>Create New Task</h4>
                            <Form onSubmit={CreateNew}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Select a exit Group</Form.Label>
                                    <Form.Select onChange={handleOnchange}>
                                        <option value='' selected>select a group</option>
                                        {
                                            taskGroup.map((group, i) => (
                                                <option key={group._id.groupName} value={group._id.groupName}>{group._id.groupName}</option>
                                            ))
                                        }

                                    </Form.Select>
                                </Form.Group>
                                <p>OR</p>
                                <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Create a new Group</Form.Label>
                                    <Form.Control type="text" placeholder='create a new group name' aria-autocomplete='none' ref={(input)=>taskGroupRef=input} className="form-control animated fadeInUp"/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Task Title</Form.Label>
                                    <Form.Control type="text" placeholder='task title' ref={(input)=>titleRef=input} className="form-control animated fadeInUp"/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control as="textarea" placeholder='task description' rows={3} ref={(input)=>descriptionRef=input} className="animated fadeInUp"/>
                                </Form.Group>
                                <button type='submit' className="btn float-end btn-primary">Create</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Create;