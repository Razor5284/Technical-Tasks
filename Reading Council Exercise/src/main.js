(function() {

  const state = {
    userInput: null,
    userSelection: null,
    fetchingData: false,
    fetchedPCData: null,
    fetchedUPRNData: null,
    options: {
        postcodeURL: 'https://api.readingdev.com/rbc/getaddresses',
        collectionsURL: 'https://api.readingdev.com/api/collections'
    },
  };
  const input = document.getElementById("postcode");
  const pcButton = document.getElementById("postcodeButton");
  const uprnButton = document.getElementById("UPRNButton");
  const selectbox = document.getElementById("UPRNSelectbox")


  // using on change event in the possibility of scaling logic in future, i.e. live validation
  // input.addEventListener("change", () => {
  //   state.userInput = input.value;
  //   getPostcode();
  // })

  pcButton.addEventListener("click", () => {
    try {
      state.userInput = input.value;
      const data = fetch(`${state.options.postcodeURL}/${state.userInput}`)
        .then(res => res.json())
        .then(data => state.fetchedPCData = data);
      if (state.fetchedPCData !== null) outputAddresses();
    } catch(e) {
      // update ui with error message
    }
  })

  uprnButton.addEventListener("click", () => {
    try {
      state.userSelection = selectbox.value
      const data = fetch(`${state.options.collectionsURL}/${state.userSelection}`)
        .then(res => res.json())
        .then(res => state.fetchedUPRNData = res);
    } catch(e) {
      // update ui with error message
    }
  })

  function outputAddresses() {
    document.getElementById("UPRNForm").removeAttribute("hidden")

    state.fetchedPCData.Addresses.forEach((index, i) => {
      option = document.createElement('option');
      option.text = index.SiteShortAddress;
      option.value = index.AccountSiteUprn;
      selectbox.add(option);
    });
  }

})();
