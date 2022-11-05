<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Http;
use Termwind\Components\Dd;

class MoviesDatabase extends BaseController
{
    public function trending()
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get("https://api.themoviedb.org/3/trending/all/day?api_key=$api_key");
    }
    public function get_genres()
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get("https://api.themoviedb.org/3/genre/movie/list?api_key=$api_key");
    }
    public function week_trending($page)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get("https://api.themoviedb.org/3/trending/all/week?api_key=$api_key&language=en-US&page=$page");
    }
    public function day_trending_people($page)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        // return Http::get("https://api.themoviedb.org/3/trending/person/week?api_key=$api_key");
        return Http::get("https://api.themoviedb.org/3/trending/person/day?api_key=$api_key&language=en-US&page=$page");
    }
    public function top_rated_movies($page)
    {
        $api_key = env("MOVIES_DB_API_KEY");


        return Http::get("https://api.themoviedb.org/3/movie/top_rated?api_key=$api_key&language=en-US&page=$page");
    }

    public function upcoming_movies($page)
    {
        $api_key = env("MOVIES_DB_API_KEY");


        return Http::get("https://api.themoviedb.org/3/movie/upcoming?api_key=$api_key&language=en-US&page=$page");
    }

    public function now_playing_movies($page)
    {
        $api_key = env("MOVIES_DB_API_KEY");


        return Http::get("https://api.themoviedb.org/3/movie/now_playing?api_key=$api_key&language=en-US&page=$page");
    }

    public function get_movie($id)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get(
            "https://api.themoviedb.org/3/movie/{$id}?api_key=$api_key&language=en-US"
        );
    }
    public function get_cast($id)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get(
            "https://api.themoviedb.org/3/movie/{$id}/credits?api_key=$api_key&language=en-US"

        );
    }
    public function get_list_of_trailers($id)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get(

            "https://api.themoviedb.org/3/movie/{$id}/videos?api_key=$api_key&?type=Trailer&?site=Youtube"

        );
    }
    public function get_list_of_similar_movies($id)
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get(
            "https://api.themoviedb.org/3/movie/{$id}/similar?api_key=$api_key&language=en-US&page=1"


        );
    }
}
