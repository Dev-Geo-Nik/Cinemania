<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\MoviesDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('user/login', [AuthController::class, 'login']);
Route::post('user/register', [AuthController::class, 'register']);



Route::get('/movies/trending', [MoviesDatabase::class, 'trending']);



Route::group(['middleware' => 'cors'], function () {
});

Route::middleware('auth:sanctum')->group(function () {
    // Route::resource('blogs', BlogController::class);
    Route::get('blogs', [BlogController::class, "index"]);
    Route::post('blogs', [BlogController::class, "store"]);
});
