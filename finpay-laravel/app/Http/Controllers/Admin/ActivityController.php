<?php

namespace App\Http\Controllers\Admin;

use App\Models\AuditLog;

class ActivityController extends AdminController
{
    public function index()
    {
        return view('admin.activity', ['logs' => AuditLog::with('user')->latest('created_at')->paginate(50)]);
    }
}
