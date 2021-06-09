import axios from 'axios';

const api_url = 'http://0.0.0.0:8080';

export function getConnection () {
    return axios.get(api_url + '/')
    .then(response => {return response});
}

export function getPastRaces () {
    return axios.get(api_url + '/races')
    .then(response => {return response})
}

export function getFutureRaces () {
    return axios.get(api_url + '/future-races')
    .then(response => {return response})
}

export function getCurrentDrivers () {
    return axios.get(api_url + '/current-drivers')
    .then(response => {return response})
}

export function getDriverDetails (driverId) {
    const data = {"driverId": driverId};
    return axios.post(api_url + '/driver-details', data, {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {return response})
}

export function getDriverPlot (driverId) {
    const data = {"driverId": driverId}
    return axios.post(api_url + '/driver-plot', data, { responseType: 'arraybuffer' ,
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        let blob = new Blob(
            [response.data], 
            { type: response.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        return image
    })
}

export function getRacePlot (raceId) {
    const data = {"raceId": raceId}
    return axios.post(api_url + '/race-plot', data, { responseType: 'arraybuffer' ,
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        let blob = new Blob(
            [response.data], 
            { type: response.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        return image
    })
}

export function getRaceResults (raceId) {
    const data = {"raceId": raceId};
    return axios.post(api_url + '/race-results', data, {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {return response})
}

export function getRaceDetails (raceId) {
    const data = {"raceId": raceId};
    return axios.post(api_url + '/race-details', data, {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {return response})
}

export function getRacePrediction (raceId, weather) {
    const data = {"raceId": raceId, "weather": weather};
    return axios.post(api_url + '/race-prediction', data, {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {return response})
}

export function getPredictionPlot (ticket, kind) {
    const data = {"ticket": ticket, "kind": kind};
    return axios.post(api_url + '/prediction-plot', data, { responseType: 'arraybuffer' ,
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        let blob = new Blob(
            [response.data], 
            { type: response.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        return image
    })
}

export function getMentionsPlot () {
    return axios.get(api_url + '/mentions-plot', { responseType: 'arraybuffer' ,
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        let blob = new Blob(
            [response.data], 
            { type: response.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        return image
    })
}