let appConfig={
    apiVersion:"/api/v1",
    port : 3000,
    allowedCorsOrigin : "*",
    env : "dev",
    db : {
    uri: 'mongodb://127.0.0.1:27017/issueTrackerDB2'
  }

}

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion
};