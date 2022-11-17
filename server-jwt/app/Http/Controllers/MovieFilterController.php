<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MovieFilterController extends Controller
{
    //


    public function get_movie_by_genre($genre_id, $page)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get(
            "https://api.themoviedb.org/3/discover/movie?api_key=$api_key&page=$page&with_genres=$genre_id"

        );
    }
}
