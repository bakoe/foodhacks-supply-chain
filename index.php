<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Titel</title>
        <script src="jquery/dist/jquery-2.2.2.js"></script>
        <script src="semantic/dist/semantic.js"></script>
		<script src='https://api.tiles.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
        <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.css">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>
    <body>

        <div id="map-container">
            <div id="map"></div>
            <div class="ui items info-overlay">
                <div class="item">
                    <div class="image product-image">
                        <img class="ui fluid image" src="resources/images/apples_400.png" alt="Apples" />
                    </div>
                    <div class="content">
                        <div class="header">Tafeläpfel</div>
                        <div class="meta">
                            Lorem ipsum
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            L.mapbox.accessToken = 'pk.eyJ1IjoiaGFuZGNvZGVkIiwiYSI6ImNpbWoxN2VzdDAwMGt2dW00aHVvOTNnZXMifQ.qlhvpqfP_H8e6E8hxCoCdw';

			var geojson = <?php include('script.php') ?>;

            var map = L.mapbox.map('map', 'mapbox.streets')
                .setView([52.5055829, 13.3932478], 3)
				.featureLayer.setGeoJSON(geojson);

			L.mapbox.styleLayer('mapbox://styles/handcoded/cimj399zn00a9cem33b5cubif').addTo(map);
        </script>
    </body>
</html>
