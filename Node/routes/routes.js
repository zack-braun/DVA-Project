// routes.js
const apiKey4ProPublica = 'gKufsGOW6vGeCqfYQiVNkuITq7h1fytjlfaL1Qtq';
const apiKey4OpenSecrets = 'd3f8992dc4e2d3ad0d1c50fcbecea064';

// reveals main.js properties to routes
module.exports = function (app) {

  app.post('/submitSurvey', (req, res) => {
    console.log(req.body)
    // Send data to ML model
    // Receive output from ML model
    const matches = [{
      id: 'N00007360',
      id: 'N00013817',
      id: 'N00037515',
    }];

    // Send to front-end
    res.send({success: true, matches})
  });

  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};

