<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LeadController extends AdminController
{
    public function index(Request $request)
    {
        $leads = $this->filtered($request)->latest()->paginate(25)->withQueryString();

        return view('admin.leads.index', [
            'leads' => $leads,
            'counts' => Lead::selectRaw('status, count(*) as c')->groupBy('status')->pluck('c', 'status'),
        ]);
    }

    public function show(Lead $lead)
    {
        if ($lead->status === 'new') {
            $lead->update(['status' => 'read']);
        }

        return view('admin.leads.show', ['lead' => $lead]);
    }

    public function update(Request $request, Lead $lead)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(Lead::STATUSES)],
            'notes' => ['nullable', 'string', 'max:5000'],
        ]);
        $lead->update($data);

        return back()->with('status', 'Message updated.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->route('admin.leads.index')->with('status', 'Message moved to the trash.');
    }

    public function export(Request $request)
    {
        $rows = $this->filtered($request)->latest()->get();

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF"); // UTF-8 BOM for Excel
            fputcsv($out, ['Date', 'Type', 'Status', 'First name', 'Last name', 'Email', 'Phone', 'Organisation', 'Language', 'Message', 'Notes']);
            foreach ($rows as $l) {
                fputcsv($out, array_map([self::class, 'csvSafe'], [$l->created_at->format('Y-m-d H:i'), $l->type, $l->status, $l->first_name, $l->last_name,
                    $l->email, $l->phone, $l->organization, $l->locale, $l->message, $l->notes]));
            }
            fclose($out);
        }, 'finpay-messages-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /** Prevent spreadsheet formula injection in exported values. */
    public static function csvSafe(mixed $v): string
    {
        $v = (string) $v;

        return preg_match('/^[=+\-@\t\r]/', $v) ? "'".$v : $v;
    }

    private function filtered(Request $request)
    {
        return Lead::query()
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->status))
            ->when($request->filled('type'), fn ($q) => $q->where('type', $request->type))
            ->when($request->filled('q'), fn ($q) => $q->where(fn ($w) => $w->where('email', 'like', '%'.$request->q.'%')
                ->orWhere('first_name', 'like', '%'.$request->q.'%')->orWhere('last_name', 'like', '%'.$request->q.'%')
                ->orWhere('organization', 'like', '%'.$request->q.'%')));
    }
}
