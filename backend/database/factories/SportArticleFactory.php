<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SportArticle>
 */
class SportArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'brand' => fake()->word(),
            'year'=> fake()->year(),
            'price' => fake()->randomFloat(2,100, 1000),
            'image' => '/assets/images/logo.png',
            'amount' => fake()->numberBetween(0,1000),
            'category_id' => Category::inRandomOrder()->value('id'),
        ];
    }
}
