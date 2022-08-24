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
        $this->options = $options;
    }


    public static function create($clientKey, $options = array(), Http $httpService = new Http()): Progressively
    {
        $actualOptions = array();
        $actualOptions["apiUrl"] = Progressively::safeGet($options, "apiUrl", "https://api.progressively.app") . '/sdk/';
        $actualOptions["websocketUrl"] = Progressively::safeGet($options, "websocketUrl", "wss://api.progressively.app");
        $actualOptions["initialFlags"] = Progressively::safeGet($options, "initialFlags", array());
        $actualOptions["fields"] = Progressively::safeGet($options, "fields ", array());
        $actualOptions["fields"]["clientKey"] = $clientKey;


        return new Progressively($httpService, $actualOptions);
    }

    private static function safeGet($array, $indexName, $defaultValue)
    {
        return (isset($array[$indexName]) && !empty($array[$indexName])) ? $array[$indexName] : $defaultValue;
    }

    public function loadFlags()
    {
        $flags =  $this->httpService->execute($this->generateUrl());

        return new Flags($flags);
    }

    private function generateUrl(): string
    {
        $jsonEncodedOpts = json_encode($this->options["fields"]);
        $encodedUrlParams = base64_encode($jsonEncodedOpts);

        $url = $this->options["apiUrl"] . $encodedUrlParams;

        return $url;
    }
}
