<?php

namespace App\Repositories;

use App\Models\Noticia;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class NoticiaRepository
 * @package App\Repositories
 * @version November 24, 2017, 6:03 pm UTC
 *
 * @method Noticia findWithoutFail($id, $columns = ['*'])
 * @method Noticia find($id, $columns = ['*'])
 * @method Noticia first($columns = ['*'])
*/
class NoticiaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'titular',
        'entrada',
        'cuerpo',
        'imagen',
        'fecha',
        'categorias_id',
        'usuarios_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Noticia::class;
    }
}
