(function() {

  /* TODO:
   *  - Remove old results in table and dropdown when searching new postcode
  *   - Fix double click issue on buttons
  *   - Add errors when entering postcode incorrectly
  *   - Add message when entering postcode that doesn't have bin collections
  *   - Unit testing
  *   - Results filtering
  *   - UI & CSS improvements
  */

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
      console.log("failed pc", e);
    }
  })

  uprnButton.addEventListener("click", () => {
    try {
      state.userSelection = selectbox.value
      const data = fetch(`${state.options.collectionsURL}/${state.userSelection}`)
        .then(res => res.json())
        .then(res => state.fetchedUPRNData = res);
        console.log(state.fetchedUPRNData)
        if (state.fetchedUPRNData !== null) outputCollections()
    } catch(e) {
      console.log("failed uprn", e);
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

  function outputCollections() {
    document.getElementById("collectiondates").removeAttribute("hidden")

    state.fetchedUPRNData.collections.forEach((index, i) => {
      let date = index.date.substring(0, 10)
      let table = document.getElementById("collectionTable");
      let row = table.insertRow()
      let cell1 = row.insertCell(0)
      let cell2 = row.insertCell(1)
      let cell3 = row.insertCell(2)

      cell1.innerHTML = index.service
      cell2.innerHTML = index.day
      cell3.innerHTML = date
    });
  }

})();
