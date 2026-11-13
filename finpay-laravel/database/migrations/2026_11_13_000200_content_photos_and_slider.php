<?php

use App\Support\ContentUpgrades;
use Illuminate\Database\Migrations\Migration;

/** Adds "Home" to the menu, the home photo slideshow and photo backgrounds on page heroes (runs once). */
return new class extends Migration
{
    public function up(): void
    {
        ContentUpgrades::run();
    }

    public function down(): void
    {
        // Content changes are kept; they can be edited or reverted from the CMS (version history).
    }
};
