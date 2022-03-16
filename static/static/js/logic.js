// We create the tile layers that will be the selectable backgrounds of our map.

// Create a L.tilelayer() using the 'mapbox/light-v10' map id
var grayMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});


// We then create the map object with options. Adding the tile layers we just
// created to an array of layers.

// Create a L.map(), reference the 'mapid' element in the HTML page, and pass in the above layer
var myMap = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3,
  layers: [grayMap]
});

grayMap.addTo(myMap);



// Defining an object that contains our map choices.
// Create a basemaps object for the tileLayer from above. 
// The key should be a human readable name for the tile layer, and the value should be a tileLayer variable
var baseMap = {Grayscale: grayMap};



// Add a L.control.layers() object and pass in the baseMaps and overlayMaps, and then .addTo myMap
L.control.layers(baseMap)
         .addTo(myMap);

// add CSV job data into map         
var data;

function addMarkers() {
  data.forEach(function(d) {
    var marker = L.circleMarker([+d.lat, +d.lng])
                  .addTo(myMap)
                  .bindPopup(
                    "Job Name: "
                    + d.job_title
                    + "<br>Company: "
                    + d.company_name
                    + "<br>Location: "
                    + d.location
                  )
                  .openPopup();
    // marker.addTo(myMap);
  })
}


// Get CSV and plot points
d3.csv('/static/data/job_data.csv')
  .then(function(csv) {
  data = csv;
  addMarkers();
});



