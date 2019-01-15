import React, { Component } from 'react'
import Store from './Store'
import {EventEmitter} from 'fbemitter'
import Song from './Song'
import SongsForm from './SongsForm'

let ee = new EventEmitter()
let store = new Store(ee)

function adauga(song){
  console.log(song)
  store.createOne(song)
}

function sterge(id,song){
  store.deleteOne(id,song)
}

function update(id,song){
  store.updateOne(id,song)
}

class Songs extends Component {
  constructor(props){
    super(props)
    this.state = {
      songsArray : [],
      lastfmArray:[]
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('LOAD_ALL', () => {
      console.log(store.content)
      this.setState({
        songsArray : store.content
      })
      
      
    })
    store.getExternal()
     ee.addListener('LASTFM_LOAD', () => {
      console.log(store.content)
      this.setState({
        lastfmArray : store.content
      })
     })
  }
  render() {
    return (
      <div>
              <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Artist</th>
    </tr>
  </thead>
  <tbody>
        {this.state.lastfmArray.slice(0,10).map(item =>(<tr>
      <th scope="row">{item.name}</th>
      <td>{item.artist.name}</td>
    
    </tr>
        ))}
  </tbody>
</table>
        
              <SongsForm onAdd={adauga}/>
              
               { this.state.songsArray.map((item) => <Song song={item} onDelete={sterge} key={item.id} onUpdate={update} key={item.id} /> ) }

      </div>
    )
  }
}

export default Songs
