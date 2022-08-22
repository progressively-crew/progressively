<?php

namespace Progressively;

use Progressively\Flag;

class Progressively
{
    private $clientKey;
    private $idUser;
    private $options = array();
    private $flags = array();

    private function __construct(array $options = [])
    {
        // Warn if any unknown options are passed
        $knownOptions = ["apiUrl", "websocketUrl", "initialFlags", "clientKey", "idUser"];
        $unknownOptions = array_diff(array_keys($options), $knownOptions);
        if (count($unknownOptions)) {
            trigger_error('Unknown Config options: ' . implode(", ", $unknownOptions), E_USER_NOTICE);
        }
        $this->options["apiUrl"] = (isset($options["apiUrl"]) && !empty($options["apiUrl"])) ? $options["apiUrl"] : "https://api.progressively.app/sdk/";
        $this->options["websocketUrl"] = (isset($options["websocketUrl"]) && !empty($options["websocketUrl"])) ? $options["websocketUrl"] : "wss://api.progressively.app";
        $this->options["initialFlags"] = (isset($options["initialFlags"]) && !empty($options["initialFlags"])) ? $options["initialFlags"] : array();
        $this->setClientKey($options["clientKey"]);
        $this->idUser = (isset($options["idUser"]) && !empty($options["idUser"])) ? $options["idUser"] : "Unknown";
        $this->setFlags();
    }

    public static function create($params = array()): Progressively
    {
        if (!isset($params["clientKey"]) || empty($params["clientKey"])) {
            throw new Exception('Missing inforamation clientKey is required');
        }
        return new Progressively($params);
    }


    private function getFieldsEncode(): string
    {
        return base64_encode(json_encode(array("clientKey" => $this->getClientKey(), "id" => $this->getIdUser())));
    }


    private function callApi(): array
    {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->options["apiUrl"] . $this->getFieldsEncode(),
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
                    die("Connection Failure Unexpected HTTP code: " . $http_code );
            }
        }else{
            die("Connection Failure");
        }
        curl_close($curl);
        return json_decode($response, true);

    }

    public function isOn($tagName): bool
    {
        $result = false;
        foreach ($this->flags as $flag) {
            if ($flag->getName() == $tagName) {
                $result = $flag->getValue();
            }
        }
        return $result;
    }

    /**
     * @return mixed
     */
    private function getClientKey()
    {
        return $this->clientKey;
    }

    /**
     * @param mixed $clientKey
     */
    public function setClientKey($clientKey)
    {
        $this->clientKey = $clientKey;
    }

    /**
     * @return mixed
     */
    private function getOptions()
    {
        return $this->options;
    }

    /**
     * @param mixed $options
     */
    public function setOptions($options)
    {
        $this->options = $options;
    }

    /**
     * @return mixed
     */
    public function getIdUser()
    {
        return $this->idUser;
    }

    /**
     * @return void
     */
    private function setFlags(): void
    {
        $this->flags = array();
        foreach ($this->callApi() as $itemname => $flag) {
            $this->flags[] = new Flag($itemname, $flag);
        }
    }

    /**
     * @return void
     */
    public function refreshFlags(): void
    {
        $this->setFlags();
    }

    /**
     * @return array
     */
    public function getFlags(): array
    {
        return $this->flags;
    }


}