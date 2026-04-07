<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class SportArticle extends Model
{
    /** @use HasFactory<\Database\Factories\SportArticleFactory> */
    use HasFactory,HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id'
    ];

    public function category (){
        return $this->belongsTo(category::class, 'caregory_id', 'id');
    }

    protected static function booted(){
        self::deleted(function(SportArticle $sportArticle){
         try {
            $image_name = explode ('sportArticle/', $sportArticle['image']);
            Storage::disk('public')->delete('sportArticle/'.$image_name[1]);
        }   catch (Throwable) {}
        });
    }
}
