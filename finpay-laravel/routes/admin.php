<?php

use App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', [Admin\AuthController::class, 'showLogin'])->name('login');
        Route::post('login', [Admin\AuthController::class, 'login'])->middleware('throttle:login')->name('login.attempt');
    });

    Route::middleware(['auth', \App\Http\Middleware\EnsureActiveUser::class])->group(function () {
        Route::post('logout', [Admin\AuthController::class, 'logout'])->name('logout');
        Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

        Route::resource('pages', Admin\PageController::class)->except('show');
        Route::post('pages/{page}/duplicate', [Admin\PageController::class, 'duplicate'])->name('pages.duplicate');
        Route::resource('solutions', Admin\SolutionController::class)->except('show');
        Route::post('solutions/reorder', [Admin\SolutionController::class, 'reorder'])->name('solutions.reorder');
        Route::resource('posts', Admin\PostController::class)->except('show');
        Route::resource('categories', Admin\CategoryController::class)->except(['show', 'create', 'edit']);
        Route::resource('partners', Admin\PartnerController::class)->except('show');
        Route::resource('team', Admin\TeamController::class)->except('show')->parameters(['team' => 'member']);

        Route::get('media', [Admin\MediaController::class, 'index'])->name('media.index');
        Route::get('media/picker', [Admin\MediaController::class, 'picker'])->name('media.picker');
        Route::post('media', [Admin\MediaController::class, 'store'])->name('media.store');
        Route::put('media/{media}', [Admin\MediaController::class, 'update'])->name('media.update');
        Route::delete('media/{media}', [Admin\MediaController::class, 'destroy'])->name('media.destroy');

        Route::get('leads/export', [Admin\LeadController::class, 'export'])->name('leads.export');
        Route::resource('leads', Admin\LeadController::class)->only(['index', 'show', 'update', 'destroy']);
        Route::get('subscribers/export', [Admin\SubscriberController::class, 'export'])->name('subscribers.export');
        Route::resource('subscribers', Admin\SubscriberController::class)->only(['index', 'destroy']);

        Route::post('versions/{version}/restore', [Admin\VersionController::class, 'restore'])->name('versions.restore');

        Route::get('account', [Admin\AccountController::class, 'edit'])->name('account');
        Route::put('account', [Admin\AccountController::class, 'update'])->name('account.update');

        Route::middleware(\App\Http\Middleware\EnsureAdmin::class)->group(function () {
            Route::get('settings/{group?}', [Admin\SettingsController::class, 'edit'])->name('settings')->where('group', 'general|contact|navigation|footer|seo');
            Route::put('settings/{group}', [Admin\SettingsController::class, 'update'])->name('settings.update');
            Route::resource('redirects', Admin\RedirectController::class)->except(['show', 'create', 'edit']);
            Route::resource('users', Admin\UserController::class)->except('show');
            Route::get('activity', [Admin\ActivityController::class, 'index'])->name('activity');
            Route::get('trash', [Admin\TrashController::class, 'index'])->name('trash');
            Route::post('trash/{type}/{id}/restore', [Admin\TrashController::class, 'restore'])->name('trash.restore');
            Route::delete('trash/{type}/{id}', [Admin\TrashController::class, 'destroy'])->name('trash.destroy');
        });
    });
});
