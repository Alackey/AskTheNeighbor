const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'asktheneighbor-166200';

// Instantiates a client
const datastore = Datastore({
  projectId,
});

// getCrimes gets the crimes for a city in a state
const getCrimes = function getCrimes(crimeKey) {
  return new Promise((resolve, reject) => {
    const key = datastore.key(['Crime', crimeKey]);
    datastore.get(key)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// getCrimesByState gets all cities crimes for a state
const getCrimesByState = function getCrimesByState(state) {
  return new Promise((resolve, reject) => {
    const query = datastore.createQuery('Crime')
      .filter('State', '=', state);

    datastore.runQuery(query)
      .then((results) => {
        console.log(results[0]);
        resolve(results[0]);
      }).catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getCrimes,
  getCrimesByState,
};
