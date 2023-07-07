<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SendMobiSms;

class CustomerController extends Controller
{
    //
    public function addPpoeUser(Request $request)
    {
        $data = $request->all();
        $fetchedExpiry = Carbon::parse($data['expiry']);
        $expiryDate = $fetchedExpiry->format('Y-m-d');
        ;

        DB::table('customer')->insert([
            'name' => $data['name'],
            'officialname' => $data['officialname'],
            'email' => $data['email'],
            'houseno' => $data['house'],
            'mobileno' => $data['mobile'],
            'upassword' => $data['mobile'],
            'connectiontype' => $data['type'],
            'monthlybill' => $data['monthlybill'],
            'status' => $data['status'],
            'profile' => $data['profile'],
            'service' => $data['service'],
            'expirydate' => $expiryDate,
            'mikrotikid' => $data['mikrotikid'],
            'password' => $data['password'],
            'reference_number' => $data['reference_number'],
        ]);

        SendMobiSms::SendSmsForPpoeUser($data['mobile'], $data['name']);


        return response()->json([
            'status' => 'success'
        ], 200);
    }
    public function addStaticUser(Request $request)
    {
        $data = $request->all();
        DB::table('customer')->insert([
            'name' => $data['name'],
            'officialname' => $data['officialname'],
            'email' => $data['email'],
            'houseno' => $data['house'],
            'mobileno' => $data['mobile'],
            'upassword' => $data['mobile'],
            'connectiontype' => $data['type'],
            'ipaddress' => $data['ipaddress'],
            'targetaddress' => $data['target'],
            'maxdownloadspeed' => $data['maxdownloadspeed'],
            'monthlybill' => $data['monthlybill'],
            'status' => $data['status'],
            'expirydate' => $data['expiry'],
            'mikrotikid' => $data['mikrotikid'],
            // 'password' => $data['password'],
            'reference_number' => $data['reference_number'],
        ]);

        SendMobiSms::SendSmsForStaticUser($data['mobile'], $data['name']);
        return response()->json([
            'status' => 'success'
        ], 200);

    }

    public function fetchAllUsers()
    {
        $data = DB::select('select * from customer');

        return response()->json([
            "data" => $data
        ], 200);
    }
}