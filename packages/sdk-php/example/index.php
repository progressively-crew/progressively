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
            "clientKey"=>"4e372f54-970b-4f62-a889-531abf2d152b"
    );

    $pro = Progressively::create($option);
    echo "<pre>";
    print_r($pro->getFlags());
    echo "</pre>";
?>
    </body>
</html>
