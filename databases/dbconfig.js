const sqlConfig = {
    user: process.env.Db_User,
    password: process.env.Db_Pw,
    database: process.env.Db_Name,
    server: process.env.Db_Server,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

  module.exports= sqlConfig;