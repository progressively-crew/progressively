For documentation, make sure to check [the documentation website](https://progressively-crew.github.io/).

About the sdk for PHP 

Include Progressively.php 
   ``` php 
    $option = array(
                "clientKey"=>"37c15cf9-3625-4516-9080-74931ed639d4"
    );

    $progressively = Progressively::create($option);
    if($progressively->isOn('FlagName')){
        // My code 
    }
  ```
  
Ability to get all your tag

``` php
    $option = array(
                "clientKey"=>"37c15cf9-3625-4516-9080-74931ed639d4"
    );

    $progressively = Progressively::create($option);
    $progressively->getFlags()
```

If the data need to be refresh during the same execution 
``` php
    $option = array(
                "clientKey"=>"37c15cf9-3625-4516-9080-74931ed639d4"
    );

    $progressively = Progressively::create($option);
    if($progressively->isOn('FlagName')){
        // My code 
    }
    // Other stuff
    
    $progressively->refreshFlags()
    
    if($progressively->isOn('FlagName')){
        // My code 
    }
    
    
```