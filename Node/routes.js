const apiKey4ProPublica = 'gKufsGOW6vGeCqfYQiVNkuITq7h1fytjlfaL1Qtq';
const apiKey4OpenSecrets = 'd3f8992dc4e2d3ad0d1c50fcbecea064';

// reveals main.js properties to routes
module.exports = function (app) {
  app.get('/', (req, res) => res.send('hello world'));

  app.get('/allUser', (req, res) => {
    // pass
  });
};

