<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateAdmin extends Command
{
    protected $signature = 'cms:create-admin {email} {--name=Administrator} {--password=}';

    protected $description = 'Create (or reset) a CMS administrator account';

    public function handle(): int
    {
        $email = strtolower($this->argument('email'));
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Invalid email.');

            return self::FAILURE;
        }
        $password = $this->option('password') ?: Str::password(16);
        User::updateOrCreate(['email' => $email], [
            'name' => $this->option('name'), 'password' => $password, 'role' => 'admin', 'is_active' => true,
        ]);
        $this->info("Administrator ready: {$email}");
        if (! $this->option('password')) {
            $this->line("Temporary password: {$password}");
            $this->warn('Sign in at /admin and change it under “My account”.');
        }

        return self::SUCCESS;
    }
}
