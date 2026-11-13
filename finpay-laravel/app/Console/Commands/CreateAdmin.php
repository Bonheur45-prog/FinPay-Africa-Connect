<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateAdmin extends Command
{
    protected $signature = 'cms:create-admin {email?} {--name=Administrator} {--password=}
        {--from-env : Read ADMIN_EMAIL / ADMIN_PASSWORD from the environment}
        {--if-none : Do nothing when an administrator already exists}';

    protected $description = 'Create (or reset) a CMS administrator account';

    public function handle(): int
    {
        if ($this->option('if-none') && User::where('role', 'admin')->exists()) {
            $this->line('An administrator already exists — nothing to do.');

            return self::SUCCESS;
        }
        $email = strtolower((string) ($this->option('from-env') ? config('services.admin.email') : $this->argument('email')));
        $given = $this->option('from-env') ? (string) config('services.admin.password') : (string) $this->option('password');
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->warn('No valid admin email given (set the ADMIN_EMAIL secret) — skipped.');

            return $this->option('from-env') ? self::SUCCESS : self::FAILURE;
        }
        if ($this->option('from-env') && $given === '') {
            $this->warn('ADMIN_PASSWORD secret is empty — skipped so no password is printed in logs.');

            return self::SUCCESS;
        }
        $password = $given ?: Str::password(16);
        User::updateOrCreate(['email' => $email], [
            'name' => $this->option('name'), 'password' => $password, 'role' => 'admin', 'is_active' => true,
        ]);
        $this->info("Administrator ready: {$email}");
        if ($given === '') {
            $this->line("Temporary password: {$password}");
            $this->warn('Sign in at /admin and change it under “My account”.');
        }

        return self::SUCCESS;
    }
}
