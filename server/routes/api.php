<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['cors']], function(){
	Route::post('/login','AuthController@userAuth');
	Route::post('/v1/usuarios', 'UsuarioAPIController@store');

});


Route::group(['middleware' => ['cors','jwt.auth']], function(){

	Route::resource('v1/categorias', 'CategoriaAPIController');

	Route::resource('v1/usuarios', 'UsuarioAPIController');

	Route::resource('v1/noticias', 'NoticiaAPIController');
});


