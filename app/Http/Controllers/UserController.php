<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (Gate::denies('view_users')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }

        $users = User::with('permissions')->get();

        return response()->json($users);
    }

    public function show(Request $request){
        //dd($request->user()->picture);
        if(!$request->user()->picture){
            $picture=null;
        }

        $url=public_path('uploads/'.$request->user()->picture);

        if(!file_exists($url)){
            $picture=null;
        }
        
        $picture=asset('uploads/'.$request->user()->picture);
        return response()->json(['user'=>$request->user(),'userPicture'=>$picture]) ;
    }

    public function register(Request $request){

        if (Gate::denies('create_users')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }

        //return response()->json($request->all());

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $fileName=uniqid().'_'.$file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
        }else{
            $fileName=null;
        }

        $data=$request->validate([
            'name'=>'required|max:255',
            'prenom'=>'required|max:255',
            'username'=>'required|unique:users,username',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|confirmed',
            'permissions'=>'required'
        ]);
        
        $user=User::create([
            'name'=>$data['name'],
            'username'=>$data['username'],
            'prenom'=>$data['prenom'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'picture'=>$fileName,
        ]);

        $user->givePermissionTo($data['permissions']);

        return response()->json(['user'=>$user]);
    }

    public function login(Request $request){
        //validation des données
        $data=$request->validate([
            'username'=>'required',
            'password'=>'required',
        ]);

        // recherche dans la base de donné
        $user=User::where('username',$data['username'])->first();
        //return response()->json($data);

        if(!$user){
            return response()->json(['username'=>'admin user est introuvable']);
        }

        // comparer password
        if(!Hash::check($data['password'],$user['password'])){
            return response()->json(['psw'=>'mot de passe est incorrecte']);
        }

        $user->last_login=Carbon::now();
        $user->save();

        $token=$user->createToken('main')->plainTextToken;
        return response()->json(['msg'=>'correcte','token'=>$token,'user'=>$user]);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }

    public function delete($id){
        if (Gate::denies('delete_users')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }

        $user=User::where('id',$id)->delete();
        return response()->json(['msg'=>'user deleted successfully']);
    }

    public function changePassword(Request $request){
        $data=$request->validate([
            'old_psw'=>'required',
            'password'=>'required|min:6|confirmed',
        ]);

        if(!$data){
            return response()->json(['errorMsg'=>'un erreur est produits']);
        }else{
            try {
                if(!Hash::check($request->old_psw,$request->user()->password)){
                    return response()->json(['oldPswError'=>'vérifier votre ancien mot de passe']);
                }else if(Hash::check($request->password,$request->user()->password)){
                    return response()->json(['samePsw'=>'tu dois ajouter un nouveau mot de passe']);
                }else {
                    $request->user()->update(['password'=>Hash::make($request->password)]);
                    return response()->json($request->user());
                }
            } catch (\Exception $ex) {
                return response()->json([
                    'error' => "Erreur lors de changement " . $ex->getMessage(),
                ], 500);
            }
        }
    }
    
    public function update(Request $request){

        if($request->hasFile('image')){
            $file=$request->file('image');
            $fileName=uniqid().'_'.$file->getClientOriginalName();
            $file->move(public_path('uploads'),$fileName);
        }else {
            $fileName=$request->user()->picture;
        }

        $request->user()->update([
            'name'=>$request['name'],
            'prenom'=>$request['prenom'],
            'username'=>$request['username'],
            'picture'=>$fileName
        ]);
        return response()->json($request->user());
    }

    public function showUser($id){
        

        $user=User::where('id',$id)->with('permissions')->first();
        return response()->json($user);
    }
    
    public function updatePermissions(Request $request,$id){
        if (Gate::denies('update_users')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        
        $user=User::where('id',$id)->first();
        $permissions=$request->all();
        $user->syncPermissions($permissions);
        return response()->json($user);
    }

    public function deleted(){
        $user=User::onlyTrashed()->get();
        return response()->json($user);
    }

    public function restore($id){
        $user=User::onlyTrashed()->find($id)->restore();
        return response()->json($user);
    }

}
