<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paiment extends Model
{
    use SoftDeletes;
    protected $fillable=['tuteur_id','montant','date_paiment','statut','limit_date','user_id'];

    public function tuteur(){
        return $this->belongsTo(Tuteur::class,'tuteur_id');
    }
}
