<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ['name' => 'Equipamentos', 'slug' => 'equipamentos'];
        ['name' => 'Vestuário', 'slug' => 'vestuario'];
        ['name' => 'Suplementos', 'slug' => 'suplementos'];
        ['name' => 'Acessórios', 'slug' => 'acessorios'];
    }
}
