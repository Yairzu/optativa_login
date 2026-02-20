<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed rol table
        $adminId = DB::table('rol')->insertGetId(
            ['tipo_rol' => 'admin'], 
            'id_rol' 
        );

        $usuarioId = DB::table('rol')->insertGetId(
            ['tipo_rol' => 'usuario'], 
            'id_rol'
        );

        // Seed user table 
        DB::table('user')->insert([
            [
                'id_rol'         => $adminId,
                'name_user'      => 'Super',
                'surname_user'   => 'Admin',
                'nick_user'      => 'superadmin',
                'password_user'  => Hash::make('Admin@1234'),
            ],
            [
                'id_rol'         => $usuarioId,
                'name_user'      => 'Juan',
                'surname_user'   => 'Pérez',
                'nick_user'      => 'juanperez',
                'password_user'  => Hash::make('User@1234'),
            ],
        ]);
    }
}
