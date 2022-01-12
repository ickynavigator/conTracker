<html>
<head>
    <style>
        body {
  font-family: Helvetica;
}
table,
th,
td {
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
  background-color: #008cba;
  border: none;
  color: white;
  padding: 8px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2rem 0;
}
div,
h2,
h1 {
  width: 100%;
  text-align: center;
}
input {
  padding: 8px 25px;
  display: inline-block;
}
a {
  color: #008cba;
  text-decoration: none;
}
    </style>
    <?php
    $title = "Home";
    $pageName = "home";
    include("./utils/headtag.php");
    ?>
</head>
<body>
<?php include("./utils/navbar.php"); ?>
<h1>All Criminals</h1>
<div><form  method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">        
        <input type="text" name="search-name" placeholder="Search by name... " > 
                    <button type="submit" value="search" name="submit" >Search
                        </button> </div>
    
<?php

$api_url = 'https://contracker316.herokuapp.com/v1/api/person';
$json_data = file_get_contents($api_url);
$response_data = json_decode($json_data);
$user_data = $response_data->persons;


if(isset($_POST['submit'])) {
    echo '<h2>Your search results:</h2>';
    echo "<table border='1'>"; 
   echo "<tr>"; 
   echo "<th>"."Name"."</th>";
   echo "<th>"."Gender"."</th>";
   echo "<th>"."Date"."</th>";  
   echo "<th>"."    "."</th>"; 
$name=filter_input(INPUT_POST,'search-name');

foreach ($user_data as $user) {
if($user->nameFirst==ucfirst($name) || $user->nameLast==ucfirst($name))
{
    echo "<tr>"; 
  	echo "<tr>"; 
  echo "<td>" . $user->nameFirst." " .$user->nameLast . "</td>";
   echo "<td>" .$user->sex. "</td>";
     echo "<td>" . $user->createdAt . "</td>"; 
             echo "<td>" ;
     echo "<a href='view.php?id=". $user->_id . " ' >view</a>" ;
     echo "</td>";    
    echo "</tr>"; 
  echo "</table>";  
}

}
}

if(!isset($_POST['submit'])){
    echo "<table border='1'>"; 
   echo "<tr>"; 
   echo "<th>"."Name"."</th>";
   echo "<th>"."Gender"."</th>";
   echo "<th>"."Date"."</th>";  
   echo "<th>"."    "."</th>"; 
foreach ($user_data as $user) {
 echo "<tr>"; 
  	echo "<tr>"; 
  echo "<td>" . $user->nameFirst." " .$user->nameLast . "</td>";
   echo "<td>" .$user->sex. "</td>";
     echo "<td>" . $user->createdAt . "</td>"; 
             echo "<td>" ;
     echo "<a href='view.php?id=". $user->_id . " ' >view</a>" ;
     echo "</td>";    
    echo "</tr>"; 
   
}
echo "</table>"; 
}
 ?>

 <?php
    include("./utils/footer.php");
    ?>
 </body>
</html>