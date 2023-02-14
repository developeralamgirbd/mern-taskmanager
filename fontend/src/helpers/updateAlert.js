import Swal from "sweetalert2";
import {updateStatus} from "../APIRequest/taskApi";

export const UpdateAlert = (id, status)=>{
   return Swal.fire({
        title: 'Select status',
        input: 'select',
        inputOptions: {
            new: 'New',
            progress: 'Progress',
            completed: 'Completed',
            canceled: 'Canceled'
        },
        inputValue: status,
        showCancelButton: true,
       confirmButtonText: 'Update'
    }).then(result => {
       if (result.isConfirmed){
           return updateStatus(id, result.value).then(res => {
               return res
           })
       }
    })
}