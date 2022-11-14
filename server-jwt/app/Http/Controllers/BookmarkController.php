<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    use HttpResponses;


    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $bookmarks = Bookmark::all();
        // return response()->json($bookmarks, "Those are the bookmarks");
        return $bookmarks;
    }


    public function store(Request $request)
    {
        $request->validate([
            'bookmark_id' => 'required',
            'name' => 'required',
            'category' => 'required',
            'user_email' => 'required',
        ]);


        if (Bookmark::where("bookmark_id", 1)->first()) {
            $deleted = Bookmark::where('bookmark_id', 1)->delete();
            return $this->Success($deleted, "Bookmark delete successfully.");
        } else {
            $bookmark = Bookmark::create($request->post());
            return $this->Success($bookmark, "Bookmark created successfully.");
        }

        return $this->error([], "something went wrong when creating", 404);
    }
    public function delete($id)
    {
        $deleteProcess = Bookmark::where("bookmark_id", $id)->delete();

        if ($deleteProcess) {
            return $this->Success($deleteProcess, "Bookmark delete successfully.");
        } else {
            return $this->error([], "something went wrong when deleting", 404);
        }
    }
}
