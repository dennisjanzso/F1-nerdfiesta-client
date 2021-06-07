import Preloader from './UI/preloader'
import { useState, useEffect, useRef } from "react";
import { getDriverDetails, getDriverPlot } from '../models';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

function DriverView(props) {

    const [state, setState] = useState({
        'details': null,
        'races_scatter': null,
      })
    
    const prevState = usePrevious(state);

    async function getImage () {
        let res_promise = getDriverPlot(props.driverId)
        let res = await res_promise;
        setState((prevState) => ({ ...prevState, races_scatter: res}));
      }

    async function loadDriverDetails () {
        let res_promise = getDriverDetails(props.driverId)
        let res = await res_promise;
        setState((prevState) => ({ ...prevState, details: res['data']['driver']}));
      }
    

  const didUpdate = () => {
      if (state.details === null) {
          loadDriverDetails()
      }
      if (state.races_scatter === null) {
          getImage()
      }
  }

  useEffect(didUpdate)
  
  return (
    <div>
        {state.details === null ? <Preloader /> :
        <div class="row">
            <div class="col s1">
            <a href='/drivers' style={{color: '#de0f17', maxHeight: '80%'}}>
                <i class="large material-icons" style={{fontSize: '4rem', position: 'relative', top: '25%', left: '10%'}}>arrow_back</i>
            </a>
            </div>
            <div class="col s11">
                <h5 style={{'marginLeft': '1em'}}>{state.details[0].forename + ' ' + state.details[0].surname}</h5>
                <small>DOB: {state.details[0].dob}</small>
                <small style={{paddingLeft: '2em'}}>Number: {state.details[0].number}</small>
            </div>
        </div>}
        <div class="card" style={{'background-color': '#de0f17', 
        'max-height': '60%',
        'margin': '2em'}}>
            {state.races_scatter === null ? <Preloader />: 
            <img src={state.races_scatter} style={{'max-width': '66%', 'max-height': '80%', 'margin': '1em',
            'position': 'relative', 'left': '16%'}}/>}
        </div>
    </div>
  );
}

export default DriverView;