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
            "clientKey"=>"99b95c4a-066e-4888-a1e5-b24f47c2df08"
    );

    $pro = Progressively::create($option);
    echo "<pre>";
    print_r($pro->getFlags());
    echo "</pre>";
?>
    </body>
</html>
