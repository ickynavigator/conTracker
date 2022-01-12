<?php
function navPrint($currPage, $navArr)
{
    // pageName
    // [...["page Name", "Page Title", "url"]] : navArr
    // [...["DropDown Title", "url"]] : dropArr
    foreach ($navArr as $val) {
        $activeStr = ($currPage == $val[0]) ? ' active" aria-current="page' : '';
        echo <<<EOD
            <li class="nav-item">
                <a class="nav-link ${activeStr}" href="$val[2]">$val[1]</a>
            </li>
        EOD;
    }
}
?>

<nav class="navbar navbar-expand-lg navbar-light bg-body py-3 px-0">
    <div class="container-fluid">
        <a class="navbar-brand" href="./index.php">
            <img src="./images/fox.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
            CONTRACKER
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
            <ul class="nav navbar-nav">
                <?php
                navPrint(
                    $pageName,
                    [
                        ["home", "Home",  "./index"],
                        ["allCriminal", "All Criminals",  "./allCriminals.php"],
                        ["allMissing", "All Missing",  "./allMissing.php"],
                    ]
                );
                ?>
            </ul>
        </div>
    </div>
</nav>
<div class="main-div container-fluid py-3">