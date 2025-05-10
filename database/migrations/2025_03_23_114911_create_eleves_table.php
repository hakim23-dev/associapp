<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->string('nom',50);
            $table->string('prenom',50);
            $table->date('date_naissance');
            $table->string('adresse',255)->nullable();
            $table->string('telephone',20)->nullable();
            $table->string('email',100)->nullable();
            $table->string('acte_de_naissance',255)->nullable();
            $table->enum('sexe',['masculin','feminin']);
            $table->enum('orphelin',['non','oui']);
            $table->string('picture')->nullable();
            $table->unsignedBigInteger('tuteur_id');
            $table->foreign('tuteur_id')->references('id')->on('tuteurs');
            $table->unsignedBigInteger('niveau_id');
            $table->foreign('niveau_id')->references('id')->on('niveaux');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves');
    }
};
