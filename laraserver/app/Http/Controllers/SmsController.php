<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class SmsController extends Controller
{
    //
    public function sendSms(Request $request)
    {
        $message = $request->input('message');
        $mobile = $request->input('mobile');
        $client = new Client();
        $headers = [
            'h_api_key' => '6d7f23724b92fc1ab5ce718c1aa8f54f6ca87511bee5c7e401e60d9fd8d367d1',
            'Content-Type' => 'application/json'
        ];
        // $body = '{
        //  "sender_name": "23107",
        //  "mobile": $data['mobile'],
        //   "service_id": 0,
        //  "message": "hello Miles"
        // }';
        $body = json_encode([
            'sender_name' => '23107',
            'mobile' => $mobile,
            'service_id' => 0,
            'message' => $message
        ]);
        $response = $client->request('POST', 'https://api.mobitechtechnologies.com/sms/sendsms', [
            'headers' => $headers,
            'body' => $body
        ]);
        return $response->getBody();

    }
}