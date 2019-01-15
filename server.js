const express = require('express')
const app = express()
const path = require("path")

const Sequelize = require('sequelize')

const sequelize = new Sequelize('musicdatabase', 'root', '', {
    dialect: "mysql",
    host: "localhost"
})

// sequelize.authenticate().then(() => {
//     console.log("Connected to database")
// }).catch(() => {
//     console.log("Unable to connect to database")
// })
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});
app.use(express.static(path.resolve(__dirname, './frontend', 'build')));


const Songs = sequelize.define('songs', {
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    genre: Sequelize.STRING,
    album: Sequelize.STRING
})
app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

const Playlist = sequelize.define('playlists', {
    title: Sequelize.STRING,
    type: Sequelize.STRING
})
app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.use(express.json())

//definire endpoint POST /messages
app.post('/playlists', (request, response) => {
    console.log(request.body.title)
    console.log(request.body.type)
    Playlist.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.post('/songs', (request, response) => {
   
    Songs.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/songs', (request, response) => {
    Songs.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/songs/:id', (request, response) => {
    Songs.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.get('/playlists', (request, response) => {
    Playlist.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/playlists/:id', (request, response) => {
    Playlist.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
app.put('/songs/:id', (request, response) => {
    Songs.findById(request.params.id).then((songs) => {
        if(songs) {
            songs.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/playlists/:id', (request, response) => {
    Playlist.findById(request.params.id).then((playlists) => {
        if(playlists) {
           playlists.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/songs/:id', (request, response) => {
    Songs.findById(request.params.id).then((songs) => {
        if(songs) {
            songs.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/playlists/:id', (request, response) => {
    Playlist.findById(request.params.id).then((playlists) => {
        if(playlists) {
           playlists.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.listen(8080,()=>{
    console.log("Server started")
})