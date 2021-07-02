(function() {

  /* TODO:
  *   - Add message when entering postcode that doesn't have bin collections
  *   - Fix double click issue on buttons
  *   - Fix reloading on enter button press
  *   - Unit testing
  *   - Results filtering
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
  const selectbox = document.getElementById("UPRNSelectbox");
  const table = document.getElementById("collectionTable");


  // using on change event in for live postcode validation
  input.addEventListener("change", () => {
    state.userInput = input.value;
    if (!checkPostcode()) {
      document.getElementById("pc-warning").removeAttribute("hidden");
    } else {
      document.getElementById("pc-warning").setAttribute("hidden", "true");
    }
  })

  // click postcode submit button returns postcode data w/
  // addresses and UPRN from API, calls outputAddresses
  pcButton.addEventListener("click", () => {
    try {
      state.userInput = input.value;

      const data = fetch(`${state.options.postcodeURL}/${state.userInput}`)
        .then(res => res.json())
        //.then(data => state.fetchedPCData = data);
        // state.fetchedPCData
        data.then(function(result) {
          state.fetchedPCData = result
        })

      if (state.fetchedPCData !== null) outputAddresses();

    } catch(e) {
      console.log("failed pc", e);
    }
  })

  // clicking submit button after selecting an address returns
  // UPRN from API and calls outputCollections
  uprnButton.addEventListener("click", () => {
    try {
      state.userSelection = selectbox.value

      const data = fetch(`${state.options.collectionsURL}/${state.userSelection}`)
        .then(res => res.json())
        .then(res => state.fetchedUPRNData = res);

        if (state.fetchedUPRNData !== null) outputCollections()

    } catch(e) {
      console.log("failed uprn", e);
    }
  })

  // returns addresses in a select box
  function outputAddresses() {
    document.getElementById("UPRNForm").removeAttribute("hidden");

    clearTable()

    selectbox.innerHTML = "";

    state.fetchedPCData.Addresses.forEach((index, i) => {
      option = document.createElement('option');
      option.text = index.SiteShortAddress;
      option.value = index.AccountSiteUprn;
      selectbox.add(option);
    });
  }

  // returns collection data in a table
  function outputCollections() {
    document.getElementById("collectiondates").removeAttribute("hidden");

    clearTable()

    state.fetchedUPRNData.collections.forEach((index, i) => {
      let date = index.date.substring(0, 10)
      let row = table.insertRow()
      let cell1 = row.insertCell(0)
      let cell2 = row.insertCell(1)
      let cell3 = row.insertCell(2)

      cell1.innerHTML = index.service
      cell2.innerHTML = index.day
      cell3.innerHTML = date
    });
  }

  function clearTable() {
    table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
  }

  function checkPostcode(postcode) {
    postcode = state.userInput.replace(/\s/g, "");
    var regex = /^RG[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
  }
})();
