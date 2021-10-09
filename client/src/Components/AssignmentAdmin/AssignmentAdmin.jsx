import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './AssignmentAdmin.css'
import Header from '../partials/Header/Header';

import Pagination from './Pagination';
import Posts from './Posts';
// import ReactPaginate from 'react-paginate';

const AssignmentAdmin = () => {
    const [posts, setPosts] = useState([
        {name : "Jatin", fileName : "abc.pdf", fileLink : "url", submissionTime : 1633793320000, duedate: 1633793420000},
        {name : "Manish", fileName : "abc.pdf", fileLink : "url", submissionTime : 1633879820000, duedate: 1633793420000},
        {name : "Rishab", fileName : "abc.pdf", fileLink : "url", submissionTime : 1633879820000, duedate: 1633793420000},
        {name : "Rishab", fileName : "abc.pdf", fileLink : "url", submissionTime : 1633879820000, duedate: 1633793420000 },
        {name : "Rishab", fileName : "abc.pdf", fileLink : "url", submissionTime : 1633879820000, duedate: 1633793420000 },
        {name : "Lorem", fileName : "a.pdf", fileLink : "url", submissionTime : 1633879820000, duedate: 1633793420000 },
    ]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    
    useEffect(() => {
        const fetchPosts = async() =>{
            setLoading(true);
            // const res = await axios.get('link');
            // setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    const indexofLastPost = currentPage * postsPerPage;
    const indexofFirstPost =  indexofLastPost - postsPerPage;
    const currentPosts = posts.slice(indexofFirstPost, indexofLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="">
            <Header />
            <Posts posts={currentPosts} loading={loading} paginate={paginate}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
}

export default AssignmentAdmin

// {posts.map(post =>{
//     <li key={post.id}>{post.title}</li>
// })}
