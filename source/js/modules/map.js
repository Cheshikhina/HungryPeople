const map = () => {
  // Create the script tag, set the appropriate attributes
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBnGbONYIFGKaC8hR7_3vruUf8O1NcgZYk&callback=initMap';
  script.defer = true;
  script.async = true;

  // Attach your callback function to the `window` object
  window.initMap = function () {
    // JS API is loaded and available
    let maps = new google.maps.Map(document.getElementById('index_map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
};

export default map;
