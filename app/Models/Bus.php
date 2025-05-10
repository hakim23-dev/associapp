<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bus extends Model
{
    use SoftDeletes;
    protected $table='bus';
    protected $fillable=['immatriculation','capacite','marque','modele','user_id'];

    public function eleves(){
        return $this->belongsToMany(Eleve::class,'affectations');
    }
}
