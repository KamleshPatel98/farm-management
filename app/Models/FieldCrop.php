<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FieldCrop extends Model
{
    protected $fillable = [
        'field_id',
        'crop_id',
        'season',
        'sowing_date',
        'expected_harvest_date',
        'area',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'sowing_date' => 'date',
            'expected_harvest_date' => 'date',
            'area' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function crop()
    {
        return $this->belongsTo(Crop::class);
    }
}
