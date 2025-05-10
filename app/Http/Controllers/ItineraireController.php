<?php

namespace App\Http\Controllers;

use App\Models\Itineraire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ItineraireController extends Controller
{
    public function allItineraire(){
        if (Gate::denies('view_itineraire')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $allIt=Itineraire::all();
        return response()->json($allIt);
    }

    public function deleted(){
        $allIt=Itineraire::onlyTrashed()->get();
        return response()->json($allIt);
    }

    public function show($id){
        $itineraire=Itineraire::find($id);
        return response()->json($itineraire);
    }

    public function store(Request $request){
        if (Gate::denies('create_itineraire')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->validate([
            'itineraire'=>'required',
            'p_depart'=>'required',
            'p_arrive'=>'required',
            'distance'=>'required',
        ]);
        
        $newitineraire=Itineraire::create([
            'nom'=>$data['itineraire'],
            'point_depart'=>$data['p_depart'],
            'point_arrivee'=>$data['p_arrive'],
            'distance'=>$data['distance'],
            'user_id'=>$request['user_id'],
        ]);
        
        return response()->json($newitineraire);
    }

    public function update(Request $request,$id){
        if (Gate::denies('update_itineraire')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->all();
        $itineraire=Itineraire::find($id);
        $itineraire->update([
            'nom'=>$data['itineraire'],
            'point_depart'=>$data['p_depart'],
            'point_arrivee'=>$data['p_arrive'],
            'distance'=>$data['distance'],
        ]);

        return response()->json($itineraire);
    }

    public function delete($id){
        if (Gate::denies('delete_itineraire')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $itineraire=Itineraire::find($id)->delete();
        return response()->json($itineraire);
    }

    public function restore($id){
        $itineraire=Itineraire::onlyTrashed()->find($id)->restore();
        return response()->json($itineraire);
    }
}
