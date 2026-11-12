<?php

namespace App\Http\Controllers\Admin;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends AdminController
{
    public function index(Request $request)
    {
        return view('admin.subscribers.index', [
            'subscribers' => Subscriber::query()
                ->when($request->filled('q'), fn ($q) => $q->where('email', 'like', '%'.$request->q.'%'))
                ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
                ->latest()->paginate(50)->withQueryString(),
            'active' => Subscriber::where('status', 'active')->count(),
        ]);
    }

    public function destroy(Subscriber $subscriber)
    {
        $subscriber->delete();

        return back()->with('status', 'Subscriber removed.');
    }

    public function export()
    {
        $rows = Subscriber::where('status', 'active')->orderBy('created_at')->get();

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF");
            fputcsv($out, ['Email', 'Language', 'Subscribed at', 'Unsubscribe link']);
            foreach ($rows as $s) {
                fputcsv($out, [LeadController::csvSafe($s->email), $s->locale, $s->created_at->format('Y-m-d H:i'), route('newsletter.unsubscribe', $s->token)]);
            }
            fclose($out);
        }, 'finpay-subscribers-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
