import React, { useState } from 'react';
import "./Dashboard.css";
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import CreateClassroom from '../Classroom/CreateClassroom'; 
import JoinClassroom from '../Classroom/JoinClassroom';
const SideDash = (props) => {
  const [show, setShow] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const toggleJoin = () => setShowJoin(prevState=>!prevState);
  const owned = props.owned;
  const enrolled = props.enrolled;
  const [seeAllOwned , setSeeAllOwned] = useState(false);
  const [seeAllEnrolled , setSeeAllEnrolled] = useState(false);
  return (
    <div className="col-3 d-none d-md-block Dashboard_Sidedrawer px-1 ps-4 width-20">
      <div className="owned">
        <h6 className="ms-2 fw-bold">Owned</h6>
        {
          (owned.length != 0) ? (
            <>
              {
                owned.slice(0,(seeAllOwned)?owned.length:Math.min(2,owned.length)).map((sub,index) => {
                  return (
                    <Link key={index} to={"/classes/"+sub.classCode}> 
                      <div className="Sidedrawer_Class active d-flex p-2 ps-2">
                        <div>
                          <div className="class-avatar">
                            <Avatar>{sub.adminName.slice(0,1).toUpperCase()}</Avatar>
                          </div>
                        </div>
                        <div className="ms-2 d-flex flex-column">
                          <div className="Class_Title">{sub.className}</div>
                          <div className="Class_Desc">{sub.classLevel}</div>
                        </div>
                      </div>
                    </Link>
                  );
                  })
              }
              {
                owned.length > 2 ? (
                <div className="See_All d-flex justify-content-end pt-2">
                  {
                    seeAllOwned ? (
                      <div onClick={() => setSeeAllOwned(false)}>
                        See Less
                      </div>
                    ) : (
                      <div onClick={() => {setSeeAllOwned(true); setSeeAllEnrolled(false);}}>
                        See All
                      </div>
                    )
                  }
                </div>
                ) : null
              }
            </>
          ) : (
            <div className="ms-2 text-muted mb-3">You haven't created any class.</div>
          )
        }
      </div>

      <div className="enrolled">
        <h6 className="ms-2 mt-3 fw-bold">Enrolled</h6>
        {
          (enrolled.length !=0) ? (
            <>
              {
                enrolled.slice(0,(seeAllEnrolled)?enrolled.length:Math.min(2,enrolled.length)).map((sub,index) => {
                  return (
                    <Link key={index} to={"/classes/"+sub.classCode}> 
                      <div className="Sidedrawer_Class active d-flex p-2 ps-2">
                        <div>
                        <div className="class-avatar">
                            <Avatar>{sub.adminName.slice(0,1).toUpperCase()}</Avatar>
                          </div>
                        </div>
                        <div className="ms-2 d-flex flex-column">
                          <div className="Class_Title">{sub.className}</div>
                          <div className="Class_Desc">{sub.classLevel}</div>
                        </div>
                      </div>
                    </Link>
                  );
                  })
              }
              {
                enrolled.length > 2 ? (
                  <div className="See_All d-flex justify-content-end pt-2">
                    {
                      seeAllEnrolled ? (
                        <div onClick={() => setSeeAllEnrolled(false)}>
                          See Less
                        </div>
                      ) : (
                        <div onClick={() => {setSeeAllOwned(false); setSeeAllEnrolled(true);}}>
                          See All
                        </div>
                      )
                    }
                  </div>
                ) : null
              }
            </>
          ) : (
            <div className="ms-2 text-muted mb-3">You haven't enrolled in any class.</div>
          )
        }
      </div>
      <div className="row join-links pt-3">
        <div className="col-12 d-flex justify-content-center pb-3">
          <button className="join-create-btn" onClick={() => setShowJoin(true)}>
            <AddIcon className="pe-1 mb-1"></AddIcon>
            Join Class
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center pb-3">
          <button className="join-create-btn" onClick={() => setShow(true)}>
          <AddIcon className="pe-1 mb-1"></AddIcon>
            Create Class
          </button>
        </div>
      </div>
      <CreateClassroom isModalOpen={show} toggleModal={toggle} setShow={setShow}/>
      <JoinClassroom isModalOpen={showJoin} toggleModal={toggleJoin} setShow={setShowJoin}/>
    </div>
  );
}

export default SideDash;
