<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'total_area',
        'area_unit',
        'location',
        'description',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
