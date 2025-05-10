<?php

namespace App\Http\Controllers;

use App\Models\Paiment;
use App\Models\Tuteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaimentController extends Controller
{
    public function index(){
        $paiments = Paiment::with('tuteur')->get();
        return response()->json($paiments);        
    }

    public function show($id){
        $onePaiment=Paiment::with('tuteur.eleves')->find($id);
        return response()->json($onePaiment);
    }
}
