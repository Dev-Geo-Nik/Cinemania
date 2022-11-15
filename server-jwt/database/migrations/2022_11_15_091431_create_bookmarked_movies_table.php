<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookmarked_movies', function (Blueprint $table) {
            $table->id();
            $table->integer('movie_id');
            $table->string('media_type');
            $table->string('name');
            $table->string('poster_path');
            $table->string('release_date');
            $table->float('vote_average');
            $table->json('genre_ids');
            $table->integer('user_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookmarked_movies');
    }
};
