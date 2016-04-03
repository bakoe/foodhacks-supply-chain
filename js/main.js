/* http://stackoverflow.com/a/11582513 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

$(document).ready(function() {
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

		myLayer.setGeoJSON(geojson)
			.addTo(map);

		var polyline_options = {
	    	color: '#000000'
		};

		var polyline = L.polyline([], polyline_options).addTo(map);

		myLayer.eachLayer(function(layer) {
			polyline.addLatLng(layer.getLatLng());
		});

		// L.mapbox.styleLayer('mapbox://styles/mapbox/emerald-v8').addTo(map);
	});
});
