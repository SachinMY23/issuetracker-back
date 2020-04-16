const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const appConfig = require('./../../config/appConfig');
const auth=require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
     
    app.post(baseUrl + '/signup',userController.signUpFunction);
    /**
    * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/v1/users/signup api to signup a user
    *
    * @apiParam {string} firstName firstName of the user. (body params) (required)
    * @apiParam {string} lastName lastName of the user. (body params) (required)
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} mobileNumber mobile number of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    * @apiParam {string} countryCode countryCode of the user. (body params) (required)


    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
             "userId": "V4eTMj6o",
             "firstName": "Nirmala",
             "lastName": "Mallikarjun",
             "countryCode": 91,
             "mobileNumber": 9686464589,
             "email": "nmy@gmail.com",
             "createdOn": "2020-03-02T11:44:07.000Z"
             }
    }
   */

    app.post(baseUrl + '/login', userController.logInFunction);
    /**
    * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/v1//users/login api to login a user.
    *
    
    * @apiParam {string} email email of the user. (body params) (required)
    * @apiParam {string} password password of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
      {
       "error": false,
       "message": "Login Successful",
       "status": 200,
       "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjJzeTRfWVdvIiwiaWF0IjoxNTgzMTUwMjgyMjYxLCJleHAiOjE1ODMyMzY2ODIsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InRvRG9MaXN0IiwiZGF0YSI6eyJ1c2VySWQiOiJWNGVUTWo2byIsImZpcnN0TmFtZSI6Ik5pcm1hbGEiLCJsYXN0TmFtZSI6Ik1hbGxpa2FyanVuIiwiY291bnRyeUNvZGUiOjkxLCJtb2JpbGVOdW1iZXIiOjk2ODY0NjQ1ODksImVtYWlsIjoibm15QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9fQ.SpjDgpEfOe2hUlQzZ9WDVEhqubQpN8uIhADWWF_qlLQ",
                "userDetails": {
                "userId": "V4eTMj6o",
                "firstName": "Nirmala",
                "lastName": "Mallikarjun",
                "countryCode": 91,
                "mobileNumber": 9686464589,
                "email": "nmy@gmail.com",
                 }
                }
        }

   */

    app.post(baseUrl + '/logout',auth.isAuthorized, userController.logOutFunction);
    /**
    * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/v1/users/logout api to logout a user.
    
    * @apiParam {string} userId Id of the user. (body params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
          "error": false,
          "message": "Logged Out Successfully",
          "status": 200,
         "data": null
        }
   */

  app.get(baseUrl + '/all/users' ,userController.getAllusersFunction);
  /**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/all/users api to get all users of a issue.
    
    * @apiParam {string} issueId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": false,
    "message": "All users found successfully",
    "status": 200,
    "data": [
        {
            "userId": "6-V5XII_T",
            "firstName": "Nirmala",
            "lastName": "Mallikarjun",
            "countryCode": 91,
            "mobileNumber": 9686464589,
            "email": "nmy@gmail.com",
            "password": "$2a$10$tDIbrF4e7X.tD7hMjznmw.0x/8DgpFFE6rSnjDvDsZ.ArMFVghgqS",
            "issues": [
                "jjjhjjjh",
                "jjjhjjjhnmbjk",
                "jjjhjjjhnmbjkhhbm",
                "6-V5XII_T",
                "vrZnwAV-U",
                "df0m9pPOC",
                "xu-U4ZZCs",
                "xu-U4ZZCs",
                "oqXRGou2b"
            ],
            "_id": "5e89b203c541190838bce7dd",
            "isAdmin": false,
            "createdOn": "2020-04-05T10:25:07.000Z",
            "__v": 9,
            "watcher": []
        },
         {
                "issueId": "df0m9pPOC",
                "status": "",
                "reporterId": "kjshv",
                "reporterName": "Sachin M Y",
                "description": "issue escription2",
                "title": "issue2",
                "watchers": [],
                "_id": "5e89cf1de4fd532218d62075",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:29:17.986Z",
                "__v": 0
            }
    ]
}
*/
  app.post(baseUrl + '/social/login', userController.socialLoginFunction);
/**
    * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/v1//users/login api to login a user.
    *
    
    * @apiParam {string} email email of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
      {
       "error": false,
       "message": "Login Successful",
       "status": 200,
       "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjJzeTRfWVdvIiwiaWF0IjoxNTgzMTUwMjgyMjYxLCJleHAiOjE1ODMyMzY2ODIsInN1YiI6ImF1dGhUb2tlbiIsImlzcyI6InRvRG9MaXN0IiwiZGF0YSI6eyJ1c2VySWQiOiJWNGVUTWo2byIsImZpcnN0TmFtZSI6Ik5pcm1hbGEiLCJsYXN0TmFtZSI6Ik1hbGxpa2FyanVuIiwiY291bnRyeUNvZGUiOjkxLCJtb2JpbGVOdW1iZXIiOjk2ODY0NjQ1ODksImVtYWlsIjoibm15QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9fQ.SpjDgpEfOe2hUlQzZ9WDVEhqubQpN8uIhADWWF_qlLQ",
                "userDetails": {
                "userId": "V4eTMj6o",
                "firstName": "Nirmala",
                "lastName": "Mallikarjun",
                "countryCode": 91,
                "mobileNumber": 9686464589,
                "email": "nmy@gmail.com",
                 }
                }
        }

   */
  app.post(`${baseUrl}/recover/password`, userController.recoverPasswordFunction);
  /** 
   * @apiGroup users
    * @apiVersion  1.0.0
    * @api {post} /api/v1/users/recover/password api to recover password of a user.
    *
    * @apiParam {string} email email of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
          {
  "error": false,
  "message": "Password sent to mail successfully",
  "status": 200,
  "data": null
}
   */

  app.post(`${baseUrl}/change/password/:userId`,auth.isAuthorized, userController.changePasswordFunction);
  /**
  * @apiGroup users
  * @apiVersion  1.0.0
  * @api {post} /api/v1/users/signup api to signup a user
  *
  * @apiParam {string} oldPassword old password of the user. (body params) (required)
  * @apiParam {string} newPassword new password of the user. (body params) (required)
  * @apiParam {string} email email of the user. (body params) (required)
  
  
  * @apiSuccess {object} myResponse shows error status, message, http status code, result.
  * 
  * @apiSuccessExample {object} Success-Response:
     {
      "error": false,
      "message": "User password changed Successfully",
      "status": 200,
      "data": {
          "n": 1,
          "ok": 1,
          "deletedCount": 1
      }
  }
  */
}