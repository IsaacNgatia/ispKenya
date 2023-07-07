<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MikrotikApi;
use App\Http\Controllers\MikrotikConnect;
use App\Http\Controllers\MtConfigController;
use App\Http\Controllers\SmsController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

$config = new \RouterOS\Config([
    'host' => '147.139.34.107',
    'user' => 'admin',
    'pass' => '{@O725542o46}',
    'port' => 1066,
]);
// $client = new \RouterOS\Client($config);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("print-interface", [MikrotikApi::class, 'PrintInterfaces']);
Route::get("print-ppp-profile", [MikrotikApi::class, 'PrintPpoeProfile']);
Route::get("print-hot-user-profile", [MikrotikApi::class, 'PrintHotspotUserProfile']);
Route::get("print-hot-server", [MikrotikApi::class, 'PrintHotspotServer']);
Route::get("mikrotik-connect", [MikrotikConnect::class, 'connect']);
Route::get('print-hotspot', [MikrotikApi::class, 'HostpotDetails']);

Route::get('all-miks', [MtConfigController::class, 'fetchAll']);


Route::get('all-users', [CustomerController::class, 'fetchAllUsers']);


Route::post("add-static-user", [MikrotikApi::class, 'AddSptaticUser']);
Route::post("add-ppoe", [MikrotikApi::class, 'AddPpoeUser']);
Route::post("add-admin", [AdminController::class, 'addNew']);
Route::post("add-ppoe-user", function (Request $request) {
    $firstController = new MikrotikApi();
    $secondController = new CustomerController();

    $firstController->AddPpoeUser($request);
    $secondController->addPpoeUser($request);

    return 'success';
});
Route::post("add-static-user", function (Request $request) {
    $firstController = new MikrotikApi();
    $secondController = new CustomerController();

    $firstController->AddStaticUser($request);
    $secondController->addStaticUser($request);

    return 'success';
});

Route::post("send-message", [SmsController::class, "sendSms"]);

Route::post("add-new-mik", [MtConfigController::class, 'postMik']);

Route::patch("update-mik/{id}", [MtConfigController::class, "updateConfig"]);