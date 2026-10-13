<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return true if the user is authenticated
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        //validate the request
        return [
            'product' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Guide to Common Validation Rules in Laravel
    |--------------------------------------------------------------------------
    |
    | 'email'      => ['required', 'email', 'unique:users,email'], 
    |                 // Must be a valid email and unique in the 'users' table's 'email' column.
    |
    | 'password'   => ['required', 'string', 'min:8', 'confirmed'], 
    |                 // Must be at least 8 chars and match a 'password_confirmation' field.
    |
    | 'age'        => ['required', 'integer', 'min:18', 'max:100'], 
    |                 // Must be a whole number between 18 and 100.
    |
    | 'role'       => ['required', 'in:admin,editor,user'], 
    |                 // Value must be one of the listed options.
    |
    | 'is_active'  => ['boolean'], 
    |                 // Must be able to be cast as a boolean (true, false, 1, 0, "1", and "0").
    |
    | 'avatar'     => ['nullable', 'image', 'mimes:jpg,png,jpeg', 'max:2048'], 
    |                 // Optional file, must be an image of specific types, max 2MB in size.
    |
    | 'tags'       => ['required', 'array'], 
    |                 // Must be a valid PHP array.
    | 'tags.*'     => ['string', 'max:50'], 
    |                 // Each item within the 'tags' array must be a string up to 50 chars.
    */
}
