$(document).ready( function () {
    $('#middle-content').load('landing.html');
} );

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;

// Google places autocomplete
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

// Called when autocomplete field is filled in with address
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(JSON.stringify(place.formatted_address));
  var local = {
    full_address: place.formatted_address,
    lat: place.geometry.location.lat(),
    long: place.geometry.location.lng(),
  };

  place.address_components.forEach(function(component) {
    component.types.forEach(function(type) {
      if (type == "administrative_area_level_1") {
        console.log("state: " + component.short_name);
        local.state_short = component.short_name;
      }
    });
  });
  console.log("local var: " + JSON.stringify(local));


  // Load results page
  loadResults();
}

// Load the results page
function loadResults() {
  $('#middle-content').load('results.html');
}