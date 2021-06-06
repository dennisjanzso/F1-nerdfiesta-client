import { getConnection } from "../models";


function Home(props) {

  async function getAPI() {
    let res_promise = getConnection()
    let res = await res_promise;
    return res;
  }

  let response = getAPI()
  
  return (
    <div>
      Home
      {console.log(response)}
    </div>
  );
}

export default Home;