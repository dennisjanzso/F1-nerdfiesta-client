import { useEffect, useState, useRef } from 'react';
import {getPastRaces, getFutureRaces} from '../models'
import Preloader from './UI/preloader'
import RaceList from "./race_list";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

function RaceWrapper(props) {

  const [state, setState] = useState({
      'past_races': null,
      'future_races': null,
      'view': 'past',
  })
  
  const prevState = usePrevious(state);

  async function getRacesPast() {
      let res_promise = getPastRaces()
      let res = await res_promise;
      setState((prevState) => ({ ...prevState, past_races: res['data']['races']}));
  }

  async function getRacesFuture() {
      let res_promise = getFutureRaces()
      let res = await res_promise;
      setState((prevState) => ({ ...prevState, future_races: res['data']['races']}));
  }

  const toggleView = (event) => {
    setState((prevState) => ({ ...prevState, view: event.target.getAttribute("value")}));
  }

  const didUpdate = () => {
    if (state.past_races === null) {
      getRacesPast()
    }
    if (state.future_races === null) {
      getRacesFuture()
    }
  }

  useEffect(didUpdate)
  
  return (
    <div>
      <div class="row" style={{paddingTop: '1em'}}>
        <div class="col s6">
            <a class="waves-effect waves-light btn" style={{backgroundColor:'#de0f17', position: 'realtive', left: '35%'}} onClick={toggleView} value='past'>Past Races</a>
        </div>
        <div class="col s6">
            <a class="waves-effect waves-light btn" style={{backgroundColor:'#de0f17', position: 'realtive', left: '35%'}} onClick={toggleView} value='future'>Future Races</a>
        </div>
      </div>
      <div class="row">
          {state.past_races === null || state.future_races === null ? <Preloader /> :
            <div>
              {state.view === 'past' ? <RaceList races={state.past_races} forward='/race?raceId=' /> : null}
              {state.view === 'future' ? <RaceList races={state.future_races} forward='/prediction?raceId=' /> : null}
            </div>
          }
      </div>
    </div>
  );
}

export default RaceWrapper;