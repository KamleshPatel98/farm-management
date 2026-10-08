<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Farm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@farm.com')->first();

        if (!$user) {
            return;
        }

        $form = Farm::where('user_id', $user->id)
            ->where('name', 'Main Farm')
            ->first();
        if ($form) {
            return;
        }

        Farm::create([
            'user_id' => $user->id,
            'name' => 'Main Farm',
            'total_area' => 13,
            'area_unit' => 'acre',
            'location' => 'Mundha',
            'description' => 'Main agricultural farm',
            'status' => true,
        ]);

        Farm::create([
            'user_id' => $user->id,
            'name' => 'Home Farm',
            'total_area' => 1,
            'area_unit' => 'acre',
            'location' => 'Mundha',
            'description' => 'Home vegetable farming area',
            'status' => true,
        ]);
    }
}
