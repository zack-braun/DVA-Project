// routes.js
const apiKey4ProPublica = 'gKufsGOW6vGeCqfYQiVNkuITq7h1fytjlfaL1Qtq';
const apiKey4OpenSecrets = 'd3f8992dc4e2d3ad0d1c50fcbecea064';

const Congressman = require('../controllers/Congressman.js');
const Legislator = require('../controllers/Legislator.js');
const kmeans = require('../controllers/kmeans.js');
const sortByKey = require('../controllers/utils.js');

kmeans.startKmeans(Congressman);

// reveals main.js properties to routes
module.exports = function (app) {
  app.post('/submitSurvey', async (req, res) => {
    // console.log(req.body);
    // Send data to ML model
    // Receive output from ML model
    const matchJson = await kmeans.runKmeans(req.body);
    // console.log(matchJson);
    // console.log('here');
    const matches = [];
    const percents = [];
    for (const key in matchJson) {
      if (matchJson.hasOwnProperty(key)) {
        // console.log(key);
        const congressmen = await Congressman.findByIndex(key);
        // console.log(congressmen);
        matches.push(congressmen);
        percents.push(matchJson[key]);
      }
    }

    const congressmen = [];
    calls = [];
    console.log(matches);
    for (let i = 0; i < matches.length; i += 1) {
      // console.log(i);
      // console.log(matches[i]);
      // Should be async, but whatever
      if (matches[i] === null) {
        console.log('HERE', matches[i]);
      } else {
        calls.push(Legislator.findByOpensecrets(matches[i].opensecrets));
        congressmen.push({
          opensecrets: matches[i],
          // legislators: await ,
          percentMatch: percents[i],
          reqBody: req.body,
        });
      }
    }
    let actualCongressmen = [];
    const legislators = await Promise.all([...calls]);
    for (let i = 0; i < matches.length; i += 1) {
      if (legislators[i]) {
        congressmen[i].legislators = legislators[i];
        actualCongressmen.push(congressmen[i]);
      }
    }
    sortByKey(actualCongressmen, 'percentMatch');
    actualCongressmen = actualCongressmen.reverse();
    actualCongressmen = actualCongressmen.slice(0, 10);

    const allCongressmen = kmeans.getInitData();

    // Send to front-end
    res.send({ success: true, congressmen: actualCongressmen, allCongressmen });
  });

  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};

