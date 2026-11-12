<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * FinPay Africa custom CMS schema.
 *
 * Translatable fields are JSON columns shaped {"fr": "...", "en": "..."}
 * (see App\Models\Concerns\HasTranslations).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->timestamps();
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('path');                 // relative to the media disk
            $table->string('filename');
            $table->string('mime', 100);
            $table->unsignedBigInteger('size')->default(0);
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->json('variants')->nullable();   // {"sm": "path", "md": "path"}
            $table->json('alt')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();        // "home", "about", "privacy-policy" ...
            $table->string('system_key')->nullable()->unique(); // fixed pages the site routes rely on
            $table->json('title');
            $table->json('meta_title')->nullable();
            $table->json('meta_description')->nullable();
            $table->foreignId('og_image_id')->nullable()->constrained('media')->nullOnDelete();
            $table->json('sections')->nullable();    // ordered blocks, see config/blocks.php
            $table->string('status', 20)->default('published'); // draft | published
            $table->boolean('show_in_footer')->default(false);
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('icon', 50)->default('layers');
            $table->json('tag')->nullable();
            $table->json('title');
            $table->json('summary')->nullable();
            $table->foreignId('image_id')->nullable()->constrained('media')->nullOnDelete();
            $table->json('meta_title')->nullable();
            $table->json('meta_description')->nullable();
            $table->json('sections')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->string('status', 20)->default('published');
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('logo_id')->nullable()->constrained('media')->nullOnDelete();
            $table->string('category', 30)->default('financial'); // financial | technology | mobile_money | commerce
            $table->json('partnership_type')->nullable();
            $table->json('description')->nullable();
            $table->string('since', 10)->nullable();
            $table->json('region')->nullable();
            $table->string('website')->nullable();
            $table->boolean('show_in_logo_bar')->default(false);
            $table->unsignedInteger('sort')->default(0);
            $table->string('status', 20)->default('published');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('role')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 40)->nullable();
            $table->json('location')->nullable();
            $table->json('availability')->nullable();
            $table->foreignId('photo_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('show_on_contact')->default(true);
            $table->unsignedInteger('sort')->default(0);
            $table->string('status', 20)->default('published');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignId('cover_id')->nullable()->constrained('media')->nullOnDelete();
            $table->json('title');
            $table->json('excerpt')->nullable();
            $table->json('body')->nullable();          // sanitized HTML per locale
            $table->string('author_name')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedSmallInteger('reading_minutes')->default(3);
            $table->string('status', 20)->default('draft'); // draft | published
            $table->timestamp('published_at')->nullable();
            $table->boolean('featured')->default(false);
            $table->json('meta_title')->nullable();
            $table->json('meta_description')->nullable();
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'published_at']);
        });

        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('type', 30)->default('general'); // general | partnership | investor
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('email');
            $table->string('phone', 40)->nullable();
            $table->string('organization')->nullable();
            $table->text('message');
            $table->string('locale', 5)->default('fr');
            $table->string('status', 20)->default('new'); // new | read | replied | archived
            $table->text('notes')->nullable();
            $table->string('source_url')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->boolean('email_sent')->default(false);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'created_at']);
        });

        Schema::create('subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('locale', 5)->default('fr');
            $table->string('status', 20)->default('active'); // active | unsubscribed
            $table->string('token', 64)->unique();
            $table->string('ip', 45)->nullable();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('redirects', function (Blueprint $table) {
            $table->id();
            $table->string('from_path')->unique();
            $table->string('to_path');
            $table->unsignedSmallInteger('code')->default(301);
            $table->unsignedBigInteger('hits')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('content_versions', function (Blueprint $table) {
            $table->id();
            $table->morphs('versionable');
            $table->json('data');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action', 40);            // created | updated | deleted | restored | login ...
            $table->string('subject_type')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->string('summary');
            $table->string('ip', 45)->nullable();
            $table->timestamp('created_at')->nullable();
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        foreach (['audit_logs', 'content_versions', 'redirects', 'subscribers', 'leads', 'posts', 'categories',
            'team_members', 'partners', 'solutions', 'pages', 'media', 'settings'] as $t) {
            Schema::dropIfExists($t);
        }
    }
};
