<?php

use Illuminate\Database\Seeder;

class usuarios extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('usuarios')->insert([
        	'nombre' => 'Alberto Herrera',
        	'email' => 'a.herrera07@ufromail.cl',
        	'password' => bcrypt('bebote34')
        ]);


        DB::table('usuarios')->insert([
        	'nombre' => 'Adrian Herrera',
        	'email' => 'lokilla@ufromail.cl',
        	'password' => bcrypt('lokilla')
        ]);

    }
}
