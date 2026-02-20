<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function addProduct(Request $request){
        $validator = Validator::make($request->all(), [
            'name_product' => 'required|string|min:10|max:100',
            'price_product' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        Product::create([
            'name_product' => $request->get('name_product'),
            'price_product' => $request->get('price_product'),
        ]);
        return response()->json(['message' => 'Product created successfully'], 201);
    }

    public function getProducts(){
        $products = Product::all();
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }
        return response()->json($products, 200);
    }

    public function getProductById($id){
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product, 200);
    }

    public function updateProductById(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name_product' => 'sometimes|string|min:10|max:100',
            'price_product' => 'sometimes|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        if($request->has('name_product')) {
            $product->name_product = $request->name_product;
        }
        if($request->has('price_product')) {
            $product->price_product = $request->price_product;
        }
        $product->update();
        return response()->json(['message' => 'Product updated successfully'], 200);   
    }     


    public function deleteProductById($id){
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);   
    }
}
