

function PositionList(props) {

  const prediction = props.results[0].hasOwnProperty('pred_r_score');
  
  return (
    <div>
      <table class="striped responsive-table">
        <thead>
          {prediction ?
            <tr>
              <td style={{padding: '5px 5px'}}>Driver</td>
              <td style={{padding: '5px 5px'}}>Score</td>
              <td style={{padding: '5px 5px'}}>Predicted Postition</td>
            </tr> :
            <tr>
              <td style={{padding: '5px 5px'}}>Driver</td>
              <td style={{padding: '5px 5px'}}>Grid</td>
              <td style={{padding: '5px 5px'}}>Finishing Postition</td>
            </tr>}
        </thead>
        <tbody>
          {props.results.map((res, index) => 
            <div>
            {prediction ?
              <tr>
                <td style={{padding: '5px 5px'}}>{res['driverRef']}</td>
                <td style={{padding: '5px 5px'}}>{res['pred_r_score'] === null ? 'NA' : res['pred_r_score']}</td>
                <td style={{padding: '5px 5px'}}>{index + 1}</td>
              </tr> :
              <tr>
                <td style={{padding: '5px 5px'}}>{res['surname']}</td>
                <td style={{padding: '5px 5px'}}>{res['grid']}</td>
                <td style={{padding: '5px 5px'}}>{res['positionText']}</td>
              </tr>}
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PositionList;