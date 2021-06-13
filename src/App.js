import React from 'react';
import axios from 'axios'; // intall first npm i axios

class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state ={
      cityData : '', // this dynamicaaly from the data comes from Locational Q / UPON MY REQUEDT NOT STATIC
      // TO ASSING IT TO CITYdata عشانها لوكالي مش جلوبال
  }

  }
  
  location = async(event) =>{ // async : to make the java load each code line in sequense / AXIOS  IS ASYNC
event.preventDefault(); // to not load the page everytime you click on explore
let URL = 'https://us1.locationiq.com/v1/search.php?key=pk.c9b497756c0bbbd5d4765f054c2abd94&q=amman&format=json'
let LocationQdata = await axios.get(URL) // THE LINE I WANT THE WEBSITE TO LOAD IN SEQUENCE
this.setState({
  cityData : LocationQdata.data[0] // for only the first object because they may be more than one city with the same nmae 
})

  }
  
  https://us1.locationiq.com/v1/search.php?key=pk.c9b497756c0bbbd5d4765f054c2abd94&q=amman&format=json
  
  render(){
    return(
      <div>
        <h1> city explorer </h1>
        <form onSubmit={this.location}>
          <input type ='text' />
          <input type ='submit' value="explore"/>
        </form>
        <h3> {this.state.cityData.display_name}</h3>
      </div>
    )
  }
}
 

export default App