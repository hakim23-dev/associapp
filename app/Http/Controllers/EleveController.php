<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Models\Eleve;
use App\Models\Paiment;
use App\Models\Tuteur;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EleveController extends Controller
{
    public function store(Request $request){
        if (Gate::denies('create_eleve')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        
        // upload file 
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName=uniqid().'_'.$file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
        }else{
            $fileName=null;
        }
        
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName=uniqid().'_'.$image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
        }else{
            $imageName=null;
        }
        //return response()->json([$fileName,$imageName]);

        $data=$request->validate([
            'nom'=>'required',
            'prenom'=>'required', 
            'adresse'=>'required',
            'orphelin'=>'required',
            'sexe'=>'required',
            'tuteurId'=>'required',
            'niveau'=>'required',
            'userId'=>'required',
            'chauffeurId'=>'required',
            'busId'=>'required',
            'itineraireId'=>'required',
            'statu'=>'required',
        ]); 
        

        $neweleve=Eleve::create([
            'nom'=>$data["nom"],
            'prenom'=>$data["prenom"],
            'date_naissance'=>$request['birthday'],
            'adresse'=>$data["adresse"],
            'telephone'=>$request["tel"],
            'email'=>$request["email"],
            'acte_de_naissance'=>$fileName,
            'picture'=>$imageName,
            'sexe'=>$data["sexe"],
            'orphelin'=>$data["orphelin"],
            'tuteur_id'=>$data["tuteurId"],
            'niveau_id'=>$data["niveau"],
            'user_id'=>$data["userId"],
        ]);
        
        // add Affectation
        if($neweleve){
            Affectation::create([
                'eleve_id'=>$neweleve->id,
                'bus_id'=>$data['busId'],
                'itineriare_id'=>$data['itineraireId'],
                'chauffeur_id'=>$data['chauffeurId'],
                'user_id'=>$request['userId'],
            ]);
        }

        // add Paiment
        
            // get child num for one tuteur
            $childs=Tuteur::withCount([
                'eleves'=>function($query){
                    $query->where('orphelin','non');
                }
                ])->find($request->tuteurId);

            if($childs['eleves_count']==1){

                $newpaiment=Paiment::updateOrCreate([
                    'tuteur_id'=>$data['tuteurId'],
                ],[
                    'montant'=>500.00,
                    'date_paiment'=>Carbon::now()->format('Y-m-d'),
                    'statut'=>$data['statu'],
                    'user_id'=>$request['userId'],
                    'limit_date'=>$request['limit_date'],
                ]);

            }else if($childs['eleves_count']==2){

                $newpaiment=Paiment::updateOrCreate([
                    'tuteur_id'=>$data['tuteurId'],
                ],[
                    'montant'=>800.00,
                    'date_paiment'=>Carbon::now()->format('Y-m-d'),
                    'statut'=>$data['statu'],
                    'user_id'=>$request['userId'],
                    'limit_date'=>$request['limit_date'],
                ]);

            }else if($childs['eleves_count']>=3){
                $newpaiment=Paiment::updateOrCreate([
                    'tuteur_id'=>$data['tuteurId'],
                ],[
                    'montant'=>1000.00,
                    'date_paiment'=>Carbon::now()->format('Y-m-d'),
                    'statut'=>$data['statu'],
                    'user_id'=>$request['userId'],
                    'limit_date'=>$request['limit_date'],
                ]);
            }
        return response()->json([$neweleve,$newpaiment]);
    }

    public function index(){
        if (Gate::denies('view_eleve')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $allEleves=Eleve::all();
        return response()->json($allEleves);
    }

    public function show($id){
        $oneEleve=Eleve::where('id',$id)->with('tuteur')->first();
        
        if(!$oneEleve || !$oneEleve->picture){
            $picture=null;
        }
        
        $url=public_path('uploads/'.$oneEleve->picture);
        
        if(!file_exists($url)) {
            $picture=null;
        }
        $picture=asset('uploads/'.$oneEleve->picture);;
        return response()->json(['eleve'=>$oneEleve,'picture'=>$picture]);
    }

    public function update(Request $request,$id){
        if (Gate::denies('update_bus')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->all();
        $eleve=Eleve::find($id);
        $eleve->update([
            'prenom'=>$data['prenom'],
            'nom'=>$data['nom'],
            'sexe'=>$data['sexe'],
            'date_naissance'=>$data['birthday'],
            'orphelin'=>$data['orphelin'],
            'telephone'=>$data['telephone'],
            'email'=>$data['email'],
            'adresse'=>$data['adresse'],
            'user_id'=>1
        ]);
        return response()->json($eleve);
    }
    
    public function deleted(){
        $eleve=Eleve::onlyTrashed()->get();
        return response()->json($eleve);
    }
}
