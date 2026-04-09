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
        $randomId = fake()->unique()->numberBetween(1, 1000);
        return [
            'name' => fake()->words(3,true),
            'brand' => fake()->company(),
            'year'=> fake()->year(),
            'price' => fake()->randomFloat(2,50, 1000),
            'image' => "https://loremflickr.com/600/400/fitness?random=". $randomId,
            'amount' => fake()->numberBetween(0,1000),
            'category_id' => Category::inRandomOrder()->value('id'),
        ];
    }
}
