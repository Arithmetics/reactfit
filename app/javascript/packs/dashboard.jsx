import React from 'react';
import ReactDOM from 'react-dom';
import LifetimeStats from './LifetimeStats';
import Badges from './Badges';
import TimeSeriesBarChart from './TimeSeriesBarChart';
import dummyData from './dummyData';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = dummyData;
  }

  fetchFitbitData(url, fitbitToken, stateKey){
    axios({
      method: 'get',
      url: url,
      headers: { 'Authorization': 'Bearer ' + fitbitToken },
      mode: 'cors'
    })
    .then(response => {
      this.setState({[stateKey]: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount(){
    if(window.location.hash){
      let fitbitToken = window.location.hash.slice(1).split("&")[0].replace("access_token=", "");


      this.setState({loggedIn: true})

      this.fetchFitbitData('https://api.fitbit.com/1/user/-/profile.json', fitbitToken, 'user')

      this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities.json', fitbitToken, 'lifetimeStats')

      this.fetchFitbitData('https://api.fitbit.com/1/user/-/badges.json', fitbitToken, 'badges')

      this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities/steps/date/2018-02-15/1m.json', fitbitToken, 'steps')

      this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities/distance/date/2018-02-15/1m.json', fitbitToken, 'distance')


    }
  }

  render(){
    console.log(this.state.steps["activities-steps"]);

    return(
      <div className="container">
          <header className="text-center">
            <span className="pull-right">{this.state.user.user.displayName}</span>
            <h1 className="page-header">React Fit</h1>
            <p className="lead">Personal fitness dashboard</p>
          </header>

        {!this.state.loggedIn &&
          <div className="row text-center">
            <a href="https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22CR4X&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800">
              Login with Fitbit
            </a>
          </div>
        }

        <div className="row">

          <div className="col-lg-3">
            <LifetimeStats lifetimeStats={this.state.lifetimeStats}/>
            <Badges badges={this.state.badges.badges}/>
          </div>


          <div className="col-lg-6">
            <TimeSeriesBarChart data={this.state.steps["activities-steps"]} title="Steps" yMax={8000}  />
            <TimeSeriesBarChart data={this.state.distance["activities-distance"]} title="Distance" yMax={10}  />
          </div>

          <div className="col-lg-2 col-lg-offset-1">
            <div className="panel panel-default">
              <div className="panel-heading">Your Friends</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Dashboard />,
    document.body.appendChild(document.createElement('div')),
  )
})
