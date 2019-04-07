export default class RouteHelper {
  constructor() {
    this.fetch = this.fetch.bind(this);
  }

  fetch(url, options) {
    // console.log('inside fetch');
    // console.log(`url ${url}`);

    // Stringify body so it does not need to be stringified in request call
    // console.log(options.body);
    if (options.body && typeof (options.body) !== 'string') {
      options.body = JSON.stringify(options.body);
    }

    // console.log(`options ${JSON.stringify(options)}`);
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return window.fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus(response) {
    // console.log('check status');
    // console.log(response);
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
