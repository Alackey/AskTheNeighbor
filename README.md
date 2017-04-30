# AskTheNeighbor
https://www.asktheneighbor.org/

This is the source for the extension of https://github.com/alackey/killabackend

## Getting Started
1. Clone repo
2. cd into root directory
3. ```npm install```
4. ```npm start```

### Configuring API keys
1. Set the environment variable: ```GOOGLE_API_KEY=YOU_API_KEY```
2. Set the environment variable: ```DARKSKY_API_KEY=YOUR_API_KEY```
3. Set the environment variable: ```WUNDERGROUND_API_KEY=YOUR_API_KEY```
4. Set the environment variable for zillow: ```ZWSID=YOUR_API_KEY```
5. Configure Google Cloud Datastore with a table name Crime and change the projectId in datastore.js to your project id.

## Architecture
* We used Node.js for our backend and plain HTML, CSS, and Javascript for the front end.
* For the database we used Google Cloud Datastore.
* Using Node.js provided us with a lot of asynchronous tasks which helped a lot with speed, and there are is a library for almost anything since it is very popular right now.

## Optimizations for speed
* Node.js' default behaviour is to do a lot of asynchronous tasks so that help make multiple calls to the API's quick and efficient. 
* We GZIP's all our requests, so the data is smaller and data will get to the user faster.
* We split all the services into seperate urls/route paths so we could use the asynchronous calls (AJAX) on the frontend to call and get all of the data in parallel.

## Transportation
* Used Google Places API to get the transportation places in a specific radius. Each a /transportation http request is called, we look up each transportation available to google places API
* https://developers.google.com/places/web-service/

## Crime
* Used fbi.gov's public crime data that was collected over the past 20 years and is voluntarily provided by each city's Police Department. 
* We took the crime data in the U.S. from 2008 - 2015 from fbi.gov and uploaded that data to a database (Google Cloud Datastore). Then we just search for the data in the databased on the city provided.
* https://ucr.fbi.gov/

## Database
* We used a managed NoSQL database called Google Cloud Datastore.
* There were no relationships and we only had one table.
* The key for each entry had the state dash city for quick indexed access. Ex. california-pomona
* For each entry, it contained the data in as array for crime for years 2008 - 2015. We decided to do it this way since we never needed to search by the specific crime data and only searched by the state and city.
* https://cloud.google.com/datastore/

## Real estate documentation
* Zillow API - https://www.zillow.com/howto/api/APIOverview.htm
* node-zillow module for Node.js - https://github.com/ralucas/node-zillow
* My data source was the Zillow API documentation itself and the README for the node-zillow module that simplifies making API calls to zillow. I made use of the 'GetSearchResults' call to get the zillow ID for a given address and the 'GetComps' call to retrieve information on nearby houses and places to rent that are for sale and have been sold recently. This information includes the address, latitute and longitude, and zillow estimate price (zestimate). 
* The 'realestate.js' API takes the street address and either a zipcode or city and state combination to return a list of nearby properties for sale and rent. The bulk of the work is done in 'zillow.js' which utilizes the node-zillow module to make the API calls to Zillow. 

## Weather

**OVERVIEW**: The weather functionality consists of two files: weather.js and darksky.js. These two javascript programs interact with each other to return weather information: a  weekly forecast and the seasonal weather of the previous year. The weekly forecast will conventionally display daily temperatures for the next seven days. Furthermore, the average weather temperature is returned for every quarter of the previos year.  This functionality strives to provide thorough weather information on the specified location. It will allow users to have a better sense of how the weather will be like in the specified location.

* weather.js
* darksky.js

### weather.js 
* `weather.js` receives the coordinates of the specified location as arguments, therefore the latitude and longitude are passed into this function. This function will direct to darksky.js, which will make API calls to two different sources, DarkSky and Weather Underground, in order to reduce the strain on using one API KEY for all data retrieval. This 
file's main focus is to return a response to the browser with data in JSON. The response should look like the follow: 
`{ "forecast": [ Object ], "seasonal": [ Object }`

### darksky.js
* `darksky.js` handles all the API calls to DarkSky and Weather Underground. DarkSky's API is solely used for retrieving weekly forecasts of the current location, which is handled by `getWeather()` function. However, the approach to gather the seasonal weather for the previous year is not as straight forward. The first component to retrieve the seasonal weather is to call Weather Underground's API and extract the code of the nearest airport from the response; this was handled but the function, `getGeolocation()`. The airport code is later passed as an argument into the function, `getHistory()`. This method will make HTTP requests with the reconstructed URL that contains the airport code. Weather temperatures are then extracted for the following quarters: January - March, April - June, July - September, October - December. Cheerio and CheerioTableParser were two libraries used to web scrape the body of the response, and extract the maximum and minimum temperature of each quarter of the previous year. The maximum and minimum values were used to calculate the average temperature of each quarter. Finally, JSON objects were constructed from the attained information and returned to `weather.js`. 

* Weather Underground API - https://www.wunderground.com/weather/api/d/docs
* DarkSky API - https://darksky.net/dev/docs
* Cheerio - https://cheerio.js.org
* CheerioTableParser - https://www.npmjs.com/package/cheerio-tableparser
 
