<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Noticia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('noticias', function (Blueprint $table) {
        $table->increments('id');
        $table->string('titular');
        $table->string('entrada');
        $table->text('cuerpo');
        $table->string('imagen');
        $table->string('fecha');

        $table->integer('categorias_id')->unsigned()->nullable();
        $table->integer('usuarios_id')->unsigned()->nullable();

        $table->foreign('categorias_id')->references('id')->on('categorias')->onDelete('cascade');
        $table->foreign('usuarios_id')->references('id')->on('usuarios')->onDelete('cascade');



        $table->rememberToken();
        $table->timestamps();
        $table->timestamp('deleted_at')->nullable();
              });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
