import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import load from "./xhr.js"
let openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather"
let openWeatherKey = "39c69f3ef4fb87b25ac56fbeef4398ca"


function UnitSelector(props){
  return (
      <select onChange={props.onSelectChange} id="unitInput" >
        <option value="metric" >Metric </option>
        <option value="imperial" > Imperial </option>
      </select>
      )
}
function WeatherPage(props){

  if(props.weather){
    let temp;
    let wind_speed;
    if(props.unit == "metric"){
      temp = props.weather.main.temp + " °C"
      wind_speed = props.weather.wind.speed + " meter/sec";
    }
    else{
      temp = props.weather.main.temp + " °F"
       wind_speed = props.weather.wind.speed + " miles/hour";
    }

    return (
      <div id="weatherPage">
        <div> Current Temperature:  
        <span>{temp}</span></div>
        <div> Current Weather :
        <span>{props.weather.weather[0].description}</span>
        </div>
        <div> Current Wind Speed :
        <span>{wind_speed} </span>
        </div>
      </div>
          )
  }
  return <div> Loading</div>
}
function SunrisePage(props){

  if(props.weather){
    const sunrise = new Date(props.weather.sys.sunrise*1000).toLocaleTimeString()
    const sunset = new Date(props.weather.sys.sunset*1000).toLocaleTimeString()
    return (
      <div id="sunrisePage">
        <div> Sunrise at :  
        <span>{sunrise.toString()}</span></div>
        <div> Sunsets at :
        <span>{sunset.toString()}</span>
        </div>
      </div>
          )
  }
  return <div> Loading</div>
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {time: new Date(),
                  unit:"metric",
                  page:"weatherpage"};
  }
  render() {
    let component
    if(this.state.page="weatherpage"){
      component = <WeatherPage unit={this.state.unit} weather={this.state.weather}></WeatherPage>
    }
    else{
      component = <SunrisePage weather={this.state.weather}></SunrisePage>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ShipUp Front End Challenge</h1>
        </header>
        <button onClick={this.togglePage.bind(this, "weatherpage")}>Weather</button>
        <button onClick={this.togglePage.bind(this, "sunrisepage")}>Sunrise/Sunset</button>
        <UnitSelector onSelectChange={this.changeButtonState.bind(this)} unit={this.state.unit}></UnitSelector>
        <h2> {this.state.title} </h2>
        <div>Current Time: 
        <span>{this.state.time.toString()}</span>
        </div>
        {component}
        
      </div>
    );
  }
  componentDidMount(){
    this.fetchData(this.state.unit)
  }
  changeButtonState(event) {
    console.log('set to ' + event.target.value)
    this.setState({unit: event.target.value})
    this.fetchData(event.target.value)

}
togglePage(new_page){
  console.log(new_page)
  this.setState({page: new_page})
  console.log(this.state)
}
fetchData(unit){
  let self = this
    load("GET",openWeatherUrl + "?q=Paris&units="+ unit+"&APPID="+openWeatherKey,null,function(response){
      self.setState({weather: JSON.parse(response.response)}) 
      console.log(self.state)
    },function(error){
      console.log(error);
    })
}
  
}

export default App;
