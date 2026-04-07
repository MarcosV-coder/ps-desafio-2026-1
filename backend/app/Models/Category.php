<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name'
    ];

    public function sportArticle(){
        return $this->hasMany(SportArticle::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleting(function(Category $category){
            $category->sportArticle()->each(function(SportArticle $sportArticle){
                $sportArticle->delete();
            });
        });
    }
}
