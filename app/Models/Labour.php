<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Labour extends BaseModel
{
    protected $fillable = [
        'user_id',
        'name',
        'mobile',
        'address',
        'default_daily_wage',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'default_daily_wage' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
