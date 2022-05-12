const repo = require('./repository')


module.exports = {

    getAll() {
        let sql = 'SELECT movieId, title, duration FROM movie'
        
        return repo.getAll(sql)
    },

    getOne(id) {
        return repo.getOne('SELECT movieId, title, duration FROM movie WHERE movieId=?', [id])
    }

}