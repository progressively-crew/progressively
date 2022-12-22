# Python SDK

## Installation

In your Python project, run the following:

```sh
$ pip install sdk-progressively
```

## Usage

In your Python code, add the following snippet.

```py
from sdk.progressively import Progressively

sdk = Progressively.create("YOUR_ENVIRONMENT_KEY", "http://localhost:4000")

if (sdk.evaluate("newHomepage")):
	# flag is true, do things
else:
	# flag is false, do things
```

## Options

### fields

Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:

```python
fields = {"email": "john.doe@email.com", "id": 1}
sdk = Progressively.create("YOUR_ENVIRONMENT_KEY", "http://localhost:4000", fields)
```

## Methods

### evaluate

Get the evaluated version of a feature flag (string variant or boolean value).

```py
sdk.evaluate("theFlagKey")
```

### loadFlags

Refresh the flags by hitting the API again.

```py
sdk.loadFlags()
```
