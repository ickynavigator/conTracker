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
  $title = "Home";
  $pageName = "home";
  include("./utils/headtag.php");
  ?>
  <link rel="stylesheet" href="global.css">
</head>

<body>
  <?php include("./utils/navbar.php"); ?>
  <a href="index.php/allCriminals.php"><button>View All Criminals</button></a>
  <a href="index.php/allMissing.php"><button>View All Missing People</button></a>

  <?php include("./utils/footer.php"); ?>
</body>

</html>