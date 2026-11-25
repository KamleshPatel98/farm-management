<?php

namespace App\Models;

use App\Models\Scopes\UserScope;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    protected static function booted(): void
    {
        static::addGlobalScope(new UserScope);
    }
}
