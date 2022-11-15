<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookmarkedPerson extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        "person_id",
        'profile_path',
        'known_for_department',
        "user_id"

    ];
}
