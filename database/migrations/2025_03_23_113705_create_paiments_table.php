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
        Schema::create('paiments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tuteur_id');
            $table->foreign('tuteur_id')->references('id')->on('tuteurs');
            $table->decimal('montant',10,2);
            $table->timestamp('date_paiment')->useCurrent();
            $table->date('limit_date');
            $table->enum('statut',['paye','en cours']);
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
        Schema::dropIfExists('paiments');
    }
};
