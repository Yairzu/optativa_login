<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = DB::table('rol')->where('tipo_rol', 'admin')->first();
        if (! $adminRole) {
            $adminRoleId = DB::table('rol')->insertGetId(['tipo_rol' => 'admin']);
        } else {
            $adminRoleId = $adminRole->id_rol;
        }

        $userRole = DB::table('rol')->where('tipo_rol', 'usuario')->first();
        if (! $userRole) {
            $userRoleId = DB::table('rol')->insertGetId(['tipo_rol' => 'usuario']);
        } else {
            $userRoleId = $userRole->id_rol;
        }

        DB::table('user')->updateOrInsert(
            ['nick_user' => 'superadmin'],
            [
                'id_rol' => $adminRoleId,
                'name_user' => 'Super',
                'surname_user' => 'Admin',
                'password_user' => Hash::make('Admin@12345'),
            ]
        );

        DB::table('user')->updateOrInsert(
            ['nick_user' => 'juanperez'],
            [
                'id_rol' => $userRoleId,
                'name_user' => 'Juan',
                'surname_user' => 'Pérez',
                'password_user' => Hash::make('User@12345'),
            ]
        );
    }
}
