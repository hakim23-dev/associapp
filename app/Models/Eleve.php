<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Eleve extends Model
{
    use SoftDeletes;
    protected $fillable=[
        'nom',
        'prenom',
        'date_naissance',
        'adresse',
        'telephone',
        'email',
        'acte_de_naissance',
        'sexe',
        'orphelin',
        'tuteur_id',
        'niveau_id',
        'user_id',
        'picture'
    ];

    public function tuteur(){
        return $this->belongsTo(Tuteur::class);
    }

    public function itineraire(){
        return $this->belongsToMany(Bus::class,'affectations');
    }

}
