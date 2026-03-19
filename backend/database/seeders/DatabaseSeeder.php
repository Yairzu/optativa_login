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
                'surname_user'   => 'admin',
                'email_user'     => 'admin@ejemplo.com',
                'nick_user'      => 'admin',
                'password_user'  => Hash::make('admin@1234'),
            ],
            [
                'id_rol'         => $usuarioId,
                'name_user'      => 'pepito',
                'surname_user'   => 'Pérez',
                'email_user'     => 'pepito@ejemplo.com',
                'nick_user'      => 'pepito',
                'password_user'  => Hash::make('pepito@abcd'),
            ],
        ]);
    }
}
