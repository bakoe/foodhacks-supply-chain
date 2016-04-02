/* http://stackoverflow.com/a/11582513 */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

$(document).ready(function() {
	L.mapbox.accessToken = 'pk.eyJ1IjoiaGFuZGNvZGVkIiwiYSI6ImNpbWoxN2VzdDAwMGt2dW00aHVvOTNnZXMifQ.qlhvpqfP_H8e6E8hxCoCdw';

	var geojson = [];
	var productid = getURLParameter('productid');

	$.getJSON('data.json', function(data) {
		for (var i = 0; i < data.length; i++) {
			var id = data[i].id;
			if (id == productid) {
				geojson = data[i].geojson;
			}
		}
	}).done(function() {
		var map = L.mapbox.map('map', 'mapbox.streets')
	    .setView([52.5055829, 13.3932478], 3)
		.featureLayer.setGeoJSON(geojson);

		L.mapbox.styleLayer('mapbox://styles/handcoded/cimj399zn00a9cem33b5cubif').addTo(map);
	});
});