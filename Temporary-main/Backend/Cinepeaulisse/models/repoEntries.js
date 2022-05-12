const repo = require('./repository')

module.exports = {

    getAll() {
        let sql = 'SELECT entriesId, dateDay, entriesNumber, movieId FROM entries'
        return repo.getAll(sql)
    },


    add(entrie) {
        return repo.execute('INSERT INTO entries (dateDay,entriesNumber,movieId) VALUES (?,?,?)', [entrie.dateDay, entrie.entriesNumber, entrie.movieId])
    },

    getOneByDateAndFilm(date, movieId) {
        return repo.getOne('SELECT entriesId, dateDay, entriesNumber, movieId FROM entries WHERE dateDay=? AND movieId=? ', [date, movieId])
    }

}