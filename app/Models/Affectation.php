<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Affectation extends Model
{
    use SoftDeletes;
    protected $fillable=['eleve_id','bus_id','itineriare_id','chauffeur_id','user_id'];
}