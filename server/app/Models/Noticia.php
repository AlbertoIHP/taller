<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Noticia",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="titular",
 *          description="titular",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="entrada",
 *          description="entrada",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cuerpo",
 *          description="cuerpo",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="imagen",
 *          description="imagen",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="fecha",
 *          description="fecha",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="categorias_id",
 *          description="categorias_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="usuarios_id",
 *          description="usuarios_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Noticia extends Model
{
    use SoftDeletes;

    public $table = 'noticias';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'titular',
        'entrada',
        'cuerpo',
        'imagen',
        'fecha',
        'categorias_id',
        'usuarios_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'titular' => 'string',
        'entrada' => 'string',
        'cuerpo' => 'string',
        'imagen' => 'string',
        'fecha' => 'string',
        'categorias_id' => 'integer',
        'usuarios_id' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function categoria()
    {
        return $this->belongsTo(\App\Models\Categoria::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     **/
    public function usuario()
    {
        return $this->belongsTo(\App\Models\Usuario::class);
    }
}
