<?php

use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\MovieDatabase;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieFilterController;
use App\Http\Controllers\ProtectRouteController;
use App\Http\Controllers\TodoController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/movies/trending', [MovieDatabase::class, 'trending']);
Route::get('/movies/genres', [MovieDatabase::class, 'get_genres']);
Route::get('/movies/week-trending/{page}', [MovieDatabase::class, 'week_trending']);
Route::get('/movies/trending-daily-persons/{page}', [MovieDatabase::class, 'day_trending_people']);
Route::get('/movies/top-rated/{page}', [MovieDatabase::class, 'top_rated_movies']);
Route::get('/movies/upcoming/{page}', [MovieDatabase::class, 'upcoming_movies']);
Route::get('/movies/playing-now/{page}', [MovieDatabase::class, 'now_playing_movies']);
Route::get('/movies/movie/{id}', [MovieDatabase::class, 'get_movie']);
Route::get('/movies/movie/cast/{id}', [MovieDatabase::class, 'get_cast']);
Route::get('/movies/movie/trailer-list/{id}', [MovieDatabase::class, 'get_list_of_trailers']);
Route::get('/movies/movie/similar-movies/{id}', [MovieDatabase::class, 'get_list_of_similar_movies']);
Route::get('/person/{id}', [MovieDatabase::class, 'get_person_details']);
Route::get('/person/work/{id}', [MovieDatabase::class, 'get_known_for']);
Route::get('/person/socials/{id}', [MovieDatabase::class, 'get_social_links']);
Route::get('/movies/genre', [MovieDatabase::class, 'get_genre']);


Route::get('/movies/filter/category/{genre_id}/{page}', [MovieFilterController::class, 'get_movie_by_genre']);





Route::controller(ProtectRouteController::class)->group(function () {
    Route::post("/todo/save", [TodoController::class, "store"]);
    Route::post("/bookmark/movie/save", [BookmarkController::class, "store_movie"]);
    Route::post("/bookmark/person/save", [BookmarkController::class, "store_person"]);
    Route::post("/bookmarks", [BookmarkController::class, "index"]);


    // Route::post("/user/login", [AuthController::class, "login"]);
    // Route::post("/user/register", [AuthController::class, "register"]);
    // Route::post("/user/logout", [AuthController::class, "logout"]);
});



Route::controller(AuthController::class)->group(function () {
    Route::post("/user/logout", "logout");
    Route::post("/user/login", "login");
    Route::post("/user/register", "register");
});


Route::controller(BookmarkController::class)->group(function () {
    // Route::get("/bookmarks", "index");
    // Route::post("/bookmark/movie/save", "store_movie");
    // Route::post("/bookmark/person/save", "store_person");
    Route::post("/bookmark/delete/{id}", "delete");
    Route::post("/bookmark/{id}", "get_single");
});
