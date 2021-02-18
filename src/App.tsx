import React, {useState} from 'react';
import './App.css';
import {Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";

const api = {
    key: "050f1f478868a2ca92fd19034bae70c5",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  const search = (evt: { key: string; }) => {
      if(evt.key === "Enter"){
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
              .then(res => res.json())
              .then(result => {
                  setWeather(result);
                  setQuery('');
                  console.log(result);
              });
      }
  }

  const getTimeOfDay = () => {
      let newDate = new Date()
      let hours = newDate.getHours();
      let timeOfDay = null;

      (hours>6 && hours<18) ? timeOfDay = "day" : timeOfDay = "night";

      return timeOfDay;
  }

  const getDate = () => {
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let dayArr = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"]
      let newDate = new Date()
      let date = newDate.getDate();
      let month = monthArr[newDate.getMonth() + 1];
      let year = newDate.getFullYear();

      return `${month} ${date}, ${year} - ${dayArr[newDate.getDay()]}day`

  }

    return (
    <div className="App">
      <Container className={ weather ?
          (weather.weather[0].main === "Snow" ? "app-body snow" : (
              weather.weather[0].main === "Drizzle"
              ||
              weather.weather[0].main === "Rain"
                  ? "app-body rain" : "app-body warm"
          ))
          : getTimeOfDay()==="day"? "app-body day" : "app-body night"}>
        <Row>
          <Col xs={12}>
              <InputGroup className="text-center search-group">
                  <FormControl className="search-input"
                   placeholder={"Search..."}
                   onChange={e => setQuery(e.target.value)}
                   value={query}
                   onKeyPress={search}
                  />
              </InputGroup>
          </Col>
        </Row>
        <Row>
            <Col xs={12} className={"weather-text"}>
                <h1 className={"city-name"}>
                    {weather ? (weather.name + ", " + weather.sys.country) : ""}
                </h1>
                <h3 className={"date"}>{getDate()}</h3>
                {!weather ? ("") : (
                    <div className={"temperature-box"}>
                        <h1 className={"temperature"}>
                            {Math.round(weather.main.temp)}&deg; C
                        </h1>
                    </div>
                )}
                <h3 className={"weather-condition"}>
                    {weather ? (weather.weather[0].main) : ""}
                </h3>
            </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
