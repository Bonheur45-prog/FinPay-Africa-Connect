<?php

namespace App\Http\Controllers\Admin;

use App\Models\ContentVersion;
use App\Models\Page;
use App\Models\Post;
use App\Models\Solution;

class VersionController extends AdminController
{
    public function restore(ContentVersion $version)
    {
        $model = $version->versionable;
        abort_unless($model instanceof Page || $model instanceof Solution || $model instanceof Post, 404);
        $model->restoreVersion($version);

        return back()->with('status', 'Earlier version restored.');
    }
}
