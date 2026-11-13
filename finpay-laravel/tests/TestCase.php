<?php

namespace Tests;

use App\Models\User;
use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\File;

abstract class TestCase extends BaseTestCase
{
    protected string $mediaRoot;

    protected function setUp(): void
    {
        parent::setUp();
        // Keep test uploads out of public/media.
        $this->mediaRoot = storage_path('framework/testing/media-'.getmypid());
        File::ensureDirectoryExists($this->mediaRoot);
        config(['filesystems.disks.media.root' => $this->mediaRoot, 'services.brevo.key' => null, 'services.turnstile.secret_key' => null]);
        $this->withoutVite();
    }

    protected function tearDown(): void
    {
        File::deleteDirectory($this->mediaRoot);
        parent::tearDown();
    }

    protected function seedContent(): void
    {
        $this->seed(ContentSeeder::class);
    }

    protected function admin(string $role = 'admin'): User
    {
        return User::create(['name' => 'Test '.$role, 'email' => $role.'@tests.local', 'password' => 'secret-pass-123', 'role' => $role, 'is_active' => true]);
    }
}
