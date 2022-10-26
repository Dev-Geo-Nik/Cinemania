<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Http;

class MoviesDatabase extends BaseController
{
    public function trending()
    {
        $api_key = env("MOVIES_DB_API_KEY");

        return Http::get("https://api.themoviedb.org/3/trending/all/day?api_key=$api_key");
    }
}
