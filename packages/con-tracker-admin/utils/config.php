<?php
function console_log($data)
{
    echo '<script>console.log(' . json_encode($data) . ')</script>';
}
