<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SportArticle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SportArticleSeeder extends Seeder
{
    public function run(): void
    {
        // Seus 4 produtos vitrine, com todos os campos que você definiu
        $sportArticles = [
            [
                'name' => 'Tênis de Corrida Nike',
                'brand' => 'Nike',
                'year' => 2024,
                'price' => 299.90,
                'image' => '/assets/images/tenis.avif', 
                'amount' => 50,
                'category_id' => 1, 
            ],
            [
                'name' => 'Camisa Térmica Adapti',
                'brand' => 'AdaptiWear',
                'year' => 2023,
                'price' => 89.90,
                'image' => '/assets/images/termica.jpg',
                'amount' => 100,
                'category_id' => 2, 
            ],
            [
                'name' => 'Whey Protein Isolado',
                'brand' => 'Max Titanium',
                'year' => 2024,
                'price' => 150.00,
                'image' => '/assets/images/whey.webp',
                'amount' => 30,
                'category_id' => 3, 
            ],
            [
                'name' => 'Mochila Esportiva',
                'brand' => 'Adidas',
                'year' => 2022,
                'price' => 120.00,
                'image' => '/assets/images/bolsa.webp',
                'amount' => 20,
                'category_id' => 4,
            ]
        ];


        foreach ($sportArticles as $data) {
            $categoryName = match($data ['category_id']){
                1 => 'Equipamentos',
                2 => 'Vestuários',
                3 => 'Suplementos',
                4 => 'Acessórios', 
            };
            $category = Category::where('name', $categoryName)->first();
            if ($category) {
                $data['category_id'] = $category->id; 
                SportArticle::firstOrCreate(['name' => $data['name']], $data);
            }
        }
    }
}