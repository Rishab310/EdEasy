import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../reduxSlices/authSlice';
import { getTimeFromTimestamp, getDateStringFromTimestamp } from '../../utilities';

import Avatar from '@material-ui/core/Avatar';
import PhotoRoundedIcon from '@material-ui/icons/PhotoRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import autosize from 'autosize';
import axios from 'axios';
import db, { storage } from '../../firebase';
import CircularProgress from "@material-ui/core/CircularProgress";

const Discussion = ({classCode, adminEmail}) => {
    const [discussionInput, setDiscussionInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [fileInput, setFileInput] = useState();
    const userData = useSelector(selectUserData);
    let TextArea = useRef(null);
    let FileInput = useRef(null);
    const storeData = useSelector(selectUserData);
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    useEffect(() => {
        autosize(TextArea);
    }, [])
    
    const getDiscussion = async () => {
        setLoading(true);
        await axios.post("https://edeasy.herokuapp.com/classes/getDiscussions",{
            classCode: classCode
        },{ headers: { Authorization: 'Bearer ' + storeData.token } }
        ).then ((res) => {
            setPosts(res.data.reverse());
        }).catch(err => console.log(err.response))
        setLoading(false);
    }
    useEffect( () => {
        getDiscussion();
    }, [])

    const imgPreview = (e) => {
        console.log(e.target.files[0]);
        setFileInput(e.target.files[0]);
    }

    const createDiscussion = () => {
        setCreateLoading(true);
        if (fileInput) {
            const fileName = new Date().getTime() + "-" + fileInput.name;
            const uploadTask = storage.ref(`discussion/${fileName}`).put(fileInput);
            uploadTask.on('state_changed', console.log, console.error, () => {
                storage.ref('discussion').child(fileName).getDownloadURL()
                  .then(firebaseURL => {
                    return axios.post('https://edeasy.herokuapp.com/classes/createDiscussion', {
                        creatorEmail: userData.userEmail,
                        creatorName: userData.userName,
                        classCode: classCode,
                        desc: discussionInput,
                        imgLink: firebaseURL
                    }, 
                    {
                        headers: {
                            Authorization: "Bearer " + userData.token
                        }
                    })
                  })
                  .then(res => {
                    console.log(res);
                    setDiscussionInput("");
                    setFileInput(null);
                    getDiscussion();
                    autosize(TextArea);
                    setCreateLoading(false);
                  })
                  .catch(err => {
                      console.log(err);
                      setDiscussionInput("");
                      setFileInput(null);
                      autosize(TextArea);
                      setCreateLoading(false);
                  })
              })
        } else {
            axios.post('https://edeasy.herokuapp.com/classes/createDiscussion', {
                creatorEmail: userData.userEmail,
                creatorName: userData.userName,
                classCode: classCode,
                desc: discussionInput
            }, 
            {
                headers: {
                    Authorization: "Bearer " + userData.token
                }
            })
            .then(() => {
                setDiscussionInput("");
                setFileInput(null);
                getDiscussion();
                autosize(TextArea);
                setCreateLoading(false);
            }).catch(err => {
                console.log(err);
                setDiscussionInput("");
                setFileInput(null);
                autosize(TextArea);
                setCreateLoading(false);
            })
        }
    }

    return (
        <div>
            <div className="Discussion d-flex py-2 px-3 content-box">
                <>
                    <div className="Avatar_Container mt-1 mt-md-0">
                        <Avatar>{storeData.userName && storeData.userName.slice(0,1)}</Avatar>
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
                        <PhotoRoundedIcon className="InputImgButton" style={{fontSize: "30px"}} onClick={() => FileInput.current.click()}/>
                        <input 
                            accept=".jpeg, .jpg, .png"
                            className="Discussion_FileInput" 
                            type="file" 
                            ref={FileInput} 
                            onChange={(e) => imgPreview(e)}
                        />
                    </div>
                    {
                        (discussionInput !== '' || fileInput) ? (
                            <div className="mt-2">
                                <SendRoundedIcon onClick={createDiscussion} className="SendButton" style={{fontSize: "30px"}}/>
                            </div>
                        ) : null
                    }
                </>
            </div>
            {
                (createLoading) ? (
                    <div className="col-12 d-flex justify-content-center align-items-center mt-2">
                        <CircularProgress size={50} className="display-block"/>
                    </div>
                ) : (
                    <></>
                )
            }
            {
                (loading) ? (
                    <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                        <CircularProgress size={50} className="display-block"/>
                    </div>
                ) : (
                    <div className="Posts">
                        {
                            posts.map(post => {
                                return (
                                    <div key={post._id} className="content-box px-3 py-2 my-3">
                                        <div className="d-flex">
                                            <div className="Avatar_Container">
                                                <Avatar>
                                                    {post.creatorName[0]}
                                                </Avatar>
                                            </div>
                                            <div className="Post_Author d-flex flex-column justify-content-center mx-3">
                                                <div className="Post_creatorName">{post.creatorName}</div>
                                                {
                                                    post.creatorEmail === adminEmail ? (
                                                        <div className="Post_AdminName">
                                                            Admin
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <div className="Post_UploadDate">
                                                    {getDateStringFromTimestamp(post.createdAt)}
                                                </div>
                                                <div className="Post_UploadTime">
                                                    {getTimeFromTimestamp(post.createdAt)}
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
                                                {post.desc}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Discussion;