// routes.js
const apiKey4ProPublica = 'gKufsGOW6vGeCqfYQiVNkuITq7h1fytjlfaL1Qtq';
const apiKey4OpenSecrets = 'd3f8992dc4e2d3ad0d1c50fcbecea064';

const Congressman = require('../controllers/Congressman.js');
const Legislator = require('../controllers/Legislator.js');
const kmeans = require('../controllers/kmeans.js');

kmeans.startKmeans(Congressman);

// reveals main.js properties to routes
module.exports = function (app) {
  app.post('/submitSurvey', async (req, res) => {
    // console.log(req.body);
    // Send data to ML model
    // Receive output from ML model
    const matchJson = await kmeans.runKmeans(req.body);
    // console.log('here');
    const matches = [];
    for (const key in matchJson) {
      if (matchJson.hasOwnProperty(key)) {
        // console.log(key);
        const congressmen = await Congressman.findByIndex(key);
        // console.log(congressmen);
        matches.push(congressmen);
      }
    }

    const congressmen = [];
    for (let i = 0; i < matches.length; i += 1) {
      // Should be async, but whatever
      console.log(matches[i]);
      congressmen.push({
        opensecrets: matches[i],
        legislators: await Legislator.findByOpensecrets(matches[i].opensecrets),
        reqBody: req.body,
      });
    }

    const allCongressmen = kmeans.getInitData();

    // Send to front-end
    res.send({ success: true, congressmen, allCongressmen });
  });

  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};

