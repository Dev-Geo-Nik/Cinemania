<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\BookmarkedMovie;
use App\Models\BookmarkedPerson;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    use HttpResponses;


    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }



    public function index(Request $request)
    {

        $person_conditions = [
            "user_id" => $request->user_id
        ];
        $movie_conditions = [

            "user_id" => $request->user_id
        ];
        $persons =  BookmarkedPerson::where($person_conditions)->get();
        $movies =  BookmarkedMovie::where($movie_conditions)->get();

        $payload = [
            "persons" => $persons,
            "movies" => $movies
        ];

        return  $this->Success($payload, "Bookmarks.");
    }


    public function store_movie(Request $request)
    {
        $request->validate([
            'movie_id' => 'required',
            'media_type' => 'required',
            'name' => 'required',
            'poster_path' => 'required',
            'release_date' => 'required',
            'vote_average' => 'required',
            'genre_ids' => 'required',
            'user_id' => 'required',
        ]);

        $conditions = [
            "movie_id" => $request->movie_id,
            "user_id" => $request->user_id
        ];


        if (BookmarkedMovie::where($conditions)->first()) {
            $deleted = BookmarkedMovie::where('movie_id', $request->movie_id)->delete();
            return $this->Success($deleted, "Bookmark movie delete successfully.");
        } else {
            $bookmark = BookmarkedMovie::create($request->post());
            return $this->Success($bookmark, "Bookmark movie created successfully.");
        }

        return $this->error([], "something went wrong when creating", 404);
    }

    public function store_person(Request $request)
    {
        $request->validate([
            'person_id' => 'required',
            'name' => 'required',
            'known_for_department' => 'required',
            'user_id' => 'required',
        ]);

        $conditions = [
            "person_id" => $request->person_id,
            "user_id" => $request->user_id
        ];


        if (BookmarkedPerson::where($conditions)->first()) {
            $deleted = BookmarkedPerson::where('person_id', $request->person_id)->delete();
            return $this->Success($deleted, "Bookmark  person delete successfully.");
        } else {
            $bookmark = BookmarkedPerson::create($request->post());
            return $this->Success($bookmark, "Bookmark person created successfully.");
        }

        return $this->error([], "something went wrong when creating", 404);
    }



    public function delete($id)
    {
        // $deleteProcess = Bookmark::where("bookmark_id", $id)->delete();

        // if ($deleteProcess) {
        //     return $this->Success($deleteProcess, "Bookmark delete successfully.");
        // } else {
        //     return $this->error([], "something went wrong when deleting", 404);
        // }
    }
}
