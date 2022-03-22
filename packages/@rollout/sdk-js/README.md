## Usage

```javascript
import RolloutSdk from "@rollout/sdk-js";

const fields = {
  email: "john.doe@gmail.com",
};

const apiUrl = "http://localhost:4000";

RolloutSdk.init(clientKey, { fields, apiUrl });
```
