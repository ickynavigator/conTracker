<html>

<head>
    <style>
        table,
        th,
        tr {
            text-align: left;
            text-decoration: none;
            border: 1px solid black;
            border-collapse: collapse;
        }

        th,
        tr {
            width: 150px;
            padding: 10px;
            font-size: 1.2em;
            font-weight: normal;
        }

        button {
            background-color: #008CBA;
            border: none;
            color: white;
            padding: 8px 25px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 2rem 0;
        }

        input {
            width: 100%;
            height: 40px;
            margin: 2rem 0;
        }
    </style>
    <?php
    $title = "View Criminal";
    $pageName = "view criminal";
    include("./utils/headtag.php");
    ?>
</head>

<body>
    <?php include("./utils/navbar.php"); ?>
    <a href="allCriminals.php"><button>All Criminals</button></a>

    <?php
    $api_url = 'https://contracker316.herokuapp.com/v1/api/person/' . $_GET['id'];
    $json_data = file_get_contents($api_url);
    $response_data = json_decode($json_data);
    $user_data = $response_data->persons;

    $_GET['id'];
    ?>
    <table class="v">
        <?php foreach ($user_data as $user) {
            if ($user->_id == $_GET['id']) {
                echo "<tr>";
                echo "<th>" . "ID:" . "</th> </tr> <tr> <th>" .  $user->_id . "</th> </tr>";
                echo "<th>" . "Name:" . "</th> </tr> <tr> <th>" .  $user->nameFirst . " " . $user->nameLast . "</th> </tr>";
                echo "<th>" . "Gender:" . "</th> </tr> <tr> <th>" .  $user->sex . "</th> </tr>";
                echo "<th>" . "Date:" . "</th> </tr> <tr> <th>" .  $user->createdAt . "</th> </tr>";
                echo "<th>" . "verified:" . "</th> </tr> <tr> <th> <input type='checkbox' checked>" . "</th> </tr>";
            }
        }
        ?>
    </table>

    <?php include("./utils/footer.php"); ?>
</body>

</html>