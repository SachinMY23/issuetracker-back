const express = require('express');
const router = express.Router();
const appConfig = require('./../../config/appConfig');
const auth=require('./../middlewares/auth')
const commentController=require('./../controllers/commentController');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/comments`;

    app.get(baseUrl + '/all/:issueId',commentController.getcommentsFunction);

    /**
    * @apiGroup comments
    * @apiVersion  1.0.0
    * @api {get} /api/v1/comments/all/:issueId api to get all comments of a issue.
    
    * @apiParam {string} issueId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
      {
    "error": true,
    "message": "All comments found",
    "status": 200,
    "data": [
        {
            "commentId": "sHU9Nq88d",
            "issueId": "otsdaDoaq",
            "name": "Sachin",
            "comment": "This is comment",
            "_id": "5e8b4aa61fcab51f7007b2a6",
            "createdOn": "2020-04-06T15:28:38.463Z",
            "__v": 0
        },
        {
            "commentId": "u8R56olwA",
            "issueId": "otsdaDoaq",
            "name": "Sachin",
            "comment": "This is comment 2",
            "_id": "5e8b4af7b589b60568100f58",
            "createdOn": "2020-04-06T15:29:59.605Z",
            "__v": 0
        },
        {
            "commentId": "RyIe1p1Ih",
            "issueId": "otsdaDoaq",
            "name": "Sachin",
            "comment": "This is comment 3",
            "_id": "5e8b4afeb589b60568100f59",
            "createdOn": "2020-04-06T15:30:06.789Z",
            "__v": 0
        }
    ]
}
   */

    app.post(baseUrl + '/add/:issueId',commentController.addCommentsFunction);
   
     /**
    * @apiGroup comments
    * @apiVersion  1.0.0
    * @api {post} /api/v1/comments/add/:issueId api to add comments to a issue.
    
    * @apiParam {string} issueId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * @apiParam {string} name name of the user who made comment. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
      {
    "error": false,
    "message": "Comment created successfully",
    "status": 200,
    "data": {
        "commentId": "RyIe1p1Ih",
        "issueId": "otsdaDoaq",
        "name": "Sachin",
        "comment": "This is comment 3",
        "_id": "5e8b4afeb589b60568100f59",
        "createdOn": "2020-04-06T15:30:06.789Z",
        "__v": 0
    }
}
   */

}










