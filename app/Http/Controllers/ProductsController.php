<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * List the logged-in user's products.
     */
    public function index(Request $request)
    {
        return response()->json($request->user()->products()->latest()->get());
    }

    /**
     * Create a product owned by the logged-in user.
     */
    public function store(StoreProductsRequest $request)
    {
        $product = $request->user()->products()->create($request->validated());

        return response()->json($product, 201);
    }

    /**
     * Update one of the logged-in user's products.
     */
    public function update(UpdateProductsRequest $request, Products $product)
    {
        $this->ensureOwner($request, $product);

        $product->update($request->validated());

        return response()->json($product);
    }

    /**
     * Delete one of the logged-in user's products.
     */
    public function destroy(Request $request, Products $product)
    {
        $this->ensureOwner($request, $product);

        $product->delete();

        return response()->json(null, 204);
    }

    // 404 (not 403) so other users' product IDs can't even be probed.
    private function ensureOwner(Request $request, Products $product): void
    {
        abort_unless($product->user_id === $request->user()->id, 404);
    }
}
