<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\Bookmark;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\MoviesDatabase;


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
Route::get('/movies/genres', [MoviesDatabase::class, 'get_genres']);
Route::get('/movies/week-trending/{page}', [MoviesDatabase::class, 'week_trending']);
Route::get('/movies/trending-daily-persons/{page}', [MoviesDatabase::class, 'day_trending_people']);
Route::get('/movies/top-rated/{page}', [MoviesDatabase::class, 'top_rated_movies']);
Route::get('/movies/upcoming/{page}', [MoviesDatabase::class, 'upcoming_movies']);
Route::get('/movies/playing-now/{page}', [MoviesDatabase::class, 'now_playing_movies']);
Route::get('/movies/movie/{id}', [MoviesDatabase::class, 'get_movie']);
Route::get('/movies/movie/cast/{id}', [MoviesDatabase::class, 'get_cast']);
Route::get('/movies/movie/trailer-list/{id}', [MoviesDatabase::class, 'get_list_of_trailers']);
Route::get('/movies/movie/similar-movies/{id}', [MoviesDatabase::class, 'get_list_of_similar_movies']);
Route::get('/person/{id}', [MoviesDatabase::class, 'get_person_details']);
Route::get('/person/work/{id}', [MoviesDatabase::class, 'get_known_for']);
Route::get('/person/socials/{id}', [MoviesDatabase::class, 'get_social_links']);



Route::group(['middleware' => 'cors'], function () {
});

Route::middleware('auth:sanctum')->group(function () {
    // Route::resource('blogs', BlogController::class);
    Route::get('/bookmarks', [Bookmark::class, "index"]);
    Route::post('/bookmarks/edit', [Bookmark::class, "edit"]);


    Route::get('/blogs', [BlogController::class, "index"]);
    Route::post('/blogs', [BlogController::class, "store"]);
    Route::post('/logout', [MoviesDatabase::class, "logout"]);
});
