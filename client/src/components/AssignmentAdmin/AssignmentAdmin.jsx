import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './AssignmentAdmin.css'
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader'
import FooterNav from '../partials/FooterNav/FooterNav'
import { useParams } from 'react-router-dom';

import Pagination from './Pagination';
import Posts from './Posts';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../reduxSlices/authSlice';

const AssignmentAdmin = () => {
    const [posts, setPosts] = useState([]);

    const [postLoading, setPostLoading] = useState(false);
    const [assgnLoading, setAssgnLoading] = useState(false);
    const [assignmentDetails, setAssignmentDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentId = useParams().assignId;
    const userData = useSelector(selectUserData);

    const fetchPosts = () =>{
        setPostLoading(true);
        axios.post("https://edeasy.onrender.com/classes/getSubmissions", {
            assignmentId: assignmentId
        }, 
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }
        })
        .then(res => {
            setPosts(res.data);
            setPostLoading(false);
        })
        .catch(err => {
            console.log(err);
            setPostLoading(false);
        })
    }

    const getAssignment = () => {
        setAssgnLoading(true);
        axios.post("https://edeasy.onrender.com/classes/getAssignment", {
            assignmentId: assignmentId
        }, 
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }
        })
        .then(res => {
            setAssignmentDetails(res.data);
            setAssgnLoading(false);
        })
        .catch(err => {
            console.log(err);
            setAssgnLoading(false);
        })
    }
    
    useEffect(() => {
        getAssignment();
        fetchPosts();
    }, []);

    const postsPerPage = 10;
    const indexofLastPost = currentPage * postsPerPage;
    const indexofFirstPost =  indexofLastPost - postsPerPage;
    const currentPosts = posts.slice(indexofFirstPost, indexofLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ marginTop: "90px" }}>
            <div className="d-none d-md-block">
                <Header />
            </div>
            <div className="d-block d-md-none">
                <MobileHeader />
            </div>
            <Posts fetchPosts={fetchPosts} dueDate={assignmentDetails?.dueDate} assignmentName={assignmentDetails?.name} posts={currentPosts} loading={assgnLoading || postLoading} paginate={paginate}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
            <div className="d-block d-md-none">
                <FooterNav />
            </div>
        </div>
    )
}

export default AssignmentAdmin