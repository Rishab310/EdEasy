const Classroom = require('../models/classroom');
const classCode = require('../models/classCode');
const User = require('../models/user');
const Discussion = require('../models/discussion');

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
    const adminEmail = req.body.adminEmail;
    if (type === "owned") {
        Classroom.find({adminEmail: adminEmail})
            .then(results => {
                res.json(results);
            }).catch(err => {
                next(err);
            })
    } else if (type === "enrolled") {
        User.findOne({email: adminEmail})
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
            if (classroom.members.includes(userEmail)) {
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

exports.createDiscussion = (req, res, next) => {
    const creatorName = req.body.creatorName;
    const creatorEmail = req.body.creatorEmail;
    const dueDate = new Date(req.body.dueDate);
    const classCode = req.body.classCode;
    const imgLink = req.body.imgLink;
    const desc = req.body.desc;

    const discussion = new Discussion({
        creatorEmail: creatorEmail,
        creatorName: creatorName,
        dueDate: dueDate,
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