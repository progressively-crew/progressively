import base64, http.client, json
from json import JSONEncoder
from tokenize import String

class Progressively:
    def __init__(self, clientKey, options):
        self.options = dict()
        self.flags = dict()
        self.options["apiRoot"] = "api.progressively.app"
        self.fields = options["fields"]
        self.fields["clientKey"] =  clientKey
        
    def normalizeOptions(self):
        jsonOptions = json.dumps(self.fields)
        jsonOptions_bytes = jsonOptions.encode('ascii')
        base64_bytes = base64.b64encode(jsonOptions_bytes)
        base64_jsonOptions = base64_bytes.decode('ascii')
        return base64_jsonOptions

    def sdk(self):
        conn = http.client.HTTPSConnection(self.options['apiRoot'])
        url =  "/sdk/" + self.normalizeOptions()
        payload=''
        headers = {}
        conn.request("GET", url, payload, headers);
        res = conn.getresponse()
        data = res.read()
        return data.decode("utf-8")
    
    def isActivate(self, flagKey):
        return self.flags[flagKey]

    def loadFlags(self):
        self.flags = json.loads(self.sdk())
        return self.flags

    def safe_get(self, collection, key, default):
        try:
            return collection.get(key, default)
        except TypeError:
            pass
        try:
            return collection[key]
        except (IndexError, TypeError):
            pass

        return default