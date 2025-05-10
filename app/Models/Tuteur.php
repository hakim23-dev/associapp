<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tuteur extends Model
{
    use SoftDeletes;
    protected $fillable=['cin','nom','prenom','adresse','email','user_id','telephone'];

    public function eleves(){
        return $this->hasMany(Eleve::class);
    }

    public function paiments(){
        return $this->hasMany(Paiment::class);
    }
}
