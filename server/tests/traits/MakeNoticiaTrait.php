<?php

use Faker\Factory as Faker;
use App\Models\Noticia;
use App\Repositories\NoticiaRepository;

trait MakeNoticiaTrait
{
    /**
     * Create fake instance of Noticia and save it in database
     *
     * @param array $noticiaFields
     * @return Noticia
     */
    public function makeNoticia($noticiaFields = [])
    {
        /** @var NoticiaRepository $noticiaRepo */
        $noticiaRepo = App::make(NoticiaRepository::class);
        $theme = $this->fakeNoticiaData($noticiaFields);
        return $noticiaRepo->create($theme);
    }

    /**
     * Get fake instance of Noticia
     *
     * @param array $noticiaFields
     * @return Noticia
     */
    public function fakeNoticia($noticiaFields = [])
    {
        return new Noticia($this->fakeNoticiaData($noticiaFields));
    }

    /**
     * Get fake data of Noticia
     *
     * @param array $postFields
     * @return array
     */
    public function fakeNoticiaData($noticiaFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'titular' => $fake->word,
            'entrada' => $fake->word,
            'cuerpo' => $fake->word,
            'imagen' => $fake->word,
            'fecha' => $fake->word,
            'categorias_id' => $fake->randomDigitNotNull,
            'usuarios_id' => $fake->randomDigitNotNull
        ], $noticiaFields);
    }
}
