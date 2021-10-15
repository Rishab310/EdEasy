const express = require('express');

const router = express.Router();

const classroomController = require('../controllers/classroom');

router.post('/createClassroom', classroomController.createClassroom);
router.post('/getClassrooms', classroomController.getClassrooms);

module.exports = router; 