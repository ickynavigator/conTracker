<!DOCTYPE html>
<html lang="en">

<head>
  <style>
    body {
      font-family: Helvetica;
    }

    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    th,
    td {
      width: 150px;
      text-align: center;
      padding: 5px;
      font-size: 1.2em;
    }

    table {
      margin-left: auto;
      margin-right: auto;
    }

    button {
      background-color: #008CBA;
      border: none;
      color: white;
      padding: 8px 25px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      margin: 2rem 0;
    }

    div,
    h2 {
      width: 100%;
      text-align: center;
      padding-bottom: 20px;
    }

    input {
      padding: 8px 25px;
      display: inline-block;
    }

    a {
      color: #008CBA;
      text-decoration: none;
    }
  </style>
  <?php
  $title = "Missing People";
  $pageName = "allMissing";
  include("./utils/headtag.php");
  ?>
  <link rel="stylesheet" href="global.css">
</head>

<body>
  <?php include("./utils/navbar.php"); ?>
  <h1>Missing People</h1>
  <div>
    <form method="get" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <input type="text" name="search-name" placeholder="Search by name... ">
      <button type="submit" value="search" name="submit">Search</button>
    </form>
  </div>

  <?php
  $query = (isset($_GET['search'])) ? 'keyword=' . $_GET['search'] : "";
  $page = (isset($_GET['pageNum'])) ? 'pageNumber=' . $_GET['pageNum'] : "";

  if (isset($_GET['page'])) {
    $pageno = $_GET['page'];
  } else {
    $pageno = 1;
  }

  $api_url = 'https://contracker316.herokuapp.com/v1/api/person/missing' . $page . $query;
  $json_data = file_get_contents($api_url);
  $response_data = json_decode($json_data);
  $user_data = $response_data->persons;
  $total_pages = $response_data->pages;

  if (isset($_GET['submit'])) {
    echo '<h2>Your search results:</h2>';
    echo "<table border='1'>";
    echo "<tr>";
    echo "<th>" . "Name" . "</th>";
    echo "<th>" . "Gender" . "</th>";
    echo "<th>" . "Date" . "</th>";
    echo "<th>" . "    " . "</th>";
    $name = filter_input(INPUT_GET, 'search-name');

    foreach ($user_data as $user) {
      echo "<tr>";
      echo "<tr>";
      echo "<td>" . $user->nameFirst . " " . $user->nameLast . "</td>";
      echo "<td>" . $user->sex . "</td>";
      echo "<td>" . $user->createdAt . "</td>";
      echo "<td>";
      echo "<a href='view.php?id=" . $user->_id . " ' >view</a>";
      echo "</td>";
      echo "</tr>";
      echo "</table>";
    }
  }

  if (!isset($_GET['submit'])) {
    echo "<table border='1'>";
    echo "<tr>";
    echo "<th>" . "Name" . "</th>";
    echo "<th>" . "Gender" . "</th>";
    echo "<th>" . "Date" . "</th>";
    echo "<th>" . "    " . "</th>";
    foreach ($user_data as $user) {
      echo "<tr>";
      echo "<tr>";
      echo "<td>" . $user->nameFirst . " " . $user->nameLast . "</td>";
      echo "<td>" . $user->sex . "</td>";
      echo "<td>" . $user->createdAt . "</td>";
      echo "<td>";
      echo "<a href='view.php?id=" . $user->_id . " ' >view</a>";
      echo "</td>";
      echo "</tr>";
    }
    echo "</table>";
  }
  ?>
  <ul class="pagination">
    <li><a href="?page=1">First</a></li>
    <li class="<?php if ($pageno <= 1) {
                  echo 'disabled';
                } ?>">
      <a href="<?php if ($pageno <= 1) {
                  echo '#';
                } else {
                  echo "?page=" . ($pageno - 1);
                } ?>">Prev</a>
    </li>
    <li class="<?php if ($pageno >= $total_pages) {
                  echo 'disabled';
                } ?>">
      <a href="<?php if ($pageno >= $total_pages) {
                  echo '#';
                } else {
                  echo "?page=" . ($pageno + 1);
                } ?>">Next</a>
    </li>
    <li><a href="?page=<?php echo $total_pages; ?>">Last</a></li>
  </ul>

  <?php include("./utils/footer.php"); ?>
</body>

</html>