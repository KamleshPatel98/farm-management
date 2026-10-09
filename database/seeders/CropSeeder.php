<?php

namespace Database\Seeders;

use App\Models\Crop;
use App\Models\User;
use Illuminate\Database\Seeder;

class CropSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@farm.com')->first();
        if (!$user) {
            return;
        }

        $crops = [
            [
                'name'            => 'Paddy',
                'crop_type'       => 'Cereal',
                'duration_days'   => 120,
                'scientific_name' => 'Oryza sativa',
                'description'     => 'Rice crop commonly cultivated during the Kharif season.',
                'status'          => true,
            ],
            [
                'name'            => 'Wheat',
                'crop_type'       => 'Cereal',
                'duration_days'   => 120,
                'scientific_name' => 'Triticum aestivum',
                'description'     => 'Major Rabi cereal crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Maize',
                'crop_type'       => 'Cereal',
                'duration_days'   => 100,
                'scientific_name' => 'Zea mays',
                'description'     => 'Cereal crop used for food and feed.',
                'status'          => true,
            ],
            [
                'name'            => 'Chickpea',
                'crop_type'       => 'Pulse',
                'duration_days'   => 110,
                'scientific_name' => 'Cicer arietinum',
                'description'     => 'Gram crop commonly grown in the Rabi season.',
                'status'          => true,
            ],
            [
                'name'            => 'Pigeon Pea',
                'crop_type'       => 'Pulse',
                'duration_days'   => 180,
                'scientific_name' => 'Cajanus cajan',
                'description'     => 'Pulse crop also known as Arhar or Toor.',
                'status'          => true,
            ],
            [
                'name'            => 'Okra',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 60,
                'scientific_name' => 'Abelmoschus esculentus',
                'description'     => 'Bhindi crop harvested repeatedly after maturity.',
                'status'          => true,
            ],
            [
                'name'            => 'Chilli',
                'crop_type'       => 'Spice',
                'duration_days'   => 150,
                'scientific_name' => 'Capsicum annuum',
                'description'     => 'Crop cultivated for green or dry chillies.',
                'status'          => true,
            ],
            [
                'name'            => 'Tomato',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 90,
                'scientific_name' => 'Solanum lycopersicum',
                'description'     => 'Vegetable crop with repeated harvesting.',
                'status'          => true,
            ],
            [
                'name'            => 'Potato',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 100,
                'scientific_name' => 'Solanum tuberosum',
                'description'     => 'Tuber vegetable crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Onion',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 120,
                'scientific_name' => 'Allium cepa',
                'description'     => 'Bulb vegetable crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Garlic',
                'crop_type'       => 'Spice',
                'duration_days'   => 150,
                'scientific_name' => 'Allium sativum',
                'description'     => 'Bulb crop used as a spice.',
                'status'          => true,
            ],
            [
                'name'            => 'Turmeric',
                'crop_type'       => 'Spice',
                'duration_days'   => 240,
                'scientific_name' => 'Curcuma longa',
                'description'     => 'Long-duration rhizome spice crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Ginger',
                'crop_type'       => 'Spice',
                'duration_days'   => 240,
                'scientific_name' => 'Zingiber officinale',
                'description'     => 'Rhizome crop used as a spice.',
                'status'          => true,
            ],
            [
                'name'            => 'Groundnut',
                'crop_type'       => 'Oilseed',
                'duration_days'   => 120,
                'scientific_name' => 'Arachis hypogaea',
                'description'     => 'Oilseed and food crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Soybean',
                'crop_type'       => 'Oilseed',
                'duration_days'   => 100,
                'scientific_name' => 'Glycine max',
                'description'     => 'Kharif oilseed and pulse crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Mustard',
                'crop_type'       => 'Oilseed',
                'duration_days'   => 120,
                'scientific_name' => 'Brassica juncea',
                'description'     => 'Rabi oilseed crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Pumpkin',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 100,
                'scientific_name' => 'Cucurbita moschata',
                'description'     => 'Creeping vegetable crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Bitter Gourd',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 70,
                'scientific_name' => 'Momordica charantia',
                'description'     => 'Climbing vegetable also known as Karela.',
                'status'          => true,
            ],
            [
                'name'            => 'Cucumber',
                'crop_type'       => 'Vegetable',
                'duration_days'   => 60,
                'scientific_name' => 'Cucumis sativus',
                'description'     => 'Creeping or climbing vegetable crop.',
                'status'          => true,
            ],
            [
                'name'            => 'Ivy Gourd',
                'crop_type'       => 'Vegetable',
                'duration_days'   => null,
                'scientific_name' => 'Coccinia grandis',
                'description'     => 'Perennial climbing vegetable also known as Kundru.',
                'status'          => true,
            ],
        ];

        foreach ($crops as $crop) {
            Crop::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'name'    => $crop['name'],
                ],
                $crop
            );
        }

        $this->command->info(
            'Crop master data seeded successfully for admin@farm.com user.'
        );
    }
}