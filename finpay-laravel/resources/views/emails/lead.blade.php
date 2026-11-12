<!DOCTYPE html>
<html><body style="margin:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;color:#0b1220">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e7ec;border-radius:12px;overflow:hidden">
    <tr><td style="background:#0a1322;padding:20px 28px;color:#ffffff;font-size:16px;font-weight:bold">FinPay Africa — New website enquiry</td></tr>
    <tr><td style="padding:28px">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8c1a13;font-weight:bold">{{ __('site.form.types.'.$lead->type, [], 'en') }}</p>
        <h1 style="margin:0 0 20px;font-size:20px">{{ $lead->fullName() }}</h1>
        <table cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;width:100%">
            <tr><td style="color:#5b6474;width:130px">Email</td><td><a href="mailto:{{ $lead->email }}" style="color:#8c1a13">{{ $lead->email }}</a></td></tr>
            @if ($lead->phone)<tr><td style="color:#5b6474">Phone</td><td>{{ $lead->phone }}</td></tr>@endif
            @if ($lead->organization)<tr><td style="color:#5b6474">Organisation</td><td>{{ $lead->organization }}</td></tr>@endif
            <tr><td style="color:#5b6474">Language</td><td>{{ strtoupper($lead->locale) }}</td></tr>
            <tr><td style="color:#5b6474">Received</td><td>{{ $lead->created_at->format('d M Y, H:i') }} UTC</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f6f7f9;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">{{ $lead->message }}</div>
        <p style="margin:24px 0 0"><a href="{{ route('admin.leads.show', $lead) }}" style="display:inline-block;background:#8c1a13;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:999px;font-size:14px;font-weight:bold">Open in the CMS inbox</a></p>
        <p style="margin:16px 0 0;font-size:12px;color:#5b6474">Reply to this email to answer {{ $lead->first_name }} directly.</p>
    </td></tr>
</table>
</td></tr></table>
</body></html>
