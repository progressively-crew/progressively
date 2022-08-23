<?php
require '../vendor/autoload.php';

use Progressively\Progressively;

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Affichage d'un Flaq de test</title>
</head>

<body>
<?php
$option = array(
    "fields" => array(
        "idUser" => 12
    )
);

$sdk = Progressively::create("99b95c4a-066e-4888-a1e5-b24f47c2df08", $option);
$flags = $sdk->loadFlags();


echo "<pre>";
var_dump($flags);
echo "</pre>";

if ($sdk->isActivated('test')) {
    echo "<p>Test is active</p>";
} else {
    echo "<p>Non Actif</p>";
}

if (!$flags->testOff) {
    echo "<p>Test non active</p>";
}
?>
</body>

</html>