import Preloader from './UI/preloader'
import { useState, useEffect, useRef } from "react";
import { getCurrentDrivers } from '../models';

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
      })
    
    const prevState = usePrevious(state);

    async function getDrivers () {
        let res_promise = getCurrentDrivers()
        let res = await res_promise;
        setState((prevState) => ({ ...prevState, drivers: res['data']['drivers']}));
      }

  const didUpdate = () => {
    if (state.drivers === null) {
        getDrivers()
    }
  }

  useEffect(didUpdate)
  
  return (
    <div>
      {console.log(state.drivers)}
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
  );
}

export default DriverList;