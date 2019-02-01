var map,
    initLatLng = {lat: 48.6075491, lng: -122.8154666},
    icons = [
        {
            key: "ferry",
            icon: 'ferry.png',
            size: [55, 55],
            content: "<span class='kingbasil'>the ferry info</span>",
            latlng: {lat: 48.51, lng: -122.6828207}
        },
        {
            key: "venue",
            icon: 'heart.png',
            size: [35, 35],
            content: "<span class='kingbasil'>the venue info</span>",
            latlng: {lat: 48.641208, lng: -122.9928207}
        },
        {
            key: "orca",
            icon: 'orca-large.png',
            size: [75, 75],
            content: "<span class='kingbasil'>the sights info</span>",
            latlng: {lat: 48.5250375, lng: -122.9519777}
        },
        {
            key: "mountain",
            icon: 'mountain.png',
            size: [65, 65],
            content: "<span class='kingbasil'>the park info</span>",
            latlng: {lat: 48.665, lng: -122.7928207}
        },
    ];

function initMap() {

  $(function() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: initLatLng,
      zoom: 11,
      // mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: false,
      streetViewControl: true,
      rotateControl: false,
      fullscreenControl: false,
      styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
    });

    function animateIn(marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    function animateOut(marker) {
      marker.setAnimation(null);
    }

    function openMarker(marker, content) {
      var infoWindow = new google.maps.InfoWindow({
          content: content
      });
      infoWindow.open(map, marker);
    }

    for(var i = 0; i < icons.length; i++) {
      var image = {
        url: icons[i].icon,
        scaledSize: new google.maps.Size(icons[i].size[0], icons[i].size[1]), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(25, 25) // anchor
      };
      icons[i].marker = new google.maps.Marker({
        position: icons[i].latlng,
        map: map,
        title: icons[i].key,
        icon: image
      });
      icons[i].marker.addListener('mouseover', animateIn.bind(null, icons[i].marker));
      icons[i].marker.addListener('mouseout', animateOut.bind(null, icons[i].marker));
      icons[i].marker.addListener('click', openMarker.bind(null, icons[i].marker, icons[i].content));
    }

  });

}

window.initMap = initMap;
