<?php

namespace App\Http\Controllers;

// use App\Libraries\RouterosAPI;
use App\Libraries\RouterosAPI;
use \RouterOS\Client;
use \RouterOS\Query;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class MikrotikApi extends Controller
{

    //
    function PrintInterfaces()
    {


        // Initiate client with config object
        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);

        // Create "where" Query object for RouterOS
        $query =
                // (new Query('/ip/hotspot/ip-binding/print'));
            (new Query('/interface/print'));
        // ->where('.id', '*1');
        // $connect = RouterosAPI::connect('147.139.34.107:1066', 'admin', '{@O725542o46}');

        // Send query and read response from RouterOS


        $response = $client->query($query)->read();

        // var_dump($response);
        $connect = (new RouterosAPI())->connect('147.139.34.107:1066', 'admin', '{@O725542o46}');
        if ($connect = true) {
            return response()->json([
                "response" => $response,
                "status" => "success"
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                "Error" => "Not Connected"
            ], 503);
        }

    }
    function PrintPpoeProfile()
    {


        // Initiate client with config object
        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);

        // Create "where" Query object for RouterOS
        $query =
            (new Query('/ppp/profile/print'));
        // ->where('.id', '*1');

        // Send query and read response from RouterOS
        $response = $client->query($query)->read();

        // var_dump($response);
        if ($response) {
            return response()->json([
                "status" => 'connected',
                'data' => $response
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                "status" => "not connected",
            ], 400);
        }


    }

    function PrintHotspotUserProfile()
    {


        // Initiate client with config object
        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);

        // Create "where" Query object for RouterOS
        $query =
                // (new Query('/ip/hotspot/ip-binding/print'));
            (new Query('/ip/hotspot/user/profile/print'));
        // ->where('.id', '*1');

        // Send query and read response from RouterOS
        $response = $client->query($query)->read();

        // var_dump($response);
        // return response()->json($response, Response::HTTP_OK);
        return $response;

    }
    function PrintHotspotServer()
    {


        // Initiate client with config object
        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);

        // Create "where" Query object for RouterOS
        $query =
                // (new Query('/ip/hotspot/ip-binding/print'));
            (new Query('/ip/hotspot/print'));
        // ->where('.id', '*1');

        // Send query and read response from RouterOS
        $response = $client->query($query)->read();

        // var_dump($response);
        // return response()->json($response, Response::HTTP_OK);
        return $response;

    }
    public function HostpotDetails()
    {
        // Execute the first function.
        $data1 = $this->PrintHotspotUserProfile();

        // Execute the second function.
        $data2 = $this->PrintHotspotServer();

        // Return the data from both functions.
        // return [$data1, $data2];
        return response()->json([
            'profile' => $data1,
            'server' => $data2
        ]);

    }

    function AddStaticUser(Request $request)
    {
        $name = $request->input('name'); // Retrieve the value of 'param1' from the POST request
        $target = $request->input('target'); // Retrieve the value of 'param2' from the POST request
        $maxLimit = $request->input('max-limit');

        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);
        $query = (new Query('/queue/simple/add'))
            ->equal('name', $name)
            ->equal('target', $target)
            ->equal('max-limit', $maxLimit)
            ->equal('limit-at', $maxLimit)
            ->equal('disabled', 'no');
        $connect = (new RouterosAPI())->connect('147.139.34.107:1066', 'admin', '{@O725542o46}');
        if ($connect = true) {
            $out = $client->query($query)->read();
            return response()->json([
                'status' => 'success',
            ], 200);
        } else {
            return response()->json([
                "Error" => "Not Connected"
            ], 503);
        }
    }

    function AddPpoeUser(Request $request)
    {
        $name = $request->input('name'); // Retrieve the value of 'param1' from the POST request
        $password = $request->input('password');
        $profile = $request->input('profile');
        $service = $request->input('service');

        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);
        // $connect = new RouterosAPI();
        // $getConnection = $connect->connect('147.139.34.107:1066', 'admin', '{@O725542o46}');
        // $connect = RouterosAPI::connect('147.139.34.107:1066', 'admin', '{@O725542o46}');


        $query = (new Query('/ppp/secret/add'))
            ->equal('name', $name)
            ->equal('password', $password)
            ->equal('profile', $profile)
            ->equal('service', $service)
            ->equal('disabled', 'no');
        // $connect = config('mikrotikGlobal.getConnection');
        // $result = $connect('147.139.34.107', 'admin', '{@O725542o46}', '1066');
        // if ($result = true) {
        //     $out = $client->query($query)->read();
        //     // return $out;
        //     // json_decode('$out');
        //     // ["after" => ["ret" => $ret]] = $out;
        //     // return strpos($ret, '*');
        //     // if ($ret) {
        //     //     return response()->json([
        //     //         'data' => $ret
        //     //     ]);
        //     // } else {
        //     //     return response()->json([
        //     //         'status' => 'error'
        //     //     ]);
        //     // }

        //     return "success";
        // }
        $connect = (new RouterosAPI())->connect('147.139.34.107:1066', 'admin', '{@O725542o46}');
        if ($connect = true) {
            $out = $client->query($query)->read();
            return response()->json([
                'status' => 'success',
            ], 200);
        } else {
            return response()->json([
                "Error" => "Not Connected"
            ], 503);
        }


    }

    function AddHotspotUser(Request $request)
    {
        $name = $request->input('name'); // Retrieve the value of 'param1' from the POST request
        $password = $request->input('password');
        $profile = $request->input('profile');
        $service = $request->input('service');

        $client = new Client([
            'host' => '147.139.34.107',
            'user' => 'admin',
            'pass' => '{@O725542o46}',
            'port' => 1066,
        ]);
        $query = (new Query('/ppp/secret/add'))
            ->equal('name', $name)
            ->equal('password', $password)
            ->equal('profile', $profile)
            ->equal('service', $service)
            ->equal('disabled', 'no');
        $out = $client->query($query)->read();
        $response = json_decode('$out');

        // ['message' => $message] = $response->after;
        ['after' => ['ret' => $ret]] = $response;
        // ['after' => ['message' => $message]] = $response;

        // if ($ret) {
        //     return response()->json([
        //         'status' => 'success',

        //     ]);
        // } else {
        //     return response()->json([
        //         'status' => 'User already exist'
        //     ], 200);
        // }
        return $ret;
    }
}