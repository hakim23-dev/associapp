<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Itineraire extends Model
{
    use SoftDeletes;
    protected $fillable=['nom','point_depart','point_arrivee','distance','user_id'];

    public function eleves(){
        return $this->belongsToMany(Eleve::class,'affectations','itineriare_id');
    }

}
