<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\Field;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FieldSeeder extends Seeder
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

        $farm = Farm::where('user_id', $user->id)
            ->where('name', 'Main Farm')
            ->first();
        if (!$farm) {
            return;
        }

        $field = Field::where('user_id', $user->id)
            ->where('farm_id', $farm->id)
            ->where('name', 'Field 1')
            ->first();
        if ($field) {
            return;
        }


        Field::create([
            'user_id' => $user->id,
            'farm_id' => $farm->id,
            'name' => 'Field 1',
            'area' => 5,
            'area_unit' => 'acre',
            'soil_type' => 'Clay Loam',
            'water_source' => 'Borewell',
            'description' => 'Paddy field',
            'status' => true,
        ]);

        Field::create([
            'user_id' => $user->id,
            'farm_id' => $farm->id,
            'name' => 'Field 2',
            'area' => 3,
            'area_unit' => 'acre',
            'soil_type' => 'Loam',
            'water_source' => 'Borewell',
            'description' => 'Vegetable cultivation',
            'status' => true,
        ]);

        Field::create([
            'user_id' => $user->id,
            'farm_id' => $farm->id,
            'name' => 'Field 3',
            'area' => 3,
            'area_unit' => 'acre',
            'soil_type' => 'Loam',
            'water_source' => 'Rain Water',
            'description' => 'Seasonal crop',
            'status' => true,
        ]);
    }
}
