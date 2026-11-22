<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class CropActivity extends Model
{
    protected $fillable = [
        'user_id',
        'field_crop_id',
        'name',
        'date',
        'notes'
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    protected function date(): Attribute
    {
        return Attribute::make(
            // get: fn(?string $value) => $value ? date('d-m-Y', strtotime($value)) : null,
            set: fn(?string $value) => $value ? date('Y-m-d', strtotime($value)) : null,
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function fieldCrop()
    {
        return $this->belongsTo(FieldCrop::class);
    }
}
