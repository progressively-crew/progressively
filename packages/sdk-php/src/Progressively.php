<?php

namespace Progressively;

class Progressively
{
    private $options = array();
    private $fields = array();

    private function __construct(array $options = [])
    {
        // Warn if any unknown options are passed
        $knownOptions = ["apiUrl", "websocketUrl", "fields", "initialFlags", "clientKey"];
        $unknownOptions = array_diff(array_keys($options), $knownOptions);

        if (count($unknownOptions)) {
            trigger_error('Unknown Config options: ' . implode(", ", $unknownOptions), E_USER_NOTICE);
        }

        $this->options["apiUrl"] = $this->safeGet($options, "apiUrl", "https://api.progressively.app") . '/sdk/';
        $this->options["websocketUrl"] = $this->safeGet($options, "websocketUrl", "wss://api.progressively.app");
        $this->options["initialFlags"] = $this->safeGet($options, "initialFlags", array());
        $this->fields = $this->safeGet($options, "fields ", array());
        $this->fields["clientKey"] = $options["clientKey"];
    }


    public static function create($clientKey, $options = array()): Progressively
    {
        $options["clientKey"] = $clientKey;
        return new Progressively($options);
    }


    private function normalizeOptions(): string
    {
        $jsonEncodedOpts = json_encode($this->fields);
        return base64_encode($jsonEncodedOpts);
    }


    private function callApi()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->options["apiUrl"] . $this->normalizeOptions(),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        if (!curl_errno($curl)) {
            switch ($http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE)) {
                case 200:
                    if (!$response) {
                        die("Connection Failure");
                    }
                    break;
                default:
                    die("Connection Failure Unexpected HTTP code: " . $http_code);
            }
        } else {
            die("Connection Failure");
        }

        curl_close($curl);

        return json_decode($response, true);
    }


    public function loadFlags()
    {
        $flags = $this->callApi();

        return new Flags($flags);
    }


    private function safeGet($array, $indexName, $defaultValue)
    {
        return (isset($array[$indexName]) && !empty($array[$indexName])) ? $array[$indexName] : $defaultValue;
    }
}
