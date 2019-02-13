var map,
    initLatLng = {lat: 48.6075491, lng: -122.8154666},
    icons = [
        {
            key: "ferry",
            icon: 'ferry.png',
            size: [55, 55],
            content: `
            <div class="center-text">
                <h3 class="two-em blue">Ferry Terminal:</h3>
                <p class="minion one-five-em blue">The only way to reach Orcas Island is by ferry, via Anacortes if you’re coming from Portland or Seattle.</p>
            </div>
            `,
            latlng: {lat: 48.51, lng: -122.6828207}
        },
        {
            key: "venue",
            icon: 'heart.png',
            size: [35, 35],
            content: `
            <div class="center-text">
                <h3 class="two-em darker-green">Pebble Cove Farm:</h3>
                <p class="minion one-five-em darker-green">The venue! Say hi to the goats and pigs!</p>
            </div>
            `,
            latlng: {lat: 48.641208, lng: -122.9928207}
        },
        {
            key: "orca",
            icon: 'orca-large.png',
            size: [75, 75],
            content: `
            <div class="center-text">
                <h3 class="two-em darker-green">Whale watching:</h3>
                <p class="minion one-five-em darker-green">The San Juan Islands are a home to a resident orca pod, called J pod, that you might be lucky enough to spot from the shore or on a whale watching trip with a local outfitter!</p>
            </div>
            `,
            latlng: {lat: 48.5250375, lng: -122.9519777}
        },
        {
            key: "mountain",
            icon: 'mountain.png',
            size: [65, 65],
            content: `
            <div class="center-text">
                <h3 class="two-em darker-green">Moran State Park:</h3>
                <p class="minion one-five-em darker-green">If you’re hoping to camp, head here. Don’t miss the great views from Mount Constitution!</p>
            </div>
            `,
            latlng: {lat: 48.665, lng: -122.7928207}
        },
        {
            key: "friday-harbor",
            icon: 'hotel.png',
            size: [55, 55],
            content: `
            <div class="center-text">
                <h3 class="two-em blue">Friday Harbor:</h3>
                <p class="minion one-five-em blue">If you have time, Friday Harbor on neighboring San Juan Island has lots of fun restaurants, shops, and scenery to explore. You can also choose to stay there and take a ferry to Orcas Island for the wedding.</p>
            </div>
            `,
            latlng: {lat: 48.550, lng: -123.04}
        },
        {
            key: "deer-harbor",
            icon: 'hotel.png',
            size: [55, 55],
            content: `
            <div class="center-text">
                <h3 class="two-em blue">Deer Harbor:</h3>
                <p class="minion one-five-em blue">Small marina village nearby Pebble Cove Farm (the venue). A great place to look for lodging.</p>
            </div>
            `,
            latlng: {lat: 48.615, lng: -123.015}
        },
        {
            key: "eastsound",
            icon: 'rural.png',
            size: [55, 55],
            content: `
                <div class="center-text">
                    <h3 class="two-em blue">Eastsound:</h3>
                    <p class="minion one-five-em blue">The hub of Orcas Island. Shopping and dining can be found here.</p>
                </div>
            `,
            latlng: {lat: 48.715, lng: -122.9}
        },
    ];

function initMap() {

  $(function() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: initLatLng,
      zoom: (window.screen.width > 550) ? 11 : 9,
      // mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: false,
      streetViewControl: true,
      rotateControl: false,
      fullscreenControl: false,
      styles:[{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#bec396"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ec9d7d"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#bb85db"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#bed8e7"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}]
      // styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
    });

    function animateIn(marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    function animateOut(marker) {
      marker.setAnimation(null);
    }

    function openMarker(marker, content) {
      var infoWindow = new google.maps.InfoWindow({
          content: content,
          maxWidth: 200
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
