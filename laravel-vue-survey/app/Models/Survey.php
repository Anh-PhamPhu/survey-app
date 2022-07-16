<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Luggable\HasSlug;
use Spatie\Sluggabble\SlugOptions;
class Survey extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = ['user_id', 'title', 'slug', 'status', 'description', 'exprire_date'];

    public function getSlugOption(): SlugOptions{
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }
}
