<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BusController extends Controller
{
    public function allBus(){
        if (Gate::denies('view_bus')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }

        $allBus=Bus::all();
        return response()->json($allBus);
    }

    public function deleted(){
        $allBus=Bus::onlyTrashed()->get();
        return response()->json($allBus);
    }

    public function store(Request $request){
        if (Gate::denies('create_bus')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->validate([
            'immatriculation'=>'required',
            'capacite'=>'required|integer',
            'marque'=>'required',
            'modele'=>'required|max:4',
        ]);
        
        $bus=Bus::create([
            'immatriculation'=>$data['immatriculation'],
            'capacite'=>$data['capacite'],
            'marque'=>$data['marque'],
            'modele'=>$data['modele'],
            'user_id'=>$request['user_id'],
        ]);
        return response()->json($bus);
    }

    public function update(Request $request,$id){
        if (Gate::denies('update_bus')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $data=$request->validate([
            'immatriculation'=>'required',
            'capacite'=>'required|integer',
            'marque'=>'required',
            'modele'=>'required|max:4',
        ]);
        $bus=Bus::find($id);
        $bus->update([
            'immatriculation'=>$data['immatriculation'],
            'capacite'=>$data['capacite'],
            'marque'=>$data['marque'],
            'modele'=>$data['modele'],
        ]);
        return response()->json($bus);
    }

    public function show($id){
        $bus=Bus::find($id);
        return response()->json($bus);
    }

    public function delete($id){
        if (Gate::denies('delete_bus')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $bus=Bus::find($id)->delete();
        return response()->json($bus);
    }

    public function restore($id){
        $bus=Bus::onlyTrashed()->find($id)->restore();
        return response()->json($bus);
    }
}
