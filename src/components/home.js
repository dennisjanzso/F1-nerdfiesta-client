import { getConnection } from "../models";
import { useState, useEffect, useRef } from "react";
import Preloader from "./UI/preloader";

function Home(props) {

  async function getAPI() {
    let res_promise = getConnection()
    let res = await res_promise;
    return res;
  }

  let response = getAPI()
  
  return (
    <div class="row">
      <div class="col s6">
        <a href="/drivers" >
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="https://cdn.racingnews365.com/transforms/default/2047293/F1_DTS_S3_FIRSTLOOK_01_cec5a7870ed110198cefa527308d9a45.jpg" />
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">Drivers</span>
            </div>
          </div>
        </a>
      </div>
      <div class="col s6" style={{maxHeight: '60%'}}>
        <a href="/races" >
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="https://cdn-wp.thesportsrush.com/2020/09/Untitled-design-2-2.jpg" />
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">Races</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Home;