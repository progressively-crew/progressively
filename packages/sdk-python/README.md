For documentation, make sure to check [the documentation website](https://progressively-crew.github.io/).

## Sdk for Python 

### Test version 
```  
docker-compose up -d
```
And access to the page /example/index.php

### Example
   ``` python 
   
    from src.Progressively import Progressively
   
    options = {"fields": {"idUser":12}}
    sdk = Progressively("99b95c4a-066e-4888-a1e5-b24f47c2df08",options)
    sdk.loadFlags()

    if sdk->isActivate('FlagName'):
        // My code 
    
  ```
  
#### Ability to get all your tag

``` python
    options = {"fields": {"idUser":12}}
    sdk = Progressively("99b95c4a-066e-4888-a1e5-b24f47c2df08",options)
    flags = sdk.loadFlags()
```

#### If the data need to be refresh during the same execution 
``` python
    options = {"fields": {"idUser":12}}
    sdk = Progressively("99b95c4a-066e-4888-a1e5-b24f47c2df08",options)
    sdk.loadFlags()

    if sdk->isActivate('FlagName'):
        // My code 
    // Other stuff
    
    sdk.loadFlags()
    
    if sdk->isActivate('FlagName'):
        // My code 
    
```


#### Send to flask template

app.py
``` python
    options = {"fields": {"idUser":12}}
    sdk = Progressively("99b95c4a-066e-4888-a1e5-b24f47c2df08",options)
    flags = sdk.loadFlags()

    return render_template("index.html", flags=flags)
    
```

template.html 
``` html
    {% if flags['test'] %}
        <h1>
            My Test is visible   
        </h1>
    {% endif %}
```