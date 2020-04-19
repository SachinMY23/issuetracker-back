const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const passwordLib = require('../libs/passwordLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const fs=require('fs');


/* Models */
const issueModel = mongoose.model('Issue');
const userModel = mongoose.model('User');
const commentModel = mongoose.model('Comment')
//Function to get get all issues 
let getAllIssues = (req, res,next) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                userModel.findOne({ userId: req.params.userId }, (err, userDetails) => {
                    // handle the error here if the User is not found 
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        //generate the error message and the api response message here 
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        // if Company Details is not found 
                    } else if (check.isEmpty(userDetails)) {
                        // generate the response and the console error message here 
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Not Found', 404, null)
                        reject(apiResponse)
                    } else {
                        // prepare the message and the api response here 
                        logger.info('User Found', 'issueController: findUser()', 10)
                        console.log(userDetails)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, 'userId parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let fetchIssues = async (userDetails) => {
        return await new Promise(async (resolve, reject) => {
            console.log("Skip is"+req.query.skip);
            let allIssues = [];
            for (let i = req.query.skip; i <parseInt(req.query.skip)+10 && i<userDetails.issues.length; i++) {
                console.log("i is"+req.query.skip+5)
                issueModel.find({ issueId: userDetails.issues[i],status:"progress" }).exec((err, res) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else {
                        allIssues.push(res[0]);
                    }
                }
                )
            }
            setTimeout(function () {
                console.log(allIssues)
                resolve(allIssues)
            }, 2000)
        })
    }
    findUser(req, res)
        .then(fetchIssues)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'All Issues Of User Found', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}

//Function to create issue


let createIssue = (req, res) => {

    let createIssueFunction=()=>{
        return new Promise((resolve,reject)=>{
            if (check.isEmpty(req.params.userId)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'userId parameter missing', 403, null)
                reject(apiResponse)
            }
        
            else if (check.isEmpty(req.body.title) || check.isEmpty(req.body.description)) {
        
                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
        
                var today = Date.now()
                let issueId = shortid.generate()
        
                let newIssue = new issueModel({
        
                    issueId: issueId,
                    reporterId: req.params.userId,
                    reporterName: req.body.reporterName,
                    description: req.body.description,
                    createdOn: today,
                    assigneeId: req.body.assignId,
                    title: req.body.title,
                })
                newIssue.status = "progress";
                newIssue.attachments=(req.body.attachments.split(',')).slice(1);
                resolve(newIssue)
            }
        })
    }
      let findUser=(newIssue)=> { 
          return new Promise((resolve,reject)=>{
          
            userModel.findOne({userId:req.body.assignId}).exec((err,result)=>{
                console.log(newIssue)
                console.log("is"+req.body.assignId);

                if(err){
                    console.log("Error");
               
                } else if (check.isEmpty(result)) {
                    console.log('User Not Found.')
                    let apiResponse = response.generate(true, 'User Not Found here', 404, null)
                    reject(apiResponse)
                } else {
                    result.issues.push(newIssue.issueId)
                    console.log("result now is"+result)
                    result.save((er, succ) => {
                        if (er) {
                            let apiResponse = response.generate(false, 'Issue Assign Failed', 400, result)
                            reject(apiResponse)
                        }
                        else { newIssue.save((err, resultt) => {
                            if (err) {
                                console.log('Error Occured.')
                                logger.error(`Error Occured : ${err}`, 'Database', 10)
                                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                                reject(apiResponse)
                            } else if (check.isEmpty(resultt)) {
                                
                                console.log('Issue creation failed.')
                                let apiResponse = response.generate(true, 'Issue creation failed', 404, null)
                                reject(apiResponse)
                            } else {
                                resolve(resultt)
                            }
                        })
                    }
                }
          )}
        })
    })
}
createIssueFunction(req,res)
.then(findUser).
then((result)=>{
    let apiResponse = response.generate(true, 'Issue creation Successfull', 20, result)
    res.send(apiResponse)
})
.catch((err)=>{
    console.log("errorhandler");
    console.log(err);
    res.status(err.status)
    res.send(err)
})
}

//end of createIssue function

//Function to edit issue
let editIssue = (req, res) => {
    if (check.isEmpty(req.params.issueId)) {

        console.log('Issue id should be passed')
        let apiResponse = response.generate(true, 'Issue Id is missing', 403, null)
        res.send(apiResponse)
    } else {
        let options = req.body;
        if(options.attachments.length!==0){
        options.attachments=options.attachments.split(',');}
        if(options.assigneeId.length!==0){
        options.assigneeId=options.assigneeId.split(',');}
        console.log(options);
        issueModel.updateOne({ 'issueId': req.params.issueId }, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(true, 'Issue edited successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}//end of editMeetingFunction


let assignIssue = (req, res) => {
    if (check.isEmpty(req.params.userId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'userId parameter missing', 403, null)
        res.send(apiResponse)
    } else {
        userModel.find({ 'userId': req.params.userId })
            .exec((err, result) => {
                if (err) {

                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {

                    console.log('User Not Found.')
                    let apiResponse = response.generate(true, 'User Not Found', 404, null)
                    res.send(apiResponse)
                } else {


                    console.log("is" + result)
                    console.log(result[0].issues);

                    result[0].issues.push(req.body.issueId)
                    result[0].save((er, succ) => {
                        if (er) {
                            let apiResponse = response.generate(false, 'Issue Assign Failed', 400, result)
                            res.send(apiResponse)
                        }
                        else {
                            let apiResponse = response.generate(false, 'Issue Assigned Successfully.', 200, succ)
                            res.send(apiResponse)
                        }

                    })


                }
            })
    }
}

let getSingleIssue = (req, res) => {
    if (check.isEmpty(req.params.issueId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'issueId parameter missing', 403, null)
        res.send(apiResponse)
    } else {
        issueModel.find({ 'issueId': req.params.issueId })
            .exec((err, result) => {
                if (err) {

                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {

                    console.log('Issue Not Found.')
                    let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(true, 'Issue Datails Found Successfully', 200, result)
                    res.send(apiResponse)
                }

            })
    }
}

let completeIssue = (req, res) => {
    if (check.isEmpty(req.params.issueId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'issueId parameter missing', 403, null)
        res.send(apiResponse)
    } else {
        issueModel.find({ 'issueId': req.params.issueId })
            .exec((err, result) => {
                if (err) {

                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {

                    console.log('Issue Not Found.')
                    let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                    res.send(apiResponse);
                } else {
                    result[0].status = "closed"
                    result[0].save((err, resul) => {
                        if (err) {
                            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                            res.send(apiResponse);
                        }
                        else {
                            let apiResponse = response.generate(true, 'Issue marked as completed', 200, resul)
                            res.send(apiResponse)
                        }
                    })
                }
            })
    }
}

let addWatcher=(req,res)=>{
    if (check.isEmpty(req.params.issueId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'issueId parameter missing', 403, null)
        res.send(apiResponse)
    } else {
        issueModel.find({ 'issueId': req.params.issueId })
            .exec((err, result) => {
                if (err) {

                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {

                    console.log('Issue Not Found.')
                    let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                    res.send(apiResponse)
                } else {



                    result[0].watchers.push(req.body.userId)
                    result[0].save((er, succ) => {
                        if (er) {
                            let apiResponse = response.generate(false, 'Watcher Assign Failed', 400, result)
                            res.send(apiResponse)
                        }
                        else {
                            let apiResponse = response.generate(false, 'Watcher Assigned Successfully.', 200, succ)
                            res.send(apiResponse)
                        }

                    })


                }
            })
    }

}

let getWatcher=(req,res)=>{
    let findIssue = () => {
        return new Promise((resolve, reject) => {
            if (req.params.issueId) {
                issueModel.findOne({ issueId: req.params.issueId }, (err, issueDetails) => {
                    // handle the error here if the User is not found 
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        //generate the error message and the api response message here 
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        // if Company Details is not found 
                    } else if (check.isEmpty(issueDetails)) {
                        // generate the response and the console error message here 
                        logger.error('No Issue Found', 'issueController: findissue()', 7)
                        let apiResponse = response.generate(true, 'Issue Details Not Found', 404, null)
                        reject(apiResponse)
                    } else {
                        // prepare the message and the api response here 
                        logger.info('Issue Found', 'issueController: findIssue()', 10)
                        console.log(issueDetails)
                        resolve(issueDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, 'issueId parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let fetchUsers = async (issueDetails) => {
        return await new Promise(async (resolve, reject) => {
            let allUsers = [];
            for (let i =req.query.skip ; i<parseInt(req.query.skip)+10 && i < issueDetails.watchers.length; i++) {
                userModel.find({ userId: issueDetails.watchers[i]}).exec((err, res) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else {
                        allUsers.push(res[0]);
                    }
                }
                )
            }
            setTimeout(function () {
                console.log(allUsers)
                resolve(allUsers)
            }, 2000)
        })
    }
    findIssue(req, res)
        .then(fetchUsers)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'All Watchers Of Issue Found', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}
let getUser=(req,res)=>{
        userModel.findOne({userId:req.params.userId}).exec((err,result)=>{
            if(err){
                console.log("Error");
            }else{
                let apiResponse = response.generate(true, 'Find User Details', 200,result)
                    res.send(apiResponse)
            }
        })
}

let getSearchedIssue=(req,res)=>{
    if (check.isEmpty(req.query.searchString)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'Search string is missing', 403, null)
        res.send(apiResponse)
    } else {
        issueModel.find({ 'title':{$regex:req.query.searchString}})
        .limit(10).
        skip(0 || parseInt(req.query.skip))
            .exec((err, issueDetails) => {  if (err) {
                console.log(err)
                logger.error('Failed To Retrieve Search Data', 'issueController: getSearchedIssue()', 10)
                //generate the error message and the api response message here 
                let apiResponse = response.generate(true, 'Failed To Find Searched Data', 500, null)
                res.send(apiResponse)
                // if Company Details is not found 
            } else if (check.isEmpty(issueDetails)) {
                // generate the response and the console error message here 
                logger.error('No Issue Found', 'issueController: getSearchedIssue()', 7)
                let apiResponse = response.generate(true, 'Searched Issue Details Not Found', 404, null)
                res.send(apiResponse)
            } else {
                // prepare the message and the api response here 
                logger.info('Issue Found', 'issueController: getSearchedIssue()', 10)
                let apiResponse = response.generate(true, 'Searched Issue Details Found',200,issueDetails)
                res.send(apiResponse)
            }})
    }
}

let getMyIssues=(req,res)=>{
    if (check.isEmpty(req.params.userId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'User id is missing', 403, null)
        res.send(apiResponse)
    } else {
        issueModel.find({'reporterId':req.params.userId})
        .limit(10).
        skip(0 || parseInt(req.query.skip))
            .exec((err, issueDetails) => {  if (err) {
                console.log(err)
                logger.error('Failed To Retrieve Search Data', 'issueController: getSearchedIssue()', 10)
                //generate the error message and the api response message here 
                let apiResponse = response.generate(true, 'Database error', 500, null)
                res.send(apiResponse)
                // if Company Details is not found 
            } else if (check.isEmpty(issueDetails)) {
                // generate the response and the console error message here 
                logger.error('No Issue Found', 'issueController: getSearchedIssue()', 7)
                let apiResponse = response.generate(true, ' Issue Details Not Found', 404, null)
                res.send(apiResponse)
            } else {
                // prepare the message and the api response here 
                logger.info('Issue Found', 'issueController: getSearchedIssue()', 10)
                let apiResponse = response.generate(true, 'My Issue Details Found',200,issueDetails)
                res.send(apiResponse)
            }})
    }
}
module.exports = {
    getAllIssuesFunction: getAllIssues,
    getSingleIssueFunction: getSingleIssue,
    getSerachedIssueFunction:getSearchedIssue,
    createIssueFunction: createIssue,
    assignIssueFunction: assignIssue,
    editIssueFunction: editIssue,
    completeIssueFunction: completeIssue,
    addWatcherFunction:addWatcher,
    getWatcherFunction:getWatcher,
    getuser:getUser,
    getMyIssuesFunction:getMyIssues
}