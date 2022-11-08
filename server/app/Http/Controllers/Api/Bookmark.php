<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class Bookmark extends Controller
{
    public function index()
    {

        return response()->json('bookmarks');
    }


    public function edit(Request $request,)
    {


        $request->validate([
            'bookmark_id' => 'required | integer |size:20',
            'name' => 'required',
            'user_email' => 'required',
            'category' => 'required',
        ]);


        $input = $request->all();
        // var_dump($input);
        return response()->json($input, 'bookmarks');
    }
}
