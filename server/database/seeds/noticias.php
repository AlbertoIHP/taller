<?php

use Illuminate\Database\Seeder;

class noticias extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('noticias')->insert([
        	'titular' => 'Universidad Catolica en busqueda de talentos',
        	'entrada' => 'El mejor equipo de Chile busca pequeños futbolistas',
        	'cuerpo' => 'La universidad catolica esta en busca de pequeños futbolistas para el equipo juvenil, para esto ha optado por buscar en establecimientos peculiares como el colegio donde estudio Adrian Herrera. Uno de los peores futbolistas de la historia de Universidad Catolica. Esto Principalmente a su identidad de genero, luego de que en 2007 se declarara homosexual mediaticamente. ',
        	'imagen' => 'http://www.cruzados.cl/wp-content/uploads/2016/07/Escuela-de-Futbol-UC-feature-ESCUELA.jpg',
        	'fecha' => '12/12/2012',
        	'categorias_id' => 1,
        	'usuarios_id' => 1
        ]);
    }
}
