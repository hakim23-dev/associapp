<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Models\Eleve;
use App\Models\Paiment;
use App\Models\Tuteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TuteursController extends Controller
{
    public function show(){
        if (Gate::denies('view_tuteur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $allTuteur=Tuteur::all();
        //dd($allTuteur);
        return response()->json($allTuteur);
    }
    
    public function deleted(){
        $allTuteur=Tuteur::onlyTrashed()->get();
        //dd($allTuteur);
        return response()->json($allTuteur);

    }

    public function showOne($id){
        //$id=$request;
        $oneTuteur=Tuteur::where('id',$id)->first();
        //dd($oneTuteur);
        return response()->json($oneTuteur);
    }

    public function checkCin(Request $request){
        $tuteur=Tuteur::where('cin',$request->cin)->first();
        if($tuteur){
            return response()->json(['msg'=>'deja existe','tuteur'=>$tuteur]);
        }

        return;
    }

    public function store(Request $request){
        if (Gate::denies('create_tuteur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        
        $data=$request->validate([
            'cin'=>'required',
            'nom'=>'required',
            'prenom'=>'required',
            'tel'=>'required',
            'adresse'=>'required',
            "userId"=>'required',
            'email'=>'nullable'
        ]);
        
        $nvtuteur=Tuteur::create([
            'cin'=>$data['cin'],
            'nom'=>$data['nom'],
            'prenom'=>$data['prenom'],
            'telephone'=>$data['tel'],
            'adresse'=>$data['adresse'],
            'user_id'=>$data['userId'],
            'email'=>$data['email'],
        ]);
        return response()->json($nvtuteur);
    }

    public function update($id){
        if (Gate::denies('update_tuteur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=request()->all();
        $tuteur=Tuteur::find($id);
        $tuteur->update([
            'cin'=>$data['cin'],
            'nom'=>$data['nom'],
            'prenom'=>$data['prenom'],
            'telephone'=>$data['tel'],
            'email'=>$data['email'],
            'adresse'=>$data['adresse'],
        ]);
        return response()->json($tuteur);
    }

    public function allPaiments(){
        $paiments=Tuteur::with('paiments')->get();
        return response()->json($paiments);
    }

    public function delete($id){
        if (Gate::denies('delete_tuteur')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $tuteur=Tuteur::find($id);
        if($tuteur){
            $eleves=Eleve::where('tuteur_id',$id)->get();

            $paiment=Paiment::where('tuteur_id',$id)->delete();

            $eleve=Eleve::where('tuteur_id',$id)->delete();

            $affectation=[];

            for ($i=0; $i <count($eleves) ; $i++) { 
                $item=Affectation::where('eleve_id',$eleves[$i]->id)->delete();
                array_push($affectation,$item);
            }
            $tuteur->delete();
            return response()->json([$tuteur,'paiments'=>$paiment,"eleve"=>$eleve,'affectation'=>$affectation]);
        }
    }
    
    public function restore($id){
        $eleves=Eleve::onlyTrashed()->where('tuteur_id',$id)->get();

        $tuteur=Tuteur::onlyTrashed()->find($id)->restore();

        $paiment=Paiment::onlyTrashed()->where('tuteur_id',$id)->restore();

        $eleve=Eleve::onlyTrashed()->where('tuteur_id',$id)->restore();

        for ($i=0; $i <count($eleves) ; $i++) { 
            Affectation::where('eleve_id',$eleves[$i]->id)->restore();
        }

        return response()->json([$tuteur,'paiments'=>$paiment,"eleve"=>$eleve]);
    }

}
