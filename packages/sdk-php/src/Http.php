<?php

namespace Progressively;

class Http
{
    public function execute(string $url)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
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
}
