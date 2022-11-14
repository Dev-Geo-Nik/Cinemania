<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProtectRouteController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
        // $this->middleware('auth:api');
    }
}
