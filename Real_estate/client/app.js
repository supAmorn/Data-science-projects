function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getRoomValue() {
    var uiRoom = document.getElementsByName("uiRoom");
    for(var i in uiRoom) {
      if(uiRoom[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getCarValue() {
    var uiCar = document.getElementsByName("uiCar");
    for(var i in uiCar) {
      if(uiCar[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqm = document.getElementById("uiSqm");
    var year = document.getElementById("uiYearBuilt");
    var distance = document.getElementById("uiDistance");
    var bedroom = getBHKValue();
    var bathrooms = getBathValue();
    var car = getCarValue();
    var room = getRoomValue();
    var suburb = document.getElementById("uiSuburb");
    var seller = document.getElementById("uiSeller");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    //var url = "http://127.0.0.1:5000/predict_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/predict_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        landsize: parseFloat(sqm.value),
        yearBuilt: year.value,
        distance: parseFloat(distance.value),
        bedroom: bedroom,
        bathroom: bathrooms,
        rooms: room,
        car: car,
        seller: seller.value,
        suburb: suburb.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " AUD</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    //var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiSuburb = document.getElementById("uiSuburb");
            $('#uiSuburb').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiSuburb').append(opt);
            }
        }
    });
    //var url = "http://127.0.0.1:5000/get_seller_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/get_seller_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_seller_names request");
        if(data) {
            var locations = data.locations;
            var uiSeller = document.getElementById("uiSeller");
            $('#uiSeller').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiSeller').append(opt);
            }
        }
    });
    
  }
  
  window.onload = onPageLoad;