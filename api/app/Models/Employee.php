<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'position',
        'department',
        'about',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];
}
