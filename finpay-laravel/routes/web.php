<?php

use App\Http\Controllers\Site\BlogController;
use App\Http\Controllers\Site\FormController;
use App\Http\Controllers\Site\PageController;
use App\Http\Controllers\Site\SeoController;
use App\Http\Middleware\SetLocale;
use App\Support\Locales;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Root: send visitors to their language (French by default).
Route::get('/', function (Request $request) {
    $preferred = $request->getPreferredLanguage(Locales::ALL) ?: Locales::DEFAULT;

    return redirect('/'.(str_starts_with($preferred, 'en') ? 'en' : Locales::DEFAULT), 302);
});

Route::get('sitemap.xml', [SeoController::class, 'sitemap'])->name('sitemap');
Route::get('robots.txt', [SeoController::class, 'robots']);
Route::get('newsletter/unsubscribe/{token}', [FormController::class, 'unsubscribe'])->name('newsletter.unsubscribe');

require __DIR__.'/admin.php';

Route::prefix('{locale}')->where(['locale' => implode('|', Locales::ALL)])->middleware(SetLocale::class)->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('about', [PageController::class, 'system'])->defaults('key', 'about')->name('about');
    Route::get('solutions', [PageController::class, 'system'])->defaults('key', 'solutions')->name('solutions');
    Route::get('solutions/{slug}', [PageController::class, 'solution'])->name('solution');
    Route::get('partners', [PageController::class, 'system'])->defaults('key', 'partners')->name('partners');
    Route::get('investors', [PageController::class, 'system'])->defaults('key', 'investors')->name('investors');
    Route::get('contact-us', [PageController::class, 'system'])->defaults('key', 'contact')->name('contact');
    Route::get('blog', [BlogController::class, 'index'])->name('blog');
    Route::get('blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

    Route::post('contact', [FormController::class, 'contact'])->middleware('throttle:forms')->name('forms.contact');
    Route::post('newsletter', [FormController::class, 'newsletter'])->middleware('throttle:forms')->name('forms.newsletter');

    Route::get('{slug}', [PageController::class, 'custom'])->where('slug', '[a-z0-9\-]+')->name('page');
});

// Anything else: CMS redirects, otherwise 404.
Route::fallback([SeoController::class, 'fallback']);
