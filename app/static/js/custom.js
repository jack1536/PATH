// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return ab
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:

var directionsService;
var directionsDisplay;
var inputFrom;
var searchBoxFrom;
var inputTo;
var searchBoxTo;

function initMap() {

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.1, lng: -117.7},
    zoom: 13,
    mapTypeControl: false,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  inputFrom = document.getElementById('pac-input-from');
  searchBoxFrom = new google.maps.places.SearchBox(inputFrom);
  inputTo = document.getElementById('pac-input-to');
  searchBoxTo = new google.maps.places.SearchBox(inputTo);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBoxFrom.setBounds(map.getBounds());
    searchBoxTo.setBounds(map.getBounds());
  });

  var markerFrom;
  var markerTo;
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBoxFrom.addListener('places_changed', function() {
    var places = searchBoxFrom.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if(markerFrom != null) {
        markerFrom.setMap(null);
      }

      // Create a marker for each place.
      markerFrom = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      if (markerTo != null) {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      }
    });
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBoxTo.addListener('places_changed', function() {
    var places = searchBoxTo.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if(markerTo != null) {
        markerTo.setMap(null);
      }

      // Create a marker for each place.
      markerTo = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      if (markerFrom != null) {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      }

    });
  });
}






function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  window.alert(searchBoxFrom.getPlaces() + " " + searchBoxTo.getPlaces());

  directionsService.route({
    origin: inputFrom.value,
    // document.getElementById('pac-input-from').value,
    destination: inputTo.value,
    // document.getElementById('pac-input-to').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// var button = document.getElementById('find-button')
// button.addEventListener('click', function() {
//   calculateAndDisplayRoute(directionsService, directionsDisplay);
// });
