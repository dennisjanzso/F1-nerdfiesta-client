import { useState, useEffect, useRef } from "react";
import { getPredictionPlot, getRacePlot, getRacePrediction, getRaceDetails } from "../models";
import PositionList from "./UI/position_list";
import Preloader from "./UI/preloader";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function PredictionView(props) {

  const [state, setState] = useState({
    'qualy_plot': null,
    'race_plot': null,
    'race_prediction': null,
    'weather': 'dry',
    'details': null,
  })

  const prevState = usePrevious(state);

  async function getPrediction () {
      let res_promise = getRacePrediction(props.raceId, state.weather)
      let res = await res_promise;
      setState((prevState) => ({ ...prevState, race_prediction: JSON.parse(res['data'].replace(/\bNaN\b/g, "null"))}));
  }

  async function getQualyPlot () {
    let res_promise = getPredictionPlot(state.race_prediction['ticket'], "q")
    let res = await res_promise;
    setState((prevState) => ({ ...prevState, qualy_plot: res}));
  }

  async function getRacePlot () {
    let res_promise = getPredictionPlot(state.race_prediction['ticket'], "r")
    let res = await res_promise;
    setState((prevState) => ({ ...prevState, race_plot: res}));
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
    if (state.race_prediction === null) {
      getPrediction();
    } 
    else if (state.qualy_plot ===  null) {
        getQualyPlot();
    }
    else if (state.race_plot === null) {
        getRacePlot()
    }
  }

  useEffect(didUpdate)
  
  return (
    <div>
      {state.details === null ? <Preloader /> :
      <div class="row">
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
        </div>
      </div>}
      <div class="row">
        {state.race_prediction === null ? <Preloader progressInfo="Loading race prediction"/>:
          <div class="card" style={{'background-color': '#de0f17', 
          'max-height': '60%',
          'margin': '2em'}}>
            <div class='col s4'>
              <h5>Predicted Race Results</h5>
              <PositionList results={state.race_prediction.race} />
            </div>
            <div class='col s8'>
              <div class='card' style={{'background-color': '#de0f17', 
                'max-height': '60%',
                'margin': '2em'}}>
                <h6 style={{color: 'white', margin: '1em', paddingTop: '2em'}}>Qualifying Prediction</h6>
                {state.qualy_plot === null ? <Preloader progressInfo="Loading qualifying plot"/>: 
                <img src={state.qualy_plot} style={{'max-width': '96%', 'max-height': '80%', 'margin': '1em',
                'position': 'relative'}}/>}
                <h6 style={{color: 'white', margin: '1em', paddingTop: '2em'}}>Race Prediction</h6>
                {state.race_plot === null ? <Preloader progressInfo="Loading race plot"/>: 
                <img src={state.race_plot} style={{'max-width': '96%', 'max-height': '80%', 'margin': '1em',
                'position': 'relative'}}/>}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default PredictionView;