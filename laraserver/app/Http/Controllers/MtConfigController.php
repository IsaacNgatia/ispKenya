<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use Illuminate\Validation\Rule;

class MtConfigController extends Controller
{
    //
    public function fetchAll()
    {
        $data = DB::select('select * from mt_config');

        return response()->json([
            "data" => $data
        ], 200);
    }

    public function postMik(Request $request)
    {
        // Validate the data
        $validator = $request->validate([
            // 'mt_id' => ['required', 'integer'],
            'reseller_id' => ['nullable', 'string'],
            'mt_user' => ['required', 'string', 'max:255'],
            'mt_pass' => ['required', 'string'],
            'debug' => ['nullable', 'boolean'],
            'attempts' => ['nullable', 'integer', 'min:0'],
            'delay' => ['nullable', 'integer', 'min:0'],
            'timeout' => ['nullable', 'integer', 'min:0'],
            'mt_ip' => ['required', 'ip'],
            'mt_name' => ['required', 'string', 'max:255'],
            'api_port' => ['required', 'integer', 'min:0'],
            'mt_location' => ['nullable', 'string', 'max:255'],
            'mt_mail' => ['nullable', 'email'],
            'mt_tel' => ['nullable', 'string'],
            'mt_gps' => ['nullable', 'string'],
            'isdefault' => ['required', 'string', Rule::in(['Yes', 'No'])],
            'status' => ['required', 'string', Rule::in(['Active', 'Inactive'])],
        ]);


        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 400);
        // }

        // If validation passes, insert the data into the database table
        try {
            DB::table('mt_config')->insert([
                'mt_user' => $request->input('mt_user'),
                'mt_name' => $request->input('mt_name'),
                'mt_pass' => $request->input('mt_pass'),
                'mt_ip' => $request->input('mt_ip'),
                'api_port' => $request->input('api_port'),
                'mt_location' => $request->input('mt_location'),
                'isdefault' => $request->input('isdefault'),
                'status' => $request->input('status'),
                'debug' => $request->input('debug'),
                // Add more columns and corresponding input as needed
            ]);

            return response()->json(['message' => 'Data stored successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to store data'], 500);
        }
    }

    public function updateConfig(Request $request, $id)
    {

        // $id = $request->input('id');
        $mikrotikName = $request->input('mikrotikName');
        $ipAddress = $request->input('ipAddress');
        $username = $request->input('username');
        $password = $request->input('password');
        $apiPort = $request->input('apiPort');
        $location = $request->input('location');

        // Check if the name already exists in the table
        $existingConfig = DB::table('mt_config')->where('mt_name', $mikrotikName)->first();
        if ($existingConfig) {
            return $request;
            // return response()->json(['message' => 'Name already exists. Update not allowed.'], 400);
        } else {

            // Update the table with the new config value
            DB::table('mt_config')->where('mt_id', $id)->update(['mt_name' => $mikrotikName, 'mt_pass' => $password, 'mt_ip' => $ipAddress, 'mt_user' => $username, 'api_port' => $apiPort, 'mt_location' => $location]);

            return response()->json(['message' => 'Config updated successfully.']);
        }
    }

}