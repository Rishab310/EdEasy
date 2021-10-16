const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth')

const classroomController = require('../controllers/classroom');

router.post('/createClassroom', isAuth, classroomController.createClassroom);
router.post('/getClassrooms', isAuth, classroomController.getClassrooms);
router.post('/joinClassroom', classroomController.joinClassroom);
router.post('/getClassroom', classroomController.getClassroom);
router.delete('/deleteClassroom', classroomController.deleteClassroom);
router.post('/createDiscussion', classroomController.createDiscussion);
router.post('/getDiscussions', classroomController.getDiscussions);
router.post('/createAssignment', classroomController.createAssignment);
router.post('/getAssignments', classroomController.getAssignments);
router.post('/getAssignment', classroomController.getAssignment);

module.exports = router; 