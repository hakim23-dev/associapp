<?php

namespace App\Enum;

enum PermissionsEnum:string
{
    case ViewDashbord='view_dashbord';
    // User 
    case CreateUsers='create_users'; // create and give permissions
    case UpdateUsers='update_users'; // update permissiosns and profile
    case DeleteUsers='delete_users';
    case ViewUsers='view_users'; 

    //tuteurs
    case ViewTuteur='view_tuteur';
    case CreateTuteur='create_tuteur';
    case UpdateTuteur='update_tuteur';
    case DeleteTuteur='delete_tuteur';

    //Eleves
    case ViewEleve='view_eleve';
    case CreateEleve='create_eleve';
    case UpdateEleve='update_eleve';
    //case DeleteEleve='delete_eleve';

    // chauffeurs
    case ViewChauffeur='view_chauffeur';
    case CreateChauffeur='create_chauffeur';
    case UpdateChauffeur='update_chauffeur';
    case DeleteChauffeur='delete_chauffeur';

    // bus
    case ViewBus='view_bus';
    case CreateBus='create_bus';
    case UpdateBus='update_bus';
    case DeleteBus='delete_bus';

    // itineraire
    case ViewItineraire='view_itineraire';
    case CreateItineraire='create_itineraire';
    case UpdateItineraire='update_itineraire';
    case DeleteItineraire='delete_itineraire';

    // niveau
    case ViewNiveau='view_niveau';
    case CreateNiveau='create_niveau';
    case UpdateNiveau='update_niveau';
    case DeleteNiveau='delete_niveau';

    //paiment
    case ViewPaiments='view_paiments';
    case PrintPaiments='print_paiments';
}
