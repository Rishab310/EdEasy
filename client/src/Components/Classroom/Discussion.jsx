import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTimeFromTimestamp, getDateStringFromTimestamp } from '../../utilities';

import Avatar from '@material-ui/core/Avatar';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';

const Discussion = () => {
    const [posts, setPosts] = useState([]);

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

    return (
        <div>
            <div className="Discussion d-flex align-items-center py-2 px-3 content-box">
                <div className="Avatar_Container">
                    <Avatar>
                        M
                    </Avatar>
                </div>
                {/* <div className="Discussion_Input">
                    <textarea name="text" rows="1" cols="10" wrap="soft"></textarea>
                    <input type="text" placeholder="Start a discussion, share class materials, etc...."/>
                </div> */}
                <div class="grow-wrap">
                    <textarea name="text" id="text" onInput="this.parentNode.dataset.replicatedValue = this.value"></textarea>
                </div>
                <div>
                    <CameraAltRoundedIcon /> 
                </div>
                <div>
                    <AttachFileRoundedIcon />
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