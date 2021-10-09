import React from 'react';
import { useParams } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';

const Discussion = () => {
    return (
        <div className="Discussion d-flex align-items-center">
            <div>
                <Avatar style={{backgroundColor: "#1B559C"}}>
                    M
                </Avatar>
            </div>
            <div>
                <input type="text" placeholder="Start a discussion, share class materials, etc...."/>
            </div>
            <div>
                <CameraAltRoundedIcon /> 
            </div>
            <div>
                <AttachFileRoundedIcon />
            </div>
        </div>
    )
}

export default Discussion;