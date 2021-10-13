import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTimeFromTimestamp, getDateStringFromTimestamp } from '../../utilities';

import Avatar from '@material-ui/core/Avatar';
import PhotoRoundedIcon from '@material-ui/icons/PhotoRounded';

import autosize from 'autosize';

const Discussion = () => {
    const [discussionInput, setDiscussionInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [fileInput, setFileInput] = useState();
    let TextArea = useRef(null);
    let FileInput = useRef(null);

    useEffect(() => {
        autosize(TextArea);
    }, [])

    useEffect(() => {
        setPosts([
            {
                imgLink: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                uploadTimestamp: 1633796940000,
                authorName: "Manish Dhameja",
                adminEmail: "123@gmail.com"
            },
            {
                imgLink: null,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                uploadTimestamp: 1633703340000,
                authorName: "Rishab Goyal",
                adminEmail: "1234@gmail.com"
            },
            {
                imgLink: null,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                uploadTimestamp: 1633530000000,
                authorName: "Ishan Yadav",
                adminEmail: "12345@gmail.com"
            }
        ])
    }, [])

    const imgPreview = (e) => {
        console.log(e.target.files[0]);
        setFileInput(e.target.files[0]);
    }

    return (
        <div>
            <div className="Discussion d-flex py-2 px-3 content-box">
                <div className="Avatar_Container">
                    <Avatar>
                        M
                    </Avatar>
                </div>
                <div className="Discussion_TextArea d-flex flex-column justify-content-center align-items-center">
                    <textarea 
                        ref={c => (TextArea = c)}
                        placeholder="Start a discussion, share class materials, etc...."
                        rows={1}
                        value={discussionInput}
                        onChange={(e) => setDiscussionInput(e.target.value)}
                        />
                    {
                        fileInput ? (
                            <div className="Discussion_PreviewImg ms-1 mt-2">
                                <img src={URL.createObjectURL(fileInput)} />
                            </div>
                        ) : null
                    }
                </div>
                <div className="mt-2">
                    <PhotoRoundedIcon style={{fontSize: "30px"}} onClick={() => FileInput.current.click()}/>
                    <input 
                        accept=".jpeg, .jpg, .png"
                        className="Discussion_FileInput" 
                        type="file" ref={FileInput} 
                        onChange={(e) => imgPreview(e)}
                    />
                </div>

            </div>
            <div className="Posts">
                {
                    posts.map(post => {
                        return (
                            <div className="content-box px-3 py-2 my-3">
                                <div className="d-flex">
                                    <div className="Avatar_Container">
                                        <Avatar>
                                            {post.authorName[0]}
                                        </Avatar>
                                    </div>
                                    <div className="Post_Author d-flex flex-column justify-content-center mx-3">
                                        <div className="Post_AuthorName">{post.authorName}</div>
                                        {
                                            post.adminEmail === "123@gmail.com" ? (
                                                <div className="Post_AdminName">
                                                    Admin
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <div className="Post_UploadDate">
                                            {getDateStringFromTimestamp(post.uploadTimestamp)}
                                        </div>
                                        <div className="Post_UploadTime">
                                            {getTimeFromTimestamp(post.uploadTimestamp)}
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        post.imgLink ? (
                                            <div className="Post_Img">
                                                <img src={post.imgLink} alt="" />
                                            </div>
                                        ) : null
                                    }
                                    <p className="Post_Desc">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Discussion;