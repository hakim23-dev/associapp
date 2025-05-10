<?php

namespace App\Http\Controllers;

use App\Models\Niveau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class NiveauController extends Controller
{
    public function allNiveau(){
        if (Gate::denies('view_niveau')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $allNiveau=Niveau::all();
        //dd($allNiveau);
        return response()->json($allNiveau);
    }

    public function deleted(){
        $allNiveau=Niveau::onlyTrashed()->get();
        return response()->json($allNiveau);
    }

    public function store(Request $request){
        if (Gate::denies('create_niveau')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->validate([
            'niveau'=>'required'
        ]);

        $newNiveau=Niveau::create([
            "label"=>$data['niveau'],
            'user_id'=>1
        ]);
        return response()->json($newNiveau);
    }

    public function show($id){
        $niveau=Niveau::find($id);
        return response()->json($niveau);
    }

    public function update(Request $request,$id){
        if (Gate::denies('vupdate_niveau')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $niveau=Niveau::find($id);
        $data=$request->all();
        $niveau->update([
            'label'=>$data['niveau']
        ]);
        return response()->json($niveau);
    }

    public function delete($id){
        if (Gate::denies('delete_niveau')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $niveau=Niveau::where('id',$id)->delete();
        return response()->json($niveau);
    }
    
    public function restore($id){
        $niveau=Niveau::onlyTrashed()->find($id)->restore();
        return response()->json($niveau);
    }
}
