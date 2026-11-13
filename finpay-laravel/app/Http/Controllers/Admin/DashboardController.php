<?php

namespace App\Http\Controllers\Admin;

use App\Models\AuditLog;
use App\Models\Lead;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Solution;
use App\Models\Subscriber;

class DashboardController extends AdminController
{
    public function index()
    {
        // Content that still contains TODO markers (placeholder text to replace before launch).
        $todo = collect()
            ->merge(Page::all()->filter(fn ($p) => str_contains(json_encode($p->sections), 'TODO'))->map(fn ($p) => ['Page', $p->t('title'), route('admin.pages.edit', $p)]))
            ->merge(Post::all()->filter(fn ($p) => str_contains(json_encode([$p->title, $p->body]), 'TODO'))->map(fn ($p) => ['Article', $p->t('title'), route('admin.posts.edit', $p)]));

        return view('admin.dashboard', [
            'stats' => [
                ['New messages', Lead::where('status', 'new')->count(), route('admin.leads.index', ['status' => 'new']), 'inbox'],
                ['Messages (30 days)', Lead::where('created_at', '>=', now()->subDays(30))->count(), route('admin.leads.index'), 'message-square'],
                ['Subscribers', Subscriber::where('status', 'active')->count(), route('admin.subscribers.index'), 'mail-plus'],
                ['Published articles', Post::live()->count(), route('admin.posts.index'), 'newspaper'],
            ],
            'leads' => Lead::latest()->limit(6)->get(),
            'activity' => AuditLog::with('user')->latest('created_at')->limit(8)->get(),
            'counts' => [
                'Pages' => [Page::count(), route('admin.pages.index')],
                'Solutions' => [Solution::count(), route('admin.solutions.index')],
                'Partners' => [Partner::count(), route('admin.partners.index')],
                'Articles' => [Post::count(), route('admin.posts.index')],
            ],
            'todo' => $todo,
            'mailConfigured' => filled(config('services.brevo.key')) || ! in_array(config('mail.default'), ['log', 'array'], true),
        ]);
    }
}
