<?php

namespace Progressively;

class Progressively
{
    private $options = array();
    private $fields = array();
    private $httpService;

    private function __construct(Http $httpService, array $options = [])
    {
        $this->httpService = $httpService;
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
        return new Progressively(new Http(), $options);
    }

    public function loadFlags()
    {
        $flags =  $this->httpService->execute($this->generateUrl());

        return new Flags($flags);
    }

    private function generateUrl(): string
    {
        $jsonEncodedOpts = json_encode($this->fields);
        $encodedUrlParams = base64_encode($jsonEncodedOpts);

        $url = $this->options["apiUrl"] . $encodedUrlParams;

        return $url;
    }

    private function safeGet($array, $indexName, $defaultValue)
    {
        return (isset($array[$indexName]) && !empty($array[$indexName])) ? $array[$indexName] : $defaultValue;
    }
}
