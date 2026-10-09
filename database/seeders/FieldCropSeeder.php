<?php

namespace Database\Seeders;

use App\Models\Crop;
use App\Models\Farm;
use App\Models\Field;
use App\Models\FieldCrop;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FieldCropSeeder extends Seeder
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

        $fields = Field::where('user_id', $user->id)
            ->where('farm_id', $farm->id)
            ->get();

        if ($fields->isEmpty()) {
            return;
        }

        $crops = Crop::all();

        if ($crops->isEmpty()) {
            return;
        }

        foreach ($fields as $index => $field) {
            $crop = $crops[$index % $crops->count()];

            FieldCrop::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'field_id' => $field->id,
                    'crop_id' => $crop->id,
                ],
                [
                    'season' => 'Kharif',
                    'sowing_date' => now()->toDateString(),
                    'expected_harvest_date' => now()
                        ->addMonths(4)
                        ->toDateString(),
                    'area' => $field->area,
                    'status' => 'planned',
                ]
            );
        }
    }
}
