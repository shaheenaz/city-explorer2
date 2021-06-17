
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
class Movies extends React.Component{
    constructor(props){
super(props)
this.state ={
    renderMovies : this.props.movieInfo
}
    }

    render(){
        return(
            
                <div>
                    {this.props.movieInfo.map((item, index) =>{
                        return(
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={this.props.movieInfo[index].image_url} />
  <Card.Body>
    <Card.Title>{this.props.movieInfo[index].title}</Card.Title>
    <Card.Text>
   
                            <div>
                        {/* <img src={this.props.movieInfo[index].image_url}/> */}
                        {this.props.movieInfo[index].overview}
                        {/* <h4>desciption : {this.props.wetherInfo[index].description} </h4> */}
                        </div>
                        


                  
    </Card.Text>
  </Card.Body>
</Card>
                    
                          )})}







               




                    

{/* <h1>date :{this.props.wetherInfo[]} </h1>
<h2> decriptoin</h2> */}

                   
</div>
    )
    }}

export default Movies;