const express = require('express');
const router = express.Router();
const issueController = require('./../controllers/issueController');
const appConfig = require('./../../config/appConfig');
const auth=require('./../middlewares/auth')
const multer=require('multer')
const upload=multer({dest:'uploads/'})


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/issues`;
     
    app.get(baseUrl + '/all/:userId',auth.isAuthorized,issueController.getAllIssuesFunction);
   /**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/all/:userId api to get all issues of a user.
    
    * @apiParam {string} userId userId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response: {
        "error": false,
        "message": "All Issues Of User Found",
        "status": 200,
        "data": [
            {
                "issueId": "vrZnwAV-U",
                "status": "",
                "reporterId": "6-V5XII_T",
                "reporterName": "Sachin M Y",
                "description": "issue escription",
                "title": "issue1",
                "watchers": [],
                "_id": "5e89ce43e4fd532218d62074",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:25:39.459Z",
                "__v": 0
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
            },
            {
                "issueId": "xu-U4ZZCs",
                "status": "",
                "reporterId": "kjshv",
                "reporterName": "Sachin M Y",
                "description": "issue escription3",
                "title": "issue3",
                "watchers": [],
                "_id": "5e89cf38e4fd532218d62076",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:29:44.000Z",
                "__v": 0
            }
        ]
    }*/

    app.get(baseUrl + '/single/:issueId',auth.isAuthorized,issueController.getSingleIssueFunction);
/*
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/single/:issueId api to get a single issue.
    
    * @apiParam {string} issueId issueId of the issue. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": true,
    "message": "Issue Datails Found Successfully",
    "status": 404,
    "data": [
        {
            "issueId": "xu-U4ZZCs",
            "status": "",
            "reporterId": "kjshv",
            "reporterName": "Sachin M Y",
            "description": "issue escription3",
            "title": "issue3",
            "watchers": [],
            "_id": "5e89cf38e4fd532218d62076",
            "assigneeId": [
                "6-V5XII_T"
            ],
            "createdOn": "2020-04-05T12:29:44.000Z",
            "__v": 0
        }
    ]
}*/


    app.post(baseUrl + '/create/:userId',auth.isAuthorized,issueController.createIssueFunction);
/*
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {post} /api/v1/issues/create/:userId api to create a issue.
    
    * @apiParam {string} userId userId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * @apiParam {string} title authToken of the user. (body params) (required)
    * @apiParam {string} description authToken of the user. (body params) (required)
    * @apiParam {string} attachments authToken of the user. (body params) (optional)
    * @apiParam {string} assigneeId of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": true,
    "message": "Issue created successfully",
    "status": 200,
    "data": {
        "issueId": "otsdaDoaq",
        "status": "progress",
        "reporterId": "6-V5XII_T",
        "reporterName": "",
        "description": "description 7",
        "title": "edit 7",
        "watchers": [],
        "_id": "5e8b43e9eb826f1d8017efb9",
        "createdOn": "2020-04-06T14:59:53.589Z",
        "__v": 0
    }
}*/
    
    app.post(baseUrl + '/edit/:issueId',auth.isAuthorized,issueController.editIssueFunction);
 /**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {post} /api/v1/issues/edit/:issueId api to edit a issue.
    
    * @apiParam {string} issueId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * @apiParam {string} title authToken of the user. (body params) (optional)
    * @apiParam {string} description authToken of the user. (body params) (optional )
    * @apiParam {array} attachments authToken of the user. (body params) (optional)
    * @apiParam {array} assigneeId of the user. (body params) (optional)
    * 
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": true,
    "message": "Issue edited successfully",
    "status": 404,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}*/
    app.post(`${baseUrl}/assign/:userId`,auth.isAuthorized,issueController.assignIssueFunction);
    /**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {post} /api/v1/issues/assign/:issueId api to assign a issue.
    
    * @apiParam {string} issueId issueId of the user. (body params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * @apiParam {string} userId user id of the assignee. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    * {
    "error": false,
    "message": "Issue Assigned Successfully",
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
                "xu-U4ZZCs"
            ],
            "_id": "5e89b203c541190838bce7dd",
            "isAdmin": false,
            "createdOn": "2020-04-05T10:25:07.000Z",
            "__v": 7,
            "watcher": []
        }
    ]
}*/
    app.post(`${baseUrl}/complete/:issueId`,auth.isAuthorized, issueController.completeIssueFunction);
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {post} /api/v1/issues/all/:issueId api to mark a issue as completed.
    
    * @apiParam {string} issueId issueId of the user. (body params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * @apiParam {string} name authToken of the user. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": false,
    "message": "Issue marked as completed",
    "status": 200,
    "data": {
        "issueId": "xu-U4ZZCs",
        "status": "done",
        "reporterId": "kjshv",
        "reporterName": "Sachin M Y",
        "description": "issue escription3",
        "title": "edit 1 ",
        "watchers": [],
        "_id": "5e89cf38e4fd532218d62076",
        "assigneeId": [
            "6-V5XII_T"
        ],
        "createdOn": "2020-04-05T12:29:44.000Z",
        "__v": 0
    }
}*/

app.post(baseUrl + '/addwatchers/:issueId',auth.isAuthorized,issueController.addWatcherFunction);
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {post} /api/v1/issues/all/:issueId api to add a user as watcher of an issue.
    
    * @apiParam {string} issueId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * @apiParam {string} userId user id of the user. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    * "error": false,
    "message": "User added as watcher successfully",
    "status": 200,
    "data": {
        "issueId": "xu-U4ZZCs",
        "status": "done",
        "reporterId": "kjshv",
        "reporterName": "Sachin M Y",
        "description": "issue escription3",
        "title": "edit 1 ",
        "watchers": ['gsagac7s7'],
        "_id": "5e89cf38e4fd532218d62076",
        "assigneeId": [
            "6-V5XII_T"
        ],
        "createdOn": "2020-04-05T12:29:44.000Z",
        "__v": 0
    }*/
app.get(baseUrl + '/allwatchers/:issueId',auth.isAuthorized,issueController.getWatcherFunction);
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/allwatchers/:issueId api to get all watchers of a issue.
    
    * @apiParam {string} issueId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": false,
    "message": "All Watchers Of Issue Found",
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
        }
    ]
}
*/
app.get(baseUrl + '/issues/user/:userId',auth.isAuthorized,issueController.getuser);
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/user/:userId api to get a single user.
    
    * @apiParam {string} userId issueId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:{
    "error": false,
    "message": "User details found successfully.",
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
        }
    ]
}
*/
app.get(baseUrl + '/searched',auth.isAuthorized,issueController.getSerachedIssueFunction);
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/searched api to get all issues that matches the serach string.
    
    * @apiParam {string} searchString string to search. (query params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response: {
        "error": false,
        "message": "Search results found successfully",
        "status": 200,
        "data": [
            {
                "issueId": "vrZnwAV-U",
                "status": "",
                "reporterId": "6-V5XII_T",
                "reporterName": "Sachin M Y",
                "description": "issue escription",
                "title": "issue1",
                "watchers": [],
                "_id": "5e89ce43e4fd532218d62074",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:25:39.459Z",
                "__v": 0
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
            },
            {
                "issueId": "xu-U4ZZCs",
                "status": "",
                "reporterId": "kjshv",
                "reporterName": "Sachin M Y",
                "description": "issue escription3",
                "title": "issue3",
                "watchers": [],
                "_id": "5e89cf38e4fd532218d62076",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:29:44.000Z",
                "__v": 0
            }
        ]
    }*/
app.get(baseUrl+'/my/:userId',auth.isAuthorized,issueController.getMyIssuesFunction);
/**
    * @apiGroup issues
    * @apiVersion  1.0.0
    * @api {get} /api/v1/issues/all/:userId api to get all issues of a user.
    
    * @apiParam {string} userId userId of the user. (uri params) (required)
    * @apiParam {string} authToken authToken of the user. (body params) (required)

    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response: {
        "error": false,
        "message": "All Issues Of User Found",
        "status": 200,
        "data": [
            {
                "issueId": "vrZnwAV-U",
                "status": "",
                "reporterId": "6-V5XII_T",
                "reporterName": "Sachin M Y",
                "description": "issue escription",
                "title": "issue1",
                "watchers": [],
                "_id": "5e89ce43e4fd532218d62074",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:25:39.459Z",
                "__v": 0
            },
            {
                "issueId": "df0m9pPOC",
                "status": "",
                "reporterId": "6-V5XII_T",
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
            },
            {
                "issueId": "xu-U4ZZCs",
                "status": "",
                "reporterId": "6-V5XII_T",
                "reporterName": "Sachin M Y",
                "description": "issue escription3",
                "title": "issue3",
                "watchers": [],
                "_id": "5e89cf38e4fd532218d62076",
                "assigneeId": [
                    "6-V5XII_T"
                ],
                "createdOn": "2020-04-05T12:29:44.000Z",
                "__v": 0
            }
        ]
    }*/

}
