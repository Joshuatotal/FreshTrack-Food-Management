<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all products from the database
        $products = Products::latest()->get();
        //return products as JSON
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductsRequest $request)
    {
        //validate the request
        $validated = $request->validated();
        //create a new product
        $product = Products::create($validated);
        //return the created product as JSON
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductsRequest $request, Products $product)
    {
        //validate the request
        $validated = $request->validated();
        //update the product
        $product->update($validated);
        //return the updated product as JSON
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $product)
    {
        //delete the product
        $product->delete();
        //return a success message as JSON
        return response()->json(null, 204);
    }
}
