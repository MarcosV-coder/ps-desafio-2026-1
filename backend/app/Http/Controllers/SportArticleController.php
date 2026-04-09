<?php

namespace App\Http\Controllers;

use App\Models\SportArticle;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSportArticleRequest;
use App\Http\Requests\UpdateSportArticleRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SportArticleController extends Controller
{
    protected $sportArticle;

    public function __construct(SportArticle $sportArticle)
    {
        $this->sportArticle = $sportArticle;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sportArticle = $this->sportArticle->with('category')->get();
        return response()->json($sportArticle, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSportArticleRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')){
            $path = $request->file('image')->store('sportArticles','public');
            $data['image'] = url ('storage/'.$path);
        }
        
        $sportArticle = $this->sportArticle->create($data);
        $id = $sportArticle->id;
        $sportArticle_category = $this->sportArticle->with('category')->findOrFail($id);

        return response()->json($sportArticle_category,Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $sportArticle = $this->sportArticle->with('category')->findOrFail($id);
        return response()->json($sportArticle,Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSportArticleRequest $request, $id): JsonResponse
    {
        $sportArticle = $this->sportArticle->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                $image_name = explode ('sportArticle/', $sportArticle['image']);
                Storage::disk('public')->delete('sportArticle/'.$image_name[1]);
            } catch (Throwable){
            } finally {
                $path = $request->file('image')->store('sportArticle','public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $sportArticle->update($data);

        return response()->json($sportArticle, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $sportArticle = $this->sportArticle->findOrfail($id);
        $sportArticle->delete();
        return response()->json(['Message' => 'Artigo esportivo deletado com sucesso']);
    }


    public function buy($id): JsonResponse
    {
        $sportArticle = SportArticle::findOrfail($id);

        if ($sportArticle->amount > 0) {
            $sportArticle->decrement('amount',1);
            $sportArticle->refresh();
            return response()->json(['Message' => 'Comprado com sucesso', 'new_amount' => $sportArticle->amount]);
        } else {
            return response()->json(['Message' => 'Estoque esgotado'], Response::HTTP_BAD_REQUEST);
        }  
    }
}
