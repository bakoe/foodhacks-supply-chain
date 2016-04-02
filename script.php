<?php
    $host_name  = "db620408925.db.1and1.com";
    $database   = "db620408925";
    $user_name  = "dbo620408925";
    $password   = "Tapeläpfel1";

    // $connect = mysqli_connect($host_name, $user_name, $password, $database);
	$connect = mysqli_connect('127.0.0.1', 'root', '', 'foodhacks');


	if (mysqli_connect_errno()) {
    	echo '<p>Verbindung zum MySQL Server fehlgeschlagen: '.mysqli_connect_error().'</p>';
    	exit();
	}

	if (isset($_GET['pid'])) {
    	$productId = $_GET['pid'];

		if ($stmt = mysqli_prepare($connect, "SELECT * FROM 'locations' WHERE pid=? ORDER BY id ASC")) {
    		mysqli_stmt_bind_param($stmt, "s", $productId);
			mysqli_stmt_bind_result($stmt, $result);
			mysqli_stmt_fetch($stmt);
			mysqli_stmt_close($stmt);

			// creates array of features (points)
			$featureArray = array();
			while($row = mysqli_fetch_array($result)) {
				$featureArray[] = array(
					'type' => 'Feature',
					'geometry' => array(
						'type' => 'Point',
						'coordinates' => array($row['lat'], $row['lon'])
					),
					'properties' => array(
						'title' => $row['role'],
						'description' => $row['address'],
						'marker-color' => '#000000',
						'marker-size' => 'large',
						'marker-symbol' => 'monument'
					)
				);
			}

			// creates full array (feature colletction)
			$fullArray = array(
				'type' => 'FeatureCollection',
				'features' => $featureArray
			);

			echo json_encode($fullArray, JSON_FORCE_OBJECT);

		} else {
			// echo new array();
		}

	} else {
    	// echo new array()
	}

	mysqli_close($connect);
?>
