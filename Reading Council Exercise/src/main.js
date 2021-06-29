(function() {

  const state = {
    userInput: null,
    fetchingData: false,
    fetchedData: null,
    options: {
      requestURL: 'https://api.readingdev.com/rbv/getaddresses'
    },
  };
  console.log("test");

  function makeRequest() {
    try {
      fetch(`${state.options.requestURL}/${state.userInput}`)
        .then(res => res.json()).then(res => state.fetchedData = res);
        console.log(res);
      }
    catch(e) {
      // update ui with error message
    }
  }

})();
