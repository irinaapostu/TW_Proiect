import React, { Component } from 'react'

class SongsForm extends Component {
  constructor(props){
    super(props)
    this.state = {
    
        title: '',
    artist: '',
    genre: '',
    album: ''
    
    }
    this.handleChangeTitle = (event) => {
         this.setState({
          title:event.target.value
      })
     
      console.log("title changed"+ event.target.value)
    }
     this.handleChangeArtist = (event) => {
     this.setState({
          artist:event.target.value
      })
      
      console.log("artist changed"+ event.target.value)
    }
     this.handleChangeGenre = (event) => {
      this.setState({
          genre:event.target.value
      })
      
      console.log("genre changed"+ event.target.value)
    }
     this.handleChangeAlbum = (event) => {
      this.setState({
          album:event.target.value
      })
      
      console.log("album changed" + event.target.value)
    }
  }
  render() {
    return (
      <form>
 <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" onChange={this.handleChangeTitle}/>
    </div>
     <div class="form-group">
    <label for="artist">Artist</label>
    <input type="text" class="form-control" id="artist" onChange={this.handleChangeArtist}/>
    </div>
     <div class="form-group">
    <label for="genre">Genre</label>
    <input type="text" class="form-control" id="genre" onChange={this.handleChangeGenre}/>
    </div>
     <div class="form-group">
    <label for="album">Album</label>
    <input type="text" class="form-control" id="album"  onChange={this.handleChangeAlbum}/>
    </div>

  <input value="Submit" type="button" class="btn btn-primary"  onClick={() => this.props.onAdd({
             title:this.state.title,
         artist:this.state.artist,
         genre:this.state.genre,
         album:this.state.album
          })}/>

      </form>
    )
  }
}

export default SongsForm
