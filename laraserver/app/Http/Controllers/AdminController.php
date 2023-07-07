<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    //
    public function addNew(Request $request)
    {
        $data = $request->all();

        DB::table('admin')->insert([
            'adminname' => $data['name'],
            'ausername' => $data['email'],
            'aemail' => $data['email'],
            'apassword' => bcrypt($data['password']),
        ]);

        return response()->json([
            'status' => 'success'
        ], 200);
    }
}