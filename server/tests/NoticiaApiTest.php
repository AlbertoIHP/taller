<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class NoticiaApiTest extends TestCase
{
    use MakeNoticiaTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateNoticia()
    {
        $noticia = $this->fakeNoticiaData();
        $this->json('POST', '/api/v1/noticias', $noticia);

        $this->assertApiResponse($noticia);
    }

    /**
     * @test
     */
    public function testReadNoticia()
    {
        $noticia = $this->makeNoticia();
        $this->json('GET', '/api/v1/noticias/'.$noticia->id);

        $this->assertApiResponse($noticia->toArray());
    }

    /**
     * @test
     */
    public function testUpdateNoticia()
    {
        $noticia = $this->makeNoticia();
        $editedNoticia = $this->fakeNoticiaData();

        $this->json('PUT', '/api/v1/noticias/'.$noticia->id, $editedNoticia);

        $this->assertApiResponse($editedNoticia);
    }

    /**
     * @test
     */
    public function testDeleteNoticia()
    {
        $noticia = $this->makeNoticia();
        $this->json('DELETE', '/api/v1/noticias/'.$noticia->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/noticias/'.$noticia->id);

        $this->assertResponseStatus(404);
    }
}
