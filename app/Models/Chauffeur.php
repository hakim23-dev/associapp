<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chauffeur extends Model
{
    use SoftDeletes;
    protected $fillable=['cin','permis','nom','prenom','adresse','telephone','email','user_id'];

    public function eleves(){
        return $this->belongsToMany(Eleve::class,'affectations','chauffeur_id');
    }
}
