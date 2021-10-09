import React,{useState} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Pagination } from 'reactstrap';

const Posts = ({posts, loading, paginate}) => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const [value, setValue] = useState('');
    const handleSelect=(e)=>{
        setValue(e);
        console.log(e);
      }
    if(loading){
        return <h5>...Loading</h5>
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="head col-6 d-flex mt-5 p-2 justify-content-center">
                        Assignment - 01 DS-OS
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
                {console.log(toggleState)}
                <div className="content-tabs">
                    <div className={"content  active-content"}>
                        <h2>36 submissions</h2> 
                        <hr />
                        <div className="container">
                            <div className="row">

                                {posts.filter(post=>{
                                console.log(post)
                                    if(toggleState === 1){
                                        return true;
                                    }
                                    if(toggleState === 2){
                                        return post.submissionTime <= post.duedate;
                                    }
                
                                    if(toggleState === 3){
                                        {console.log(post.submissionTime > post.duedate)}
                                        return post.submissionTime > post.duedate;
                                    }
                                }).map(post=>{

                                    return(
                                    <div className="head d-flex mt-3 p-2 ">
                                        <div className="adjust col-4 ps-3">
                                                <strong>{post.name}</strong>
                                                {/* {console.log(posts)} */}
                                            </div>
                                            <div className="col-4 d-flex align-tems-center justify-content-center">
                                                <a className="adjust" href="url">{post.fileLink}</a>
                                            </div>
                                            <div className="adjust col-4 pe-3 d-flex align-tems-center justify-content-end">
                                                <DropdownButton
                                                    className="btns"
                                                    alignRight
                                                    title= {`${value}/10`}
                                                    id="dropdown-menu-align-right"
                                                    onSelect={handleSelect}
                                                >
                                                    <Dropdown.Item eventKey="0">0</Dropdown.Item>
                                                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                                    <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                                    <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                                    <Dropdown.Item eventKey="6">6</Dropdown.Item>
                                                    <Dropdown.Item eventKey="7">7</Dropdown.Item>
                                                    <Dropdown.Item eventKey="8">8</Dropdown.Item>
                                                    <Dropdown.Item eventKey="9">9</Dropdown.Item>
                                                    <Dropdown.Item eventKey="10">10</Dropdown.Item>
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
