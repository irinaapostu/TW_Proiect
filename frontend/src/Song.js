import React, { Component } from 'react'

class Song extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit : false,
      song : this.props.song,
      title : this.props.song.title,
      artist : this.props.song.artist,
      genre: this.props.song.genre,
      album:this.props.song.album
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
   componentWillReceiveProps(nextProps){
    this.setState({
      song : nextProps,
      title : this.props.song.title,
      artist : this.props.song.artist,
      genre : this.props.song.genre,
      album : this.props.song.album,
      edit : false
    })
  }
  
  
  render() {
 if(this.state.edit){
      return (<div>
         Title : <input type="text" onChange={this.handleChangeTitle}/>  
          Artist : <input type="text" onChange={this.handleChangeArtist}/> 
          Genre : <input type="text"  onChange={this.handleChangeGenre}/> 
          Album : <input type="text" onChange={this.handleChangeAlbum}/> 
          
       <input type="button" class="btn btn-primary" value="update" onClick={() => this.props.onUpdate(this.props.song.id,{
         title:this.state.title,
         artist:this.state.artist,
         genre:this.state.genre,
         album:this.state.album
       })}/>
        <input type="button" class="btn btn-primary" value="cancel" onClick={() => this.setState({edit : false})} />
      </div>)            
    }
    else{
      return (
      
      
      <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{this.state.title} - {this.state.artist}</h5>
    <p class="card-text">Genre: {this.state.genre}</p>
        <p class="card-text">Album: {this.state.album}</p>

   <input type="button" value="Edit" class="btn btn-primary" onClick={() => this.setState({edit : true})} />
    <input type="button" value="Delete" class="btn btn-primary" onClick={() => this.props.onDelete(this.state.song.id)} />
  </div>
</div>)
    }
  }
}

export default Song
