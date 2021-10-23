import React,{useState} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { selectUserData } from '../../reduxSlices/authSlice';
import { useSelector } from 'react-redux';

const Posts = ({fetchPosts, posts, loading, paginate, assignmentName, dueDate}) => {
    const [toggleState, setToggleState] = useState(1);
    const userData = useSelector(selectUserData);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    
    const setGrade = (submissionId, grade)=>{
        axios.post("http://localhost:5000/classes/setGrade", {
            submissionId: submissionId,
            grade: grade
        }, 
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }
        })
        .then(res => {
            fetchPosts();
        })
        .catch(err => {
            console.log(err);
        })
      }

    if(loading){
        return (
            <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <CircularProgress size={80} className="display-block"/>
            </div>
        )
    }

    posts = posts.filter(post=>{
        if(toggleState === 1){
            return true;
        }
        if(toggleState === 2){
            return post.createdAt <= dueDate;
        }

        if(toggleState === 3){
            return post.createdAt > dueDate;
        }
    })

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="head col-6 d-flex mt-5 p-2 justify-content-center">
                        {assignmentName}
                    </div>
                </div>
            </div> 
            <div className="navtab">

                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => {toggleTab(1); paginate(1)} }
                    >
                        Total Submission
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => {toggleTab(2); paginate(1)} }
                    >
                        OnTime Submission
                    </button>
                    <button
                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                        onClick={() => {toggleTab(3); paginate(1)}}
                    >
                        Late Submission
                    </button>
                </div>
                <div className="content-tabs">
                    <div className={"content  active-content"}>
                        <h2>{posts.length} submission{posts.length > 1 ? "s" : null}</h2> 
                        <hr />
                        <div className="container">
                            <div className="row">

                                {posts.map(post=>{

                                    return(
                                    <div className="head d-flex mt-3 p-2 ">
                                        <div className="adjust col-4 ps-3">
                                                <strong>{post.studentName}</strong>
                                                {/* {console.log(posts)} */}
                                            </div>
                                            <div className="col-4 d-flex align-tems-center justify-content-center">
                                                <a target="_blank" className="adjust blue-link" href={post.fileLink}>{post.fileName}</a>
                                            </div>
                                            <div className="adjust col-4 pe-3 d-flex align-tems-center justify-content-end">
                                                <DropdownButton
                                                    alignRight
                                                    title= {(post.grade ? `${post.grade}` : '_ ') + "/10"}
                                                    id="dropdown-menu-align-right"
                                                    onSelect={(e) => setGrade(post._id, e)}
                                                >
                                                    <Dropdown.Item className="text-dark" eventKey="0">0</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="1">1</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="2">2</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="3">3</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="4">4</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="5">5</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="6">6</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="7">7</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="8">8</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="9">9</Dropdown.Item>
                                                    <Dropdown.Item className="text-dark" eventKey="10">10</Dropdown.Item>
                                                </DropdownButton>
                                            </div>
                                    </div>
                                    )
                                })}
                            </div>
                            </div>
                        </div>

                        
                    </div>
            </div>
        </div>
    )
}

export default Posts
