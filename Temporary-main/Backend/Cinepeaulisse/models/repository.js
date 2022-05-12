const db = require('./index')

module.exports = {
    getAll(sql,params = []) {
        return new Promise((resolve,reject) => {
            db.all(sql,params, (err,rows) => {
                if(err) {
                    console.error('Erreur SQL : ' + err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    },

    getOne(sql, params ) {
        return new Promise((resolve, reject) => {
            db.get(sql,params, (err, rows) => {
                if(err) {
                    console.error('Erreur SQL : ' + err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    },

    execute(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if(err) {
                    console.error('Erreur SQL : ' + err)
                    reject(false)
                } else {
                    resolve(true)
                }
            })
        })
    }
}