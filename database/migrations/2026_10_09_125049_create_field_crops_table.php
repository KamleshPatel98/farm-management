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
        Schema::create('field_crops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('field_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crop_id')->constrained()->cascadeOnDelete();

            $table->string('season')->nullable();
            $table->date('sowing_date')->nullable();
            $table->date('expected_harvest_date')->nullable();
            $table->decimal('area', 10, 2);
            $table->string('status')->default('planned');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('field_crops');
    }
};
