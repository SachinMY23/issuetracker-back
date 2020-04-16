const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const passwordLib = require('../libs/passWordLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')


/* Models */
const issueModel = mongoose.model('Issue');
const userModel = mongoose.model('User');
const commentModel = mongoose.model('Comment')


let getComments = (req, res) => {
    if (check.isEmpty(req.params.issueId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'issueId parameter missing', 403, null)
        res.send(apiResponse)
    } else {
        commentModel.find({ 'issueId': req.params.issueId })
        .limit(10)
        .sort({createdOn:-1})
        .skip(0 || parseInt(req.query.skip))
            .exec((err, result) => {
                if (err) {

                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {

                    console.log('Comments Not Found.')
                    let apiResponse = response.generate(true, 'Comments Not Found', 404, null)
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(false, 'All comments found', 200, result)
                    console.log(apiResponse)
                    res.send(apiResponse)
                }
            })
    }
}

let addComments = (req, res) => {
    if (check.isEmpty(req.params.issueId)) {

        console.log("403, forbidden request");
        let apiResponse = response.generate(true, 'issueId parameter missing', 403, null)
        res.send(apiResponse)
    } else {
        var today = Date.now()
        let commentId = shortid.generate()

        let newComment = new commentModel({

            issueId: req.params.issueId,
            commentId:commentId,
            name: req.body.name,
            comment:req.body.comment,
            createdOn:today
        })
        console.log(newComment)
        newComment.save((err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Comment creation failed.')
                let apiResponse = response.generate(true, 'Comment creation failed', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Comment created successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}
module.exports = {
    getcommentsFunction: getComments,
    addCommentsFunction:addComments

}