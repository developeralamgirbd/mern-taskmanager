const Task = require('../models/Task');

// Create a task
exports.createTask= (req,res)=>{
    let reqBody = req.body
    reqBody.email = req.headers['email'];

    Task.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({
                status:"fail",
                error:err.message
            })
        }
        else{
            res.status(200).json({
                status:"success",
                data:data
            })
        }
    })
}

// Delete Task
exports.deleteTask=(req,res)=>{
    let id= req.params.id;
    let Query={_id:id};

    Task.remove(Query,(err,data)=>{
        if(err){
            res.status(400).json({
                status:"fail",
                error: err.message
            })
        }
        else{
            res.status(200).json({
                status:"success",
                data: data
            })
        }
    })
}


// Update Task status
exports.updateTaskStatus= async (req,res)=>{
    let id= req.params.id;
    let status = req.params.status;
    let Query = {_id:id};
    let reqBody = { status: status }

    const isTask = await Task.findById(id);
    if (!isTask) {
       return res.status(404).json({
            status:"fail",
            error: 'Not found'
        })
    }

    const title = reqBody?.title ? reqBody?.title : isTask.title;
    const description = reqBody?.description ? reqBody?.description : isTask.description;
    const groupName = reqBody?.groupName ? reqBody?.groupName : isTask.groupName;

    Task.updateOne(Query, {$set: {title, description, groupName}},(err, data)=>{
        if(err){
            res.status(400).json({
                status:"fail",
                error: err.message
            })
        }
        else{
            res.status(200).json({
                status:"success",
                data: data
            })
        }
    })
}

// Get Task by status
exports.listTaskByStatus=(req,res)=>{
    let status= req.params.status;
    let email=req.headers['email'];

    Task.aggregate([
        {$match:{ status: status, email:email }},
        {$project:{
                _id:1,title:1,description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }},
        {$sort: {_id: -1}}
    ], (err, data)=>{
        if(err){
            res.status(500).json({
                status: "fail",
                error: err.message
            })
        }
        else{
            res.status(200).json({
                status:"success",
                data:data})
        }
    })
}

// Get Task by status
exports.listTaskByGroup=(req,res)=>{
    let status= req.params.status;
    let groupName= req.params.groupName;
    let email = req.headers['email'];

    Task.aggregate([
        {$match:{ status: status, email:email, groupName }},
        {$project:{
                _id:1,title:1,description:1, status:1, groupName,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }},
        {$sort: {_id: -1}}
        
    ], (err, data)=>{
        if(err){
            res.status(500).json({
                status: "fail",
                error: err.message
            })
        }
        else{
            res.status(200).json({
                status:"success",
                data:data})
        }
    })
}

exports.taskStatusCount=(req,res)=>{
    let email = req.headers['email'];
    Task.aggregate([
        {$match: { email: email }},
        {$group: { _id:"$status", sum:{ $count: {} } }}
    ], (err, data)=>{
        if(err){
            res.status(400).json({
                status:"fail",
                error: err.message})
        }
        else{
            res.status(200).json({
                status:"success",
                data:data
            })
        }
    })
}
