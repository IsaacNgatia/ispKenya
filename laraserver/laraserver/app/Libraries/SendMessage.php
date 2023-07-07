<?php

use GuzzleHttp\Client;

class SendMobiSms
{
    public static function SendSmsForStaticUser($mobile, $name)
    {
        $client = new Client();
        $headers = [
            'h_api_key' => '6d7f23724b92fc1ab5ce718c1aa8f54f6ca87511bee5c7e401e60d9fd8d367d1',
            'Content-Type' => 'application/json'
        ];
        $message = "Hello " . $name . ". Your account creation has been successful and your login credetials are: \nusername: " . $mobile . "\npassword: " . $mobile . "\nFollow this link to login: https://laravel.com/docs/10.x";
        $body = json_encode([
            "sender_name" => "23107",
            "mobile" => $mobile,
            "service_id" => 0,
            "message" => $message
        ]);
        $response = $client->request('POST', 'https://api.mobitechtechnologies.com/sms/sendsms', [
            'headers' => $headers,
            'body' => $body
        ]);
        return $response->getBody();
    }
    public static function SendSmsForPpoeUser($mobile, $name)
    {
        $client = new Client();
        $headers = [
            'h_api_key' => '6d7f23724b92fc1ab5ce718c1aa8f54f6ca87511bee5c7e401e60d9fd8d367d1',
            'Content-Type' => 'application/json'
        ];
        // $body = '{
//   "sender_name": "23107",
//   "mobile": "0790008915",
//   "service_id": 0,
//   "message": "hello Isaac33"
// }';
        $message = "Hello " . $name . ". Your account creation has been successful and your login credetials are: \nusername: " . $mobile . "\npassword: " . $mobile . "\nFollow this link to login: https://laravel.com/docs/10.x";
        $body = json_encode([
            "sender_name" => "23107",
            "mobile" => $mobile,
            "service_id" => 0,
            "message" => $message
        ]);
        $response = $client->request('POST', 'https://api.mobitechtechnologies.com/sms/sendsms', [
            'headers' => $headers,
            'body' => $body
        ]);
        return $response->getBody();
    }

}