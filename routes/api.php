<?php

use App\Http\Controllers\BusController;
use App\Http\Controllers\ChauffeurController;
use App\Http\Controllers\DashbordController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\ItineraireController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\PaimentController;
use App\Http\Controllers\TuteursController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

//Route::get('test',[UserController::class,'show']);

Route::get('/user',[UserController::class,'show'])->middleware('auth:sanctum');

// deleted Users
Route::get('/deletedUser',[UserController::class,'deleted'])->middleware('auth:sanctum');

//update user Profile
Route::post('/updateProfile',[UserController::class,'update'])->middleware('auth:sanctum');

// get one user
Route::get('/getUser/{id}',[UserController::class,'showUser']);

// update Permissions
Route::post('/updatePermissions/{id}',[UserController::class,'updatePermissions'])->middleware('auth:sanctum');

// get All users
Route::get('/users',[UserController::class,'index'])->middleware('auth:sanctum');

// User Login
Route::post('login',[UserController::class,'login']);

// User register
Route::post('register',[UserController::class,'register'])->middleware('auth:sanctum');

// User logout
Route::post('logout',[UserController::class,'logout'])->middleware('auth:sanctum');

// delete User
Route::delete('delete/user/{id}',[UserController::class,'delete'])->middleware('auth:sanctum');
// delete User

Route::get('restore/user/{id}',[UserController::class,'restore'])->middleware('auth:sanctum');

// update Password
Route::put('changePassword',[UserController::class,'changePassword'])->middleware('auth:sanctum');

//get all tuteurs
Route::get('allTuteur',[TuteursController::class,'show'])->middleware('auth:sanctum');

//get deleted tuteurs
Route::get('deletedTuteur',[TuteursController::class,'deleted']);

// get one tuteur
Route::get('oneTuteur/{id}',[TuteursController::class,'showOne']);

// add new tuteur
Route::post('addTuteur',[TuteursController::class,'store'])->middleware('auth:sanctum');

// update tuteur
Route::put('updateTuteur/{id}',[TuteursController::class,'update'])->middleware('auth:sanctum');

// check CIN of tuteur
Route::post('checkCin',[TuteursController::class,'checkCin']);

// delete Tuteur
Route::delete('tuteur/delete/{id}',[TuteursController::class,'delete'])->middleware('auth:sanctum');

// restore Tuteur
Route::get('tuteur/restore/{id}',[TuteursController::class,'restore']);

// get All itineraie
Route::get('allIt',[ItineraireController::class,'allItineraire'])->middleware('auth:sanctum');

// get deleted itineraie
Route::get('deletedIt',[ItineraireController::class,'deleted']);

// get one itineraie
Route::get('itineraire/{id}',[ItineraireController::class,'show']);

// add new itineraie
Route::post('itineraire/store',[ItineraireController::class,'store'])->middleware('auth:sanctum');

// update itineraie
Route::delete('itineraire/update/{id}',[ItineraireController::class,'delete'])->middleware('auth:sanctum');

// restore itineraie
Route::get('itineraire/restore/{id}',[ItineraireController::class,'restore']);

// delete itineraie
Route::delete('itineraire/delete/{id}',[ItineraireController::class,'delete'])->middleware('auth:sanctum');

// get all chauffeur
Route::get('allChauffeur',[ChauffeurController::class,'allChauffeur'])->middleware('auth:sanctum');

// get deleted chauffeur
Route::get('deletedChauffeur',[ChauffeurController::class,'deleted']);

// get one chauffeur
Route::get('chauffeur/{id}',[ChauffeurController::class,'show']);

// add new chauffeur
Route::post('chauffeur/store',[ChauffeurController::class,'store'])->middleware('auth:sanctum');

// update chauffeur
Route::put('chauffeur/update/{id}',[ChauffeurController::class,'update'])->middleware('auth:sanctum');

//delete chauffeur
Route::delete('chauffeur/delete/{id}',[ChauffeurController::class,'delete'])->middleware('auth:sanctum');

//restore chauffeur
Route::get('chauffeur/restore/{id}',[ChauffeurController::class,'restore']);

// get all Bus
Route::get('allBus',[BusController::class,'allBus'])->middleware('auth:sanctum');

// get all Bus
Route::get('deletedBus',[BusController::class,'deleted']);

// get one bus
Route::get('bus/{id}',[BusController::class,'show']);

// add new bus
Route::post('bus/store',[BusController::class,'store'])->middleware('auth:sanctum');

// update bus
Route::put('bus/update/{id}',[BusController::class,'update'])->middleware('auth:sanctum');

// delete bus
Route::delete('bus/delete/{id}',[BusController::class,'delete'])->middleware('auth:sanctum');

// restore bus
Route::get('bus/restore/{id}',[BusController::class,'restore']);

// get all Niveau
Route::get('allNiveau',[NiveauController::class,'allNiveau'])->middleware('auth:sanctum');

// get deleted Niveau
Route::get('deletedNiveau',[NiveauController::class,'deleted']);

// get one Niveau
Route::get('niveau/{id}',[NiveauController::class,'show']);

// add new Niveau
Route::post('niveau/store',[NiveauController::class,'store'])->middleware('auth:sanctum');

// update Niveau
Route::put('niveau/update/{id}',[NiveauController::class,'update'])->middleware('auth:sanctum');

// delete Niveau
Route::delete('niveau/delete/{id}',[NiveauController::class,'delete'])->middleware('auth:sanctum');

// restore Niveau
Route::get('niveau/restore/{id}',[NiveauController::class,'restore']);

// add new Eleve
Route::post('eleve/store',[EleveController::class,'store'])->middleware('auth:sanctum');

// all eleves
Route::get('eleves',[EleveController::class,'index'])->middleware('auth:sanctum');

// get One eleve
Route::get('eleve/{id}',[EleveController::class,'show']);

// update eleve
Route::put('eleve/update/{id}',[EleveController::class,'update'])->middleware('auth:sanctum');

// get deleted eleve
Route::put('deletedEleve',[EleveController::class,'deleted']);

// all paiments
Route::get('tuteur/paiments',[PaimentController::class,'index']);

// get one paiment
Route::get('paiment/{id}',[PaimentController::class,'show']);

// dashbord route
Route::get('dashboard',[DashbordController::class,'getDashbordData'])->middleware('auth:sanctum');

// get All Permissions
Route::get('permissions',function(){
    return response()->json(['permissions'=>Permission::all()]);
});

// general stats
Route::get('stats',[DashbordController::class,'stats']);

// backup local 
Route::get('backup/download',function(){
    Artisan::call('backup:run --only-db');
    $files=File::files(storage_path('app/backups/laravel'));
    if(empty($files)){
        return response()->json(['error'=>'Aucun fichier trouvé'],404);
    }
    $lastFile=collect($files)->sortByDesc(fn($file)=>$file->getCTime())->first();
    return response()->download($lastFile->getRealPath(),$lastFile->getFilename());
});
