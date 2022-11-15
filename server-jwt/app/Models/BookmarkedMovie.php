<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookmarkedMovie extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        "media_type",
        'name',
        'poster_path',
        "release_date",
        "vote_average",
        "genre_ids",
        "user_id"

    ];
}
