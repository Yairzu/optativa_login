<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->bigIncrements('id_user');
            $table->unsignedBigInteger('id_rol');
            $table->string('name_user', 30);
            $table->string('surname_user', 30);
            $table->string('nick_user', 30)->unique();
            $table->string('password_user', 255)->notNull(); 

            $table->foreign('id_rol', 'fk_rol')
                  ->references('id_rol')
                  ->on('rol')
                  ->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};