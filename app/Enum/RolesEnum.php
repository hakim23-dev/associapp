<?php

namespace App\Enum;

enum RolesEnum:string
{
    case Admin='admin';
    case Moderator='moderator';

    public static function labels():array{
        return [
            self::Admin=>'admin',
            self::Moderator=>'moderator',
        ];
    }

    public function label(){
        return match($this){
            self::Admin=>'admin',
            self::Moderator=>'moderator'
        };
    }

}
