import Preloader from './UI/preloader'
import { useState, useEffect, useRef } from "react";
import { getCurrentDrivers, getMentionsPlot } from '../models';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

function DriverList(props) {

    const [state, setState] = useState({
        'drivers': null,
        'mentions_plot': null,
        'refresh': + new Date(),
      })
    
    const prevState = usePrevious(state);

    async function getDrivers () {
        let res_promise = getCurrentDrivers()
        let res = await res_promise;
        setState((prevState) => ({ ...prevState, drivers: res['data']['drivers']}));
      }

      async function getPlot () {
        let res_promise = getMentionsPlot()
        let res = await res_promise;
        setState((prevState) => ({ ...prevState, mentions_plot: res, refresh: + new Date()}));
      }    

  const didUpdate = () => {
    if (state.drivers === null) {
        getDrivers()
    }
    if (state.mentions_plot === null) {
      getPlot();
    }
  }

  useEffect(didUpdate)
  
  return (
    <div class="row">
      <div class="col s4">
        {state.drivers === null ? <Preloader /> :
          <div class="collection" style={{borderTop: '1px solid #de0f17'}}>
            {state.drivers.map(driver =>
              <a href={'/driver?driverId=' + driver.driverId} class="collection-item" style={{'color': 'black', borderBottom: '1px solid #de0f17'}}>
                {driver.driverRef}
              </a>
            )}
          </div>
        }
      </div>
      <div class="col s8">
        <div class="card" style={{'background-color': '#de0f17', 
          'max-height': '60%',
          'margin': '2em'}}>
            <h6 style={{color: 'white', margin: '0.5em', paddingTop: '1em'}}>Drivers being discussed now</h6>
            <small style={{color: 'white', margin: '1em'}}>Data gathered from Reddit and Twitter</small>
            {state.mentions_plot === null ? <Preloader />: 
            <img src={state.mentions_plot} style={{'max-width': '96%', 'max-height': '80%', 'margin': '1em',
            'position': 'relative', 'left': '0%'}}/>}
          </div>
      </div>
    </div>
  );
}

export default DriverList;