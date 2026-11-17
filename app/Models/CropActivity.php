<?php

namespace App\Models;

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

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function fieldCrop()
    {
        return $this->belongsTo(FieldCrop::class);
    }
}
