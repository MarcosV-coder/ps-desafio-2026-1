<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(): void
        {
            $categories = [
                ['name' => 'Equipamentos'],
                ['name' => 'Vestuários'],
                ['name' => 'Suplementos'],
                ['name' => 'Acessórios'],
            ];
        foreach ($categories as $category) {
            Category::firstOrCreate($category);
        }
    }
}