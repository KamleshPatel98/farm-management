<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'crop_type',
        'duration_days',
        'scientific_name',
        'description',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'duration_days' => 'integer',
            'status' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
