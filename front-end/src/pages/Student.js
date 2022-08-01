import axios from "axios";
import React, { Component } from "react";
import { ReactDOM } from "react";
import { CircularProgress } from '@mui/material';
import swal from "sweetalert";

class Student extends Component {

    state = {
        students: [],
        loading: true,
    }

    async componentDidMount(){
    
    const res = await axios.get('http://localhost:8000/api/students');
    console.log(res.data);
        if (res.data.status === 200) {
            this.setState({
                students: res.data.students,
                loading: false,
            })
        }
    }

    deleteStudent = async (e, id) => {

        const thidClickedFounda = e.currentTarget;
        thidClickedFounda.innerText = "Deleting";

        const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`);
        if (res.data.status === 200) {
            
            thidClickedFounda.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Deleted",
                text: res.data.message,
                icon: "success",
                button: "Ok",
            });
        }
    }

    render() {

        var student_HTMLTABLE = "";
        if (this.state.loading) {
            
            student_HTMLTABLE = <tr><td colspan="7"><center><CircularProgress color="inherit" /></center></td></tr>;
        }else{

            student_HTMLTABLE = 
            this.state.students.map( (item) =>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <a href={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</a>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                );
            } );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Student Data</h4>
                                <a className="btn btn-primary btn-sm float-end" href="/add-student">Add Student</a>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>E-mail</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Student;