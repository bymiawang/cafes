<?php
$servername = "localhost";
$username = "mingxinw";
$password = "AcadDev_Wang_5516691351";
$dbname = "mingxinw_cafes";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL statement to retrieve data
$sql = "SELECT * FROM cafes";

// Check if any filters are provided
$filters = array();

// Check if filter parameters are provided
if (!empty($_GET)) {
    // Add filters to the SQL query
    if (isset($_GET['cafe'])) {
        $filters[] = "cafe = '" . $_GET['cafe'] . "'";
    }
    // Add other filters here (e.g., milk, size, temperature, rating, length, drink)

    // Combine all filters
    if (!empty($filters)) {
        $sql .= " WHERE " . implode(" AND ", $filters);
    }
}

// Check if sorting parameter is provided
if (isset($_GET['sort_by'])) {
    // Sort by the specified column
    $sort_by = $_GET['sort_by'];
    $order = isset($_GET['order']) && strtoupper($_GET['order']) == 'DESC' ? 'DESC' : 'ASC';
    $sql .= " ORDER BY $sort_by $order";
}

// Execute query
$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Initialize an array to store the retrieved data
    $data = array();

    // Fetch each row from the result set
    while ($row = $result->fetch_assoc()) {
        // Append each row to the data array
        $data[] = $row;
    }

    // Output the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // No rows found
    echo "No data found";
}

// Close the connection
$conn->close();
?>
