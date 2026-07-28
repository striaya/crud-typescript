<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    return Inertia::render('products/index');
})->name('products.index');
