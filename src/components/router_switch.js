import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Home from './home';
import RaceWrapper from './race_wrapper';
import RaceView from './race_view';
import PredictionView from "./prediction_view";
import DriverList from "./driver_list";
import DriverView from './driver_view';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RouterSwitch () {
  let query = useQuery();

  return(
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/races'>
        <RaceWrapper />
      </Route>
      <Route path='/race'>
        <RaceView raceId={query.get("raceId")}/>
      </Route>
      <Route path='/prediction'>
        <PredictionView raceId={query.get("raceId")}/>
      </Route>
      <Route path='/drivers'>
        <DriverList/>
      </Route>
      <Route path='/driver'>
        <DriverView driverId={query.get("driverId")}/>
      </Route>
    </Switch>
  )
}

export default RouterSwitch;