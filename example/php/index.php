<?php
require './vendor/autoload.php';

use Progressively\Progressively;

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <?php
    $option = array(
        "websocketUrl" => "ws://localhost:4000",
        "apiUrl" => "http://localhost:4000"
    );

    $sdk = Progressively::create("valid-sdk-key", $option);
    $flags = $sdk->loadFlags();

    if ($flags->isActivated('newHomepage')) {
        echo "<p>New variant</p>";
    } else {
        echo "<p>Old variant</p>";
    }
    ?>
</body>

</html>