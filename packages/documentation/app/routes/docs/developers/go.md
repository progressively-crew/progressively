# Go SDK

## Installation

In your Go project, run the following:

```sh
$ go get github.com/progressively-crew/sdk-go@latest
```

## Usage

In your Go code, add the following snippet.

```go
    sdk := progressively.SdkBuilder("valid-sdk-key", "BACKEND_URL").Build()

    if sdk.Evaluate("newHomepage") == true {
		  // do things when flag is activated
	  } else {
		  // do things when flag is NOT activated
	  }
```

## Methods

### SdkBuilder

#### AddField

Fields is an option that allows to pass data about your users to create targeting strategies. For instance, you can set an email field, and in Progressively's dashboard, you can create a rule that only targets people that use an expected domain:

```go
$ sdk := progressively.SdkBuilder("valid-sdk-key", "BACKEND_URL").AddField("email", "marvin.frachet@something.com").Build()
```

#### Build

Fetches the flags and create an SDK instance with them.

```go
sdk := progressively.SdkBuilder("valid-sdk-key", "BACKEND_URL").Build()
```

### Sdk

#### Evaluate

Get the evaluated version of a feature flag (string variant or boolean value).

```go
sdk.Evaluate("theFlagKey")
```

#### LoadFlags

Refresh the flags by hitting the API again.

```go
sdk.LoadFlags()
```
