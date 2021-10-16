const Classroom = require('../models/classroom');
const classCode = require('../models/classCode');
const User = require('../models/user');
const Discussion = require('../models/discussion');
const Assignment = require('../models/assignment');

exports.createClassroom = async (req, res, next) => {
    let currClassCode;
    await classCode.findOne().then(obj => {
        currClassCode = obj.code + 1;
        obj.code = currClassCode;
        obj.save();
    }).catch(err => {
        err.statusCode = 500;
        next(err);
    })

    const newClassroom = new Classroom({
        adminName: req.body.adminName,
        adminEmail: req.body.adminEmail,
        desc: req.body.desc,
        classCode: currClassCode, 
        className: req.body.className,
        meetLink: req.body.meetLink,
        fieldName: req.body.fieldName,
        classLevel: req.body.classLevel
    })
    newClassroom.save()
        .then(result => {
            User.findOne({email: req.body.adminEmail}).then(user => {
                user.classesOwned.push(currClassCode);
                user.save();
            }).catch(err => {
                next(err);
            })
            res.status(201).json({message: "Classroom created successfully"});
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
}

exports.getClassrooms = (req, res, next) => {
    const type = req.body.type;
    const userEmail = req.body.userEmail;
    if (type === "owned") {
        Classroom.find({adminEmail: userEmail})
            .then(results => {
                res.json(results);
            }).catch(err => {
                next(err);
            })
    } else if (type === "enrolled") {
        User.findOne({email: userEmail})
            .then(user => {
                Classroom.find({classCode: user.classesEnrolled})
                    .then(results => {
                        console.log(results);
                        res.json(results);
                    })
                    .catch(err => {
                        next(err);
                    })
            }).catch(err => {
                next(err);
            })
    } else {
        const err = new Error("Invalid params");
        err.statusCode = 422;
        next(err);
    }
}

exports.joinClassroom = (req, res, next) => {
    const userEmail = req.body.userEmail;
    const classCode = req.body.classCode;
    Classroom.findOne({classCode: classCode})
        .then(classroom => {
            if (!classroom) {
                const err = new Error("Classroom with given class code does not exists.");
                err.statusCode = 403;
                next(err);
            }
            if (classroom.members.indexOf(userEmail) >= 0) {
                const err = new Error("User already Enrolled.");
                err.statusCode = 403;
                next(err);
            }
            classroom.members.push(userEmail);
            return classroom.save();
        })
        .then(result => {
            return User.findOne({email: userEmail});
        })
        .then(user => {
            if (user.classesOwned.indexOf(classCode) >= 0) {
                const err = new Error("Users cannot enroll in class created by themselves.")
                err.statusCode = 403;
                next(err);
            }
            user.classesEnrolled.push(classCode);
            return user.save();
        })
        .then(result => {
            res.json({message: "Class joined successfully!"});
        })
        .catch(err => {
            next(err);
        })
}

exports.deleteClassroom = (req, res, next) => {
    const classCode = req.body.classCode;
    Classroom.findOneAndDelete({classCode: classCode})
        .then(classroom => {
            if (!classroom) {
                const err = new Error("Invalid ClassCode.");
                err.statusCode = 422;
                next(err);
            }

            classroom.members.forEach(memberEmail => {
                User.findOne({email: memberEmail})
                    .then(user => {
                        if (user) {
                            user.classesEnrolled = user.classesEnrolled.filter(classEnrolledCode => {
                                return classEnrolledCode.toString() !== classCode;
                            });

                            user.classesOwned = user.classesOwned.filter(classOwnedCode => {
                                return classOwnedCode.toString() !== classCode;
                            });

                            user.save();
                        }
                    })
                    .catch(err => {
                        next(err);
                    })
            })

            Discussion.deleteMany({classCode: classCode})
                .then(result => {
                    console.log(result);
                    res.json({message: "Classroom deleted successfully"});
                })
                .catch(err => {
                    next(err);
                })

        })
        .catch(err => {
            next(err);
        })
}

exports.getClassroom = (req, res, next) => {
    const classCode = req.body.classCode;
    Classroom.findOne({classCode: classCode})
        .then(classroom => {
            if (!classroom) {
                const err = new Error("Invalid classcode.");
                err.statusCode = 422;
                next(err);
            }

            res.json(classroom);
        })
        .catch(err => {
            next(err);
        })
}

exports.createDiscussion = (req, res, next) => {
    const creatorName = req.body.creatorName;
    const creatorEmail = req.body.creatorEmail;
    const classCode = req.body.classCode;
    const imgLink = req.body.imgLink;
    const desc = req.body.desc;

    const discussion = new Discussion({
        creatorEmail: creatorEmail,
        creatorName: creatorName,
        classCode: classCode,
        imgLink: imgLink,
        desc: desc
    })
    
    discussion.save()
        .then(result => {
            res.json({message: "Discussion created successfully"});
        })
        .catch(err => {
            next(err);
        })
}

exports.getDiscussions = (req, res, next) => {
    const classCode = req.body.classCode;
    Discussion.find({classCode: classCode})
        .then(discussions => {
            res.json(discussions);
        })
        .catch(err => {
            next(err);
        })
}

exports.createAssignment = (req, res, next) => {
    const classCode = req.body.classCode;
    const name = req.body.name;
    const desc = req.body.desc;
    const dueDate = req.body.dueDate;
    const fileLink = req.body.fileLink;
    const creatorEmail = req.body.creatorEmail;

    const assignment = new Assignment({
        classCode: classCode,
        name: name,
        desc: desc,
        dueDate: dueDate,
        fileLink: fileLink,
        creatorEmail: creatorEmail
    })

    assignment.save()
        .then(result => {
            res.json({message: "Assignment created successfully"});
        })
        .catch(err => {
            next(err);
        })
}

exports.getAssignments = (req, res, next) => {
    const classCode = req.body.classCode;
    Assignment.find({classCode: classCode})
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            next(err);
        })
}

exports.getAssignment = (req, res, next) => {
    const assignmentId = req.body.assignmentId;
    Assignment.findById(assignmentId)
        .then(assignment => {
            res.json(assignment);
        })
        .catch(err => {
            next(err);
        })
}