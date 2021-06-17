import React from 'react';
import axios from 'axios'; // intall first npm i axios
import Image from 'react-bootstrap/Image'
import Wether from './wether'
import Movies from './movies'
const mapKey = process.env.MAPKEY
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityData: '', // this dynamicaaly from the data comes from Locational Q / UPON MY REQUEDT NOT STATIC
      // TO ASSING IT TO CITYdata عشانها لوكالي مش جلوبال
      errorInputmsg: '', // empty to fill it locallay in location function
      displayErrorMsg: false, // to start with false so it wont apper at first until the condition is fulfilled
      mapDisplay: false, // to not  render the map when the user still didint write anything
      wether: [],
      // msgApi: '',
      // displayMSGapi:false,
      latitude: '',
      lontitude: '',
      cityName: '',
      query: '',
      wetherDisplay: false,
      movies :[],
      movieDisplay : false,
      movieERR:'',
      displaymovieERR: false,



    }

  }
  // whether = async(event) =>{
  //   event.preventDefault();
  //   let apiURl = 'http://localhost:3001/wether'
  //   try{
  //   let whetherCast = await axios.get(apiURl)
  //   this.setState({
  //     wether:whetherCast.data
  //   })
  // }
  // catch{
  //   this.setState({
  //     errorInputmsg:'505'
  //   })
  // }
  // }
  userInput = (event) => { //عشان ناخد اسم المدرينة اللي بدخلها الشخص 
    this.setState({
      query: event.target.value
      
    })

  }
  location = async (event) => { // async : to make the java load each code line in sequense / AXIOS  IS ASYNC
    event.preventDefault();
    let server = process.env.REACT_APP_SERVER
    // to not load the page everytime you click on explore
    // let userInput = event.target.userinput.value // for taking the user input value

    // use backtic here
    try {  // try to send a request from the server and do these stuff
      console.log(this.state.query)
      let URL = `https://us1.locationiq.com/v1/search.php?key=pk.c9b497756c0bbbd5d4765f054c2abd94&q=${this.state.query}&format=json`

      let LocationQdata = await axios.get(URL) // THE LINE I WANT THE WEBSITE TO LOAD IN SEQUENCE
      console.log(LocationQdata)
      this.setState({
        cityData: LocationQdata.data[0], // for only the first object because they may be more than one city with the same nmae 
        mapDisplay: true,// we put it here cuz we need to render it when the api is working
        cityName: LocationQdata.data[0].display_name,
        lontitude: LocationQdata.data[0].lon,
        latitude: LocationQdata.data[0].lat,
      })
      // this.wetherForcast (LocationQdata.data[0].lat,LocationQdata.data[0].lon)
    }
    catch { // if you cant recive from the server and the link is brocken do these stuff
      this.setState({
        errorInputmsg: 'weather 404 error',
        displayErrorMsg: true,
      })


    }
    // wetherForcast = async(lat,lon) =>{
    // let server = process.env.REACT_APP_SERVER
    let apiURl = `${server}/wether?city=${this.state.query}`
    // { parameters :{lat :latitude , lontitude :lon, query: query}}// sending request for api 
    try {
      let whetherCast = await axios.get(apiURl)
      this.setState({
        wether: whetherCast.data,
        wetherDisplay: true
      })
    }
    catch {
      this.setState({
        msgApi: '505 server error ',
        displayMSGapi: true,
      })
    }  

    let moviesAPI =`${server}/movies?query=${this.state.query}`
    try{
let movieDeat = await axios.get(moviesAPI)
this.setState({
  movies : movieDeat.data,
  movieDisplay :true



})

    }
    catch{
      this.setState({
        movieERR :"error movies 404",
        displaymovieERR: true

      })
    }



  }


  render() {
    return (
      //to display 
      <div>
        <h1> city explorer </h1>
        <form onSubmit={this.location} >
          <input type='text' name="userinput" onChange={this.userInput} />
          <input type='submit' value="explore" />
        </form>
        {/* <h1>{this.state.wether.city_name}</h1>
      <h1>{this.state.wether.date}</h1>
      <h1>{this.state.wether.lat}</h1> */}






        <h3> {this.state.cityData.display_name}</h3>
      <h3> {this.state.cityData.lat}</h3>
      <h3> {this.state.cityData.lon}</h3>
        <h3> {this.state.displayErrorMsg && this.state.errorInputmsg}</h3>
        <h3>{this.state.displayMSGapi && this.state.msgApi}</h3>
        {this.state.mapDisplay && <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.c9b497756c0bbbd5d4765f054c2abd94&size=300x300&center=${this.state.cityData.lat},${this.state.cityData.lon}`} roundedCircle />}
        <Image src="" fluid />



        <Wether wetherInfo={this.state.wether} ></Wether>
        <Movies movieInfo ={this.state.movies}></Movies>


      </div>
    )
  }
}

// state.displayErrorMsg&&this.state.errorInputmsg == is for if both conditions 
export default App