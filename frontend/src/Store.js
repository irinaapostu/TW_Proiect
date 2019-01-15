import axios from 'axios'

const API = 'https://proiect-tw-faza2-mihnea1501.c9users.io:8080'

class Store{
  constructor(ee){
    this.content = []
    this.ee = ee
  }
  
  getExternal(){
    axios.get('http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=romania&api_key=e82c2be741afa036d4b22ea8c271ee76&format=json')
    .then( response =>{
      this.content = response.data.tracks.track
      this.ee.emit('LASTFM_LOAD')
    })
  }
  
  getAll(){
    axios(API+'/songs')
      .then((response) => {
        this.content = response.data
        this.ee.emit('LOAD_ALL')
      })
  }
  createOne(song){
    axios.post(API + '/songs', song)
      .then(() => this.getAll())
  }

  deleteOne(id){
    axios.delete(API + '/songs/'+ id)
     .then(() => this.getAll())
  }
  updateOne(id, song){
    axios.put(API + '/songs/'  + id, song)
     .then(() => this.getAll())
  }
}

export default Store