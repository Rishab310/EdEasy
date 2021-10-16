const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth')

const classroomController = require('../controllers/classroom');

router.post('/createClassroom', isAuth, classroomController.createClassroom);
router.post('/getClassrooms', isAuth, classroomController.getClassrooms);
router.post('/joinClassroom', isAuth, classroomController.joinClassroom);
router.post('/createDiscussion', classroomController.createDiscussion);

module.exports = router; 