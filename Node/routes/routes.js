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
    console.log(req.body);
    // Send data to ML model
    // Receive output from ML model
    const matches = ['N00007360', 'N00013817', 'N00037515'];

    const congressmen = [];
    for (let i = 0; i < matches.length; i += 1) {
      // Should be async, but whatever
      congressmen.push({
        opensecrets: await Congressman.findByOpensecrets(matches[i]),
        legislators: await Legislator.findByOpensecrets(matches[i]),
        reqBody: req.body,
      });
    }

    const allCongressmen = await kmeans.initData(Congressman);

    // Send to front-end
    res.send({ success: true, congressmen, allCongressmen });
  });

  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};

