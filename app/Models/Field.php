<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $fillable = [
        'user_id',
        'farm_id',
        'name',
        'area',
        'area_unit',
        'soil_type',
        'water_source',
        'description',
        'status',
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }
}
