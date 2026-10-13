<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // `product` (existing column) holds the product name.
            $table->string('batch_id')->nullable()->after('product');
            $table->string('category')->nullable()->after('batch_id');
            $table->string('quantity')->nullable()->after('category'); // free text, e.g. "32 kg"
            $table->date('expiry_date')->nullable()->after('price');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['batch_id', 'category', 'quantity', 'expiry_date']);
        });
    }
};
