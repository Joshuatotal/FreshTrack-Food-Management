<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create is used to create a new database table.
        // The first argument 'products' is the name of the table.
        // The closure receives a Blueprint object used to define the new table's columns.
        Schema::create('products', function (Blueprint $table) {
            // $table->id() creates an auto-incrementing, unsigned BIGINT primary key column named 'id'.
            // It is the standard way to define a primary key in Laravel.
            $table->id();

            // $table->string('product') creates a VARCHAR equivalent column.
            // By default, it has a maximum length of 255 characters, ideal for short text like names or titles.
            $table->string('product');

            // $table->decimal('price', 8, 2) creates a DECIMAL equivalent column.
            // '8' is the total number of digits it can store (precision).
            // '2' is the number of digits to the right of the decimal point (scale).
            // E.g., it can store up to 999999.99. Perfect for currency values.
            $table->decimal('price', 8, 2);

            // $table->timestamps() creates two TIMESTAMP columns: 'created_at' and 'updated_at'.
            // Eloquent ORM will automatically update these when you create or update records.
            $table->timestamps();
        });

        /*
        |--------------------------------------------------------------------------
        | Guide to Other Common Data Types in Laravel Migrations
        |--------------------------------------------------------------------------
        |
        | $table->text('description');
        |    // Creates a TEXT column for longer strings/paragraphs.
        |
        | $table->integer('stock');
        |    // Creates an INTEGER column for whole numbers.
        |
        | $table->boolean('is_active')->default(true);
        |    // Creates a BOOLEAN/TINYINT column, useful for true/false flags.
        |
        | $table->date('release_date');
        |    // Creates a DATE column.
        |
        | $table->enum('status', ['draft', 'published', 'archived']);
        |    // Creates an ENUM column allowing only specific string values.
        |
        | $table->foreignId('category_id')->constrained()->onDelete('cascade');
        |    // Creates a BIGINT column and sets up a foreign key constraint to the 'categories' table.
        |
        | $table->json('options')->nullable();
        |    // Creates a JSON column. ->nullable() allows this column to be left empty (NULL).
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
