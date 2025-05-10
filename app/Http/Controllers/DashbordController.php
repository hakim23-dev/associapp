<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Chauffeur;
use App\Models\Eleve;
use App\Models\Itineraire;
use App\Models\Paiment;
use App\Models\Tuteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class DashbordController extends Controller
{
    public function getDashbordData(){
        if (Gate::denies('view_dashbord')) {
            return response()->json(['message' => 'unauthorized'], 403);
        }
        $month=now()->month;

        $monthPaiment=DB::table('paiments')
        ->select(DB::raw('SUM(montant) as month_paiment'))
        ->whereMonth('date_paiment','=',$month)
        ->where('deleted_at','=',null)
        ->get();

        $abonnementTotal=DB::table('paiments')
        ->select(DB::raw('SUM(montant) as abonnement_total'))
        ->where('deleted_at','=',null)
        ->get();

        $monthAbonnemnt=DB::table('paiments')
        ->join('tuteurs','tuteurs.id','=','paiments.tuteur_id')
        ->where('paiments.deleted_at','=',null)
        ->whereMonth('paiments.date_paiment','=',$month)
        ->get();


        $studentExonere=DB::select("
            select  COUNT(*) as 'student_exonere'
            from eleves WHERE eleves.orphelin='oui' and deleted_at is  null
        ");

        //dd($studentExonere);
        return response()->json([
            'stats'=>[
                'bus'=>Bus::count(),
                'paiment'=>Paiment::count(),
                'students'=>Eleve::count(),
                'girls'=>Eleve::where('sexe','feminin')->count(),
                'boys'=>Eleve::where('sexe','masculin')->count(),
                'chauffeurs'=>Chauffeur::count(),
                'month_paiment'=>$monthPaiment,
                'student_exonere'=>$studentExonere,
                'abonnement_total'=>$abonnementTotal,
            ],
            'last_abonnement'=>Paiment::with('tuteur')->latest()->take(5)->get(),
            'mont_abonnement'=>$monthAbonnemnt
        ]);
    }

    public function stats(){
        $revenuPerdate=DB::select('select date_format(date_paiment,"%Y-%m") as mois,sum(montant) total from paiments GROUP by mois ORDER by mois');

        

        $elevePerBus=Bus::withCount('eleves')->get();

        $elevePerChauffeur=Chauffeur::withCount('eleves')->get();

        $elevePerIti=Itineraire::withCount('eleves')->get();
        
        $paymentPerday=DB::select('SELECT date_format(date_paiment,"%d") AS jour, COUNT(*) AS paiements_du_jour FROM paiments GROUP BY jour');

        $topTuteurPayement=Tuteur::withSum('paiments','montant')->take(5)->get();

        $PaimentRetard=DB::table('tuteurs','t')
        ->join('paiments as p','p.tuteur_id','=','t.id')
        ->where('p.limit_date','>',now())
        ->where('p.statut','=','en cours')
        ->select('t.*','p.limit_date as limit')
        ->get();

        return response()->json([
            'revenuPerdate'=>$revenuPerdate,
            'route_num'=>Itineraire::count(),
            'elevePerIti'=>$elevePerIti,
            'bus_num'=>Bus::count(),
            'elevePerBus'=>$elevePerBus,
            'chauffeur_num'=>Chauffeur::count(),
            'elevePerCh'=>$elevePerChauffeur,
            'paymentPerDay'=>$paymentPerday,
            'tuteur_num'=>Tuteur::count(),
            'topTuteurPayement'=>$topTuteurPayement,
            'PaimentRetard'=>$PaimentRetard,
        ]);
    }

}
