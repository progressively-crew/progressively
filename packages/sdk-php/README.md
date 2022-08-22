For documentation, make sure to check [the documentation website](https://progressively-crew.github.io/).

## Sdk for PHP

### Prérequis & Installation``

```sh
$ composer install
```

### Test version

Start the project running the following command:

```sh
$ docker-compose up -d
```

Run the `./example` folder in PHP:

```sh
# inside ./example
$ php -S localhost:8000
```

And access to the page /example/index.php

### Example

```php

 require '../vendor/autoload.php';
 use Progressively\Progressively;

 $option = array(
             "clientKey"=>"37c15cf9-3625-4516-9080-74931ed639d4"
 );

 $progressively = Progressively::create($option);
 if($progressively->isActivated('FlagName')){
     // My code
 }
```

#### Ability to get all your tag

```php
    $option = array(
                "clientKey"=>"37c15cf9-3625-4516-9080-74931ed639d4"
    );

    $progressively = Progressively::create($option);
    $progressively->getFlags()
```

#### If the data need to be refresh during the same execution

```php
    $option = array(
                "clientKey"=>"37c15cf9-3625-4516-9080-74931ed639d4"
    );

    $progressively = Progressively::create($option);
    if($progressively->isActivated('FlagName')){
        // My code
    }
    // Other stuff

    $progressively->refreshFlags()

    if($progressively->isActivated('FlagName')){
        // My code
    }


```
