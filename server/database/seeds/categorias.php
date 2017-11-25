<?php

use Illuminate\Database\Seeder;

class categorias extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categorias')->insert([
        	'descripcion' => 'Deportes'
        ]);
        DB::table('categorias')->insert([
        	'descripcion' => 'Crimen'
        ]);
        DB::table('categorias')->insert([
        	'descripcion' => 'Nacional'
        ]);
        DB::table('categorias')->insert([
        	'descripcion' => 'Internacional'
        ]);
    }
}
