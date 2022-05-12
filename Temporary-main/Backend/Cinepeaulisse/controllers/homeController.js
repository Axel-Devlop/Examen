const repoMovies = require('../models/repoMovies')
const repoEntries = require('../models/repoEntries')
const { validationResult } = require("express-validator");


module.exports = {

    async getAllEntries(req, res) {
        try {
            let entries = await repoEntries.getAll()
            let movies = await repoMovies.getAll()
            
            entries.forEach(entrie => {
                movies.forEach(movie => {
                    if(movie.movieId == entrie.movieId) {
                        entrie.movieTitle = movie.title
                    }
                })
            })

            let orderedArray = []
            entries.forEach(entrie => {
                orderedArray.push(entrie)
            })
            
            let key = "dateDay"
            orderedArray.sort((function(a, b){
                if(a[key] < b[key]){
                    return -1;
                }else if(a[key] > b[key]){
                    return 1;
                }
                return 0;
            })
            )

            res.send(orderedArray)


        } catch (error) {
            res.status(500).end()
        }
    },

    async addEntrie(req, res) {
        try {

            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                res.status(400).end();
            } else 
            {
                let entrie = req.body;
                let checkmovieId = await repoMovies.getOne(entrie.movieId)
                //CHECK SI L'ID DU FILM EXISTE
                if(checkmovieId != undefined) {
                    //IL EXISTE
                    let dateActuelle = new Date
                    console.log(new Intl.DateTimeFormat('fr-FR', { month: 'long'}).format(dateActuelle))
                    let dateArray = entrie.dateDay.split(' ')
                    let dateError = ""
                    console.log(parseInt(dateArray[2]))
                    console.log(dateActuelle.getFullYear())
                    if(parseInt(dateArray[2])>dateActuelle.getFullYear()) {
                        dateError = "L'année est dans le futur !"
                        console.log("L'année est dans le futur !")
                    } else if(parseInt(dateArray[2]) < dateActuelle.getFullYear()) {

                        let checkIfDateAlreadyExist = await repoEntries.getOneByDateAndFilm(entrie.dateDay, entrie.movieId)
                        console.log(checkIfDateAlreadyExist)
                                if(checkIfDateAlreadyExist != undefined) {
                                    dateError = "Une entrée existe déja pour ce film à cette date là "
                                } else {
                                    console.log("AJOUT DE ENTRIE")
                                    let result = await repoEntries.add(entrie)
                                    // res.redirect("/films")

                                }
                                
                            } else if(parseInt(dateArray[2]) == dateActuelle.getFullYear()) {
                        console.log("L'année est dans le passée ou le présent !")
                        let tmpMonth = null
                        switch (dateArray[1]) {
                            case "janvier":
                                tmpMonth = 0
                                break;
                            case "fevrier":
                                tmpMonth = 1
                                break;
                            case "mars":
                                tmpMonth = 2
                                break;
                            case "avril":
                                tmpMonth = 3
                                break;
                            case "mai":
                                tmpMonth = 4
                                break;
                            case "juin":
                                tmpMonth = 5
                                break;
                            case "juillet":
                                tmpMonth = 6
                                break;
                            case "aout":
                                tmpMonth = 7
                                break;
                            case "septembre":
                                tmpMonth = 8
                                break;
                            case "octobre":
                                tmpMonth = 9
                                break;
                            case "novembre":
                                tmpMonth = 10
                                break;
                            case "decembre":
                                tmpMonth = 11
                                break;
                            default:
                                tmpMonth = -1
                                
                                break;
                        }
                        console.log(tmpMonth)
                        console.log(dateActuelle.getMonth())
                        //COMPARAISON DES MOIS
                        if(tmpMonth == -1) {
                            dateError = "Le mois de la date entrée est incorrecte"
                        } else if(tmpMonth>dateActuelle.getMonth()){
                            dateError = "La date entrée est dans le futur"

                        } else if(tmpMonth == dateActuelle.getMonth()) {
                            console.log("LA DATE EST BIEN PASSEE")

                            if(parseInt(dateArray[0])>dateActuelle.getDate()) {
                                dateError = "La date entrée est dans le futur"
                            }
                        }  else {
                                console.log("CA VA")
                                //ICI LA DATE EST ANTERIEUR A AUJOURD'HUI--------------------------------

                                let checkIfDateAlreadyExist = await repoEntries.getOneByDateAndFilm(entrie.dateDay, entrie.movieId)
                                if(checkIfDateAlreadyExist != undefined) {
                                    dateError = "Une entrée existe déja pour ce film à cette date là "
                                } else {
                                    console.log("AJOUT DE ENTRIE")
                                    let result = await repoEntries.add(entrie)
                                    // res.redirect("/films")

                                }
                            }

                        }


                    

                    if(dateError != "") {
                        console.error("Erreur d'entrée : " + dateError)
                    } else {
                        let checkIfDateAlreadyExist = await repoEntries.getOneByDateAndFilm(entrie.dateDay, entrie.movieId)
                                if(checkIfDateAlreadyExist != undefined) {
                                    dateError = "Une entrée existe déja pour ce film à cette date là "
                                } else {
                                    console.log("AJOUT DE ENTRIE")
                                    let result = await repoEntries.add(entrie)
                        console.log("ICICICI")
                                }
                    }

                    res.redirect("/films")
                    
                    
                } else {
                    console.log("L'id du film n'existe PAS")
                    res.status(400).end()
                }


                
                // console.log(entrie);
                res.redirect("/films");
            }



        } catch (error) {
            res.status(500).end()
        }
        
    }


}