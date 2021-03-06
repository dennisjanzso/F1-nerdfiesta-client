import { useState, useEffect, useRef } from "react";
import { getRaceDetails, getRacePlot, getRaceResults } from "../models";
import PositionList from "./UI/position_list";
import Preloader from "./UI/preloader";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function RaceView(props) {

  const [state, setState] = useState({
    'image': null,
    'results': null,
    'details': null,
  })

  const prevState = usePrevious(state);

  async function getImage () {
    let res_promise = getRacePlot(props.raceId)
    let res = await res_promise;
    setState((prevState) => ({ ...prevState, image: res}));
  }

  async function loadRaceResults () {
    let res_promise = getRaceResults(props.raceId);
    let res = await res_promise;
    setState((prevState) => ({ ...prevState, results: res['data'].results}));
  }

  async function loadRaceDetails () {
    let res_promise = getRaceDetails(props.raceId);
    let res = await res_promise;
    setState((prevState) => ({ ...prevState, details: res['data']}));
  }

  const didUpdate = () => {
    if (state.details === null) {
      loadRaceDetails()
    }
    if (state.results === null) {
      loadRaceResults()
    }
    if (state.image === null) {
      getImage()
    }
  }

  useEffect(didUpdate)
  
  return (
    <div>
      {state.details === null ? <Preloader /> :
      <div class="row">
        {console.log(state.details.race[0])}
        <div class="col s1">
          <a href='/races' style={{color: '#de0f17', maxHeight: '80%'}}>
            <i class="large material-icons" style={{fontSize: '4rem', position: 'relative', top: '25%', left: '10%'}}>arrow_back</i>
          </a>
        </div>
        <div class="col s11">
          <h5 style={{'marginLeft': '1em'}}>{state.details.race[0].name_x}</h5>
          <small>Round: {state.details.race[0].round}</small>
          <small style={{paddingLeft: '2em'}}>Date: {state.details.race[0].date}</small>
          <br />
          <small>Track: {state.details.race[0].name_y}</small>
          <br />
          <small>Weather: {state.details.race[0].weather}</small>
        </div>
      </div>}
      <div class="row">
        <div class='col s4'>
          {state.results === null ? null : <PositionList results={state.results} />}
        </div>
        <div class='col s8'>
          <div class="card" style={{'background-color': '#de0f17', 
          'max-height': '60%',
          'margin': '2em'}}>
            {state.image === null ? <Preloader />: 
            <img src={state.image} style={{'max-width': '96%', 'max-height': '80%', 'margin': '1em',
            'position': 'relative', 'left': '0%'}}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaceView;