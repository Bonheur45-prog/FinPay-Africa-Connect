@props(['status'])
@php $map = ['published' => 'a-badge-green', 'draft' => 'a-badge-gray', 'new' => 'a-badge-red', 'read' => 'a-badge-blue', 'replied' => 'a-badge-green', 'archived' => 'a-badge-gray', 'active' => 'a-badge-green', 'unsubscribed' => 'a-badge-gray', 'scheduled' => 'a-badge-amber']; @endphp
<span class="a-badge {{ $map[$status] ?? 'a-badge-gray' }}">{{ ucfirst($status) }}</span>
