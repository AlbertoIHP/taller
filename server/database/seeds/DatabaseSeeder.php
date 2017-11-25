<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(categorias::class);
        $this->call(usuarios::class);
        $this->call(noticias::class);
    }
}
