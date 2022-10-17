# PHP SDK

## Installation

In your PHP project, add the following line to your composer.json file:

```json
{
  "require": {
    "progressively/sdk-php": "dev-fix-packagist"
  }
}
```

And then run:

```bash
$ composer install
```

## Usage

In your PHP, add the following snippet.

```php
    $option = array(
        "apiUrl" => "your url server"
    );

    $sdk = Progressively::create("YOUR_ENVIRONMENT_KEY", $option);
```

## Options

### fields

Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:

```php
     $option = array(
        "apiUrl" => "your url server"
        "fields" => array(
            "email": "marvin.frachet@something.com"
        )
    );

    $sdk = Progressively::create("YOUR_ENVIRONMENT_KEY", $option);
```

## Methods

### loadFlags

Loads the flag on the server.

```php
$sdk->loadFlags();
```

### isActivated

Check if a given flag is activated.

```php
$sdk->isActivated('theFlagKey');
```
