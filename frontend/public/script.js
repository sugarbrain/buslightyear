const markers = {};
let userBus;

let userMarker;
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -8.05389,
            lng: -34.88111
        },
        zoom: 14
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeUser(event.latLng);
    });
}

function placeUser(location) {
    if (userMarker) {
        userMarker.setPosition(location);
    } else {
        userMarker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

function initWebSocket() {
    const connection = new WebSocket('ws://0.0.0.0:3005/bus_ping');
    connection.onopen = function (msg) {
        console.log('Connection open!');
    }
    connection.onmessage = function (msg) {
        handlePing(msg);
    };
}

function handlePing(msg) {
    console.log(msg.data);
    const ping = JSON.parse(msg.data);

    if (markers[ping.Unidad]) {
        const latlng = new google.maps.LatLng(ping.CoordX, ping.CoordY);
        markers[ping.Unidad].marker.setPosition(latlng);

        if (userBus && ping.Unidad === Number(userBus)) {
            const user = {
                lat: userMarker.position.lat(),
                lng: userMarker.position.lng()
            }
            const distance = getDistanceFromLatLonInKm(user.lat, user.lng, ping.CoordX, ping.CoordY);
            console.log('DISTANCIA: >>>>  ', distance);
            if (distance <= 2) {
                alertUser(userBus);
            }
        }

        markers[ping.Unidad].counter += 1;
        console.log('substituiu');
    } else {
        ping.color = (Math.random() * 0xFFFFFF << 0).toString(16);
        ping.marker = addBus(ping, ping.color);
        markers[ping.Unidad] = ping;
        markers[ping.Unidad].counter = 0;
        console.log('criou')
    }
}

function addBus(ping, color) {
    const pinImage = new google.maps.MarkerImage("https://chart.googleapis.com/chart?chst=d_simple_text_icon_left&chld=|14|000|bus|24|FFF|" + color,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
    const pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
    const latlng = new google.maps.LatLng(ping.CoordX, ping.CoordY);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: pinImage,
        shadow: pinShadow,
        label: {
            text: ping['Unidad'].toString(),
            color: "#eb3a44",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "white",
            padding: "3px",
            border: "1px solid black"
        }
    });
    return marker;
}

document.getElementById('input-user-bus').onchange = (e) => {
    userBus = document.getElementById('input-user-bus').value;
    document.getElementById('message').innerText = "Aguardando chegada do ônibus nº " + userBus;
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function alertUser(bus) {
    alert(`Atenção! O ônibus ${bus} está perto de sua localização :)`);
}

initWebSocket();