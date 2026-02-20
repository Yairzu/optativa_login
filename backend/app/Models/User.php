<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'user';

    protected $primaryKey = 'id_user';

    public $timestamps = false;

    protected $fillable = [
        'name_user',
        'surname_user',
        'nick_user',
        'password_user',
        'id_rol',
    ];


    protected $hidden = [
        'password_user',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password_user' => 'hashed',
        ];
    }

    public function getAuthPassword()
    {
        return $this->password_user;
    }


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'id_rol' => $this->id_rol, 
        ];
    }
}
