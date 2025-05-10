<?php

namespace App\Http\Controllers;

use App\Models\Chauffeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ChauffeurController extends Controller
{
    public function allChauffeur(){
        if (Gate::denies('view_chauffeur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }

        $allChauffeur=Chauffeur::all();
        return response()->json($allChauffeur);
    }

    public function deleted(){
        $chauffeur=Chauffeur::onlyTrashed()->get();
        return response()->json($chauffeur);
    }

    public function store(Request $request){
        if (Gate::denies('create_chauffeur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->validate([
            'cin'=>'required',
            'permis'=>'required',
            'prenom'=>'required',
            'nom'=>'required',
            'telephone'=>'required',
            'adresse'=>'required',
        ]);

        $newChauffeur=Chauffeur::create([
            'cin'=>$data['cin'],
            'permis'=>$data['permis'],
            'prenom'=>$data['prenom'],
            'nom'=>$data['nom'],
            'telephone'=>$data['telephone'],
            'adresse'=>$data['adresse'],
            'email'=>$request['email'],
            'user_id'=>1
        ]);
        return response()->json($newChauffeur);
    }

    public function show($id){
        $chauffeur=Chauffeur::find($id);
        return response()->json($chauffeur);
    }

    public function update(Request $request,$id){
        if (Gate::denies('update_chauffeur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->all();
        $cheuffeur=Chauffeur::find($id);

        $cheuffeur->update([
            'cin'=>$data['cin'],
            'permis'=>$data['permis'],
            'prenom'=>$data['prenom'],
            'nom'=>$data['nom'],
            'telephone'=>$data['telephone'],
            'adresse'=>$data['adresse'],
            'email'=>$data['email'],
        ]);
        return response()->json($cheuffeur);
    }

    public function delete($id){
        if (Gate::denies('delete_chauffeur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $chauffeur=Chauffeur::where('id',$id)->delete();
        return response()->json($chauffeur);
    }
    
    public function restore($id){
        $chauffeur=Chauffeur::onlyTrashed()->find($id)->restore();
        return response()->json($chauffeur);
    }
}
