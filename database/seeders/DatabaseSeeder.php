<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //create roles Roles
        //$adminRole=Role::firstOrCreate(['name'=>RolesEnum::Admin->value]);
        //$moderotorRole=Role::firstOrCreate(['name'=>RolesEnum::Moderator->value]);

        // create permissions
        foreach (PermissionsEnum::cases() as $premissions) {
            Permission::firstOrCreate(['name'=>$premissions]);
        }

        // assigner tous les permissiosnpou le role admin
        //$adminRole->syncPermissions(Permission::all());

        // assigner qulque permissions pour le moderator
        //$moderotorRole->syncPermissions([$studentsAssignementPermission]);

        User::factory()->create([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password'=>Hash::make('admin123'),
            'prenom'=>'admin'
        ])->givePermissionTo(PermissionsEnum::cases());

        
    }
}
