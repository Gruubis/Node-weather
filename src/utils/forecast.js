// const url = 'http://api.weatherstack.com/current?access_key=ce53a69cc92e6dec8cd0a1019f1d39aa&query=40.416775,-3.703790'

// request({ url: url, json: true}, (error, response)=>{
//     if(error){
//         console.log(chalk.red.inverse('Unable to connect to weather services!'))
//     }else if(response.body.error){
//         console.log(chalk.red.inverse(response.body.error.info))
//     }
//     else{

//         console.log(chalk.green.bold('In ' + response.body.current.weather_descriptions[0] +  " Current temperature is " + response.body.current.temperature + ' And it feels like ' + response.body.current.feelslike))
//     }
const request = require('request')

const forecast = (longitude, latitude, callback)=> {

    const url = 'http://api.weatherstack.com/current?access_key=ce53a69cc92e6dec8cd0a1019f1d39aa&query=' + latitude+','+longitude;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if(body.error){
            callback('There is no such Latitude or Longitude. Try again.', undefined)
        }
        else {
            callback(undefined, 'Local time: '+body.location.localtime+ '. '+ body.current.weather_descriptions[0] +  ". Current temperature is " + body.current.temperature + ' And it feels like ' + body.current.feelslike + ' Humidity ' + body.current.humidity +' %')
        }
    })

    }

module.exports = forecast