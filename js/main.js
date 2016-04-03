/* http://stackoverflow.com/a/11582513 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

/* http://stackoverflow.com/a/3150139 */
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

function expandInfoAccordion() {
    if ($(document).width() >= 768) {
        $('.meta.ui.accordion .content').addClass('active');
        $('.ui.accordion').accordion('refresh');
    }
}

$(document).ready(function() {
    $('.ui.accordion')
        .accordion();

    expandInfoAccordion();

    addEvent(window, "resize", function(event) {
        expandInfoAccordion();
    });

    L.mapbox.accessToken = 'pk.eyJ1IjoiaGFuZGNvZGVkIiwiYSI6ImNpbWoxN2VzdDAwMGt2dW00aHVvOTNnZXMifQ.qlhvpqfP_H8e6E8hxCoCdw';

    var geojson = [];
    var productId = getURLParameter('productId');

    $.getJSON('data.json', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == productId) {
                geojson = data[i].geojson;
            }
        }
    }).done(function() {
        var map = L.mapbox.map('map', 'mapbox.streets')
            .setView([52.5055829, 13.3932478], 4);

        var myLayer = L.mapbox.featureLayer();

		myLayer.on('layeradd', function(e) {
		    var marker = e.layer,
		        feature = marker.feature;

		    marker.setIcon(L.icon(feature.properties.icon));
		});

		myLayer.setGeoJSON(geojson)
			.addTo(map);

        var polyline_options = {
            color: '#000000'
        };

        var polyline = L.polyline([], polyline_options).addTo(map);

        var bounds = myLayer.getBounds();

        map.fitBounds([[
                bounds._northEast.lat * 1.05,
                bounds._northEast.lng * 1.05
            ], [
                bounds._southWest.lat * 0.95,
                bounds._southWest.lng * 0.98
            ]]);

        myLayer.eachLayer(function(layer) {
            polyline.addLatLng(layer.getLatLng());
        });

        L.mapbox.styleLayer('mapbox://styles/handcoded/cimj399zn00a9cem33b5cubif').addTo(map);    });
});
