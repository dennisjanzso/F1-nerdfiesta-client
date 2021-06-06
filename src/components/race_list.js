import Preloader from './UI/preloader'

function RaceList(props) {
  
  return (
    <div>
      {props.races === null ? <Preloader /> :
        <div class="collection" style={{borderTop: '1px solid #de0f17'}}>
          {props.races.map(race =>
            <a href={props.forward + race.raceId} class="collection-item" style={{'color': 'black', borderBottom: '1px solid #de0f17'}}>
              {race.year} - {race.name}
            </a>
          )}
        </div>
      }
    </div>
  );
}

export default RaceList;