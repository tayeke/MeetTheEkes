var map,
    initLatLng = {lat: 48.6075491, lng: -122.8154666},
    icons = [
        {
            key: "venue",
            icon: '',
            latlng: {lat: 48.641208, lng: -122.9928207},
        },
        {
            key: "orca",
            icon: '',
            latlng: {lat: 48.5250375, lng: -122.9519777},
        },
    ];

function initMap() {

  $(function() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: initLatLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: true,
      rotateControl: false,
      fullscreenControl: false,
    });

    for(var i = 0; i < icons.length; i++) {
      icons[i].marker = new google.maps.Marker({
        position: icons[i].latlng,
        map: map,
        title: icons[i].key
      });
    }

  });

}

window.initMap = initMap;
