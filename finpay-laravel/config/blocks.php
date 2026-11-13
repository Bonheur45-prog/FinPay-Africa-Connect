<?php

/*
|--------------------------------------------------------------------------
| CMS page blocks
|--------------------------------------------------------------------------
| Every page and solution is an ordered list of blocks:
|   {"id": "b_x1", "type": "hero", "visible": true, "data": {...}}
| The admin editor builds its forms from this file, the server validates and
| sanitizes against it (App\Support\Blocks), and each type renders with
| resources/views/blocks/{type}.blade.php.
|
| Field keys:  type   text|textarea|richtext|image|link|number|toggle|select|icon|repeater
|              t      true = translatable ({"fr": "...", "en": "..."})
|              label  admin label;  help  admin hint;  options  for select;  fields  for repeater
*/

$t = fn (string $label, string $type = 'text', array $extra = []) => ['type' => $type, 't' => true, 'label' => $label] + $extra;
$plain = fn (string $label, string $type = 'text', array $extra = []) => ['type' => $type, 't' => false, 'label' => $label] + $extra;

$heading = [
    'eyebrow' => $t('Eyebrow (small label above the title)'),
    'title' => $t('Title'),
    'subtitle' => $t('Intro text', 'textarea'),
];

$tone = $plain('Background', 'select', ['options' => ['light' => 'White', 'muted' => 'Soft grey', 'dark' => 'Dark navy']]);

return [

    'hero' => [
        'label' => 'Hero',
        'description' => 'Large opening section with title, text and buttons.',
        'fields' => [
            'variant' => $plain('Layout', 'select', ['options' => ['home' => 'Home (with product visual)', 'page' => 'Inner page', 'centered' => 'Centered']]),
            'eyebrow' => $t('Eyebrow'),
            'title' => $t('Title'),
            'highlight' => $t('Highlighted words (shown in brand colour, after the title)'),
            'subtitle' => $t('Intro text', 'textarea'),
            'primary' => $plain('Primary button', 'link'),
            'secondary' => $plain('Secondary button', 'link'),
            'image' => $plain('Image (optional)', 'image'),
            'badges' => $plain('Trust points under the buttons', 'repeater', ['fields' => [
                'icon' => $plain('Icon', 'icon'),
                'label' => $t('Text'),
            ]]),
        ],
    ],

    'logos' => [
        'label' => 'Logo bar',
        'description' => 'Row of partner/client logos. Uses partners marked “Show in logo bar”.',
        'fields' => [
            'title' => $t('Label'),
        ],
    ],

    'features' => [
        'label' => 'Feature grid',
        'description' => 'Grid of icon + title + text cards.',
        'fields' => $heading + [
            'columns' => $plain('Columns', 'select', ['options' => ['3' => '3 columns', '2' => '2 columns', '4' => '4 columns']]),
            'tone' => $tone,
            'items' => $plain('Cards', 'repeater', ['fields' => [
                'icon' => $plain('Icon', 'icon'),
                'label' => $t('Small label (optional)'),
                'title' => $t('Title'),
                'body' => $t('Text', 'textarea'),
            ]]),
        ],
    ],

    'stats' => [
        'label' => 'Key figures',
        'description' => 'Row of big numbers.',
        'fields' => $heading + [
            'tone' => $tone,
            'items' => $plain('Figures', 'repeater', ['fields' => [
                'value' => $t('Value (e.g. 99.9%)'),
                'label' => $t('Label'),
                'note' => $t('Note (optional)'),
            ]]),
            'source' => $t('Footnote / source (optional)'),
        ],
    ],

    'solutions' => [
        'label' => 'Solutions list',
        'description' => 'Cards for every published solution.',
        'fields' => $heading + [
            'cta' => $plain('Button under the list', 'link'),
        ],
    ],

    'split' => [
        'label' => 'Text + image',
        'description' => 'Two columns: rich text with checklist on one side, image on the other.',
        'fields' => $heading + [
            'body' => $t('Text', 'richtext'),
            'bullets' => $plain('Checklist', 'repeater', ['fields' => ['text' => $t('Item')]]),
            'image' => $plain('Image', 'image'),
            'image_side' => $plain('Image side', 'select', ['options' => ['right' => 'Right', 'left' => 'Left']]),
            'facts_title' => $t('Fact card title (shown when no image is set)'),
            'facts' => $plain('Fact card rows', 'repeater', ['fields' => [
                'label' => $t('Label'),
                'value' => $t('Value'),
            ]]),
            'tags' => $plain('Tags', 'repeater', ['fields' => ['text' => $t('Tag')]]),
            'cta' => $plain('Button', 'link'),
            'tone' => $tone,
        ],
    ],

    'steps' => [
        'label' => 'Numbered steps / reasons',
        'description' => 'Numbered list (how it works, reasons to invest…).',
        'fields' => $heading + [
            'tone' => $tone,
            'items' => $plain('Items', 'repeater', ['fields' => [
                'title' => $t('Title'),
                'body' => $t('Text', 'textarea'),
            ]]),
        ],
    ],

    'timeline' => [
        'label' => 'Timeline',
        'fields' => $heading + [
            'items' => $plain('Milestones', 'repeater', ['fields' => [
                'year' => $plain('Year'),
                'tag' => $t('Tag'),
                'title' => $t('Title'),
                'body' => $t('Text', 'textarea'),
            ]]),
        ],
    ],

    'quote' => [
        'label' => 'Quote',
        'fields' => [
            'text' => $t('Quote', 'textarea'),
            'attribution' => $t('Attribution'),
        ],
    ],

    'chart' => [
        'label' => 'Bar comparison',
        'description' => 'Horizontal bars comparing percentages (e.g. transfer cost by region).',
        'fields' => $heading + [
            'unit' => $plain('Unit shown after values', 'text'),
            'items' => $plain('Bars', 'repeater', ['fields' => [
                'label' => $t('Label'),
                'value' => $plain('Value', 'number'),
                'highlight' => $plain('Highlight (brand colour)', 'toggle'),
            ]]),
            'caption' => $t('Caption / source', 'textarea'),
            'points' => $plain('Points next to the chart', 'repeater', ['fields' => [
                'title' => $t('Title'),
                'body' => $t('Text', 'textarea'),
            ]]),
        ],
    ],

    'trust' => [
        'label' => 'Trust & compliance',
        'description' => 'Dark band of security / compliance signals.',
        'fields' => $heading + [
            'items' => $plain('Signals', 'repeater', ['fields' => [
                'icon' => $plain('Icon', 'icon'),
                'label' => $t('Title'),
                'sub' => $t('Text'),
            ]]),
            'note' => $t('Small print (optional)', 'textarea'),
        ],
    ],

    'presence' => [
        'label' => 'Presence / markets',
        'fields' => $heading + [
            'points' => $plain('Key points', 'repeater', ['fields' => ['text' => $t('Point')]]),
            'countries' => $plain('Countries', 'repeater', ['fields' => [
                'name' => $t('Country'),
                'code' => $plain('ISO code (e.g. RW)'),
                'status' => $plain('Status', 'select', ['options' => ['active' => 'Operating', 'expanding' => 'Expanding', 'planned' => 'Planned']]),
            ]]),
        ],
    ],

    'partners' => [
        'label' => 'Partner directory',
        'description' => 'All published partners with category filters.',
        'fields' => $heading + [
            'filters' => $plain('Show category filters', 'toggle'),
        ],
    ],

    'team' => [
        'label' => 'Team contacts',
        'description' => 'Team members marked “Show on contact”.',
        'fields' => $heading,
    ],

    'posts' => [
        'label' => 'Latest articles',
        'fields' => $heading + [
            'count' => $plain('How many', 'number'),
            'cta' => $plain('Button', 'link'),
        ],
    ],

    'faq' => [
        'label' => 'FAQ',
        'fields' => $heading + [
            'items' => $plain('Questions', 'repeater', ['fields' => [
                'q' => $t('Question'),
                'a' => $t('Answer', 'textarea'),
            ]]),
        ],
    ],

    'contact' => [
        'label' => 'Contact form',
        'description' => 'Contact form with enquiry types plus the contact details from Settings.',
        'fields' => $heading + [
            'form_title' => $t('Form title'),
            'note' => $t('Privacy note under the form', 'textarea'),
        ],
    ],

    'cta' => [
        'label' => 'Call to action',
        'fields' => $heading + [
            'primary' => $plain('Primary button', 'link'),
            'secondary' => $plain('Secondary button', 'link'),
            'points' => $plain('Small trust points', 'repeater', ['fields' => ['text' => $t('Text')]]),
        ],
    ],

    'rich_text' => [
        'label' => 'Rich text',
        'description' => 'Free text article (legal pages, long explanations).',
        'fields' => [
            'title' => $t('Title (optional)'),
            'body' => $t('Text', 'richtext'),
        ],
    ],

];
