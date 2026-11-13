<?php

namespace App\Support;

use DOMDocument;
use DOMElement;
use DOMNode;

/** Allow-list HTML sanitizer for rich text coming from the admin editor. */
class HtmlSanitizer
{
    private const TAGS = [
        'p' => [], 'br' => [], 'strong' => [], 'b' => [], 'em' => [], 'i' => [], 'u' => [], 's' => [],
        'a' => ['href', 'target', 'rel'], 'ul' => [], 'ol' => [], 'li' => [], 'h2' => [], 'h3' => [], 'h4' => [],
        'blockquote' => [], 'code' => [], 'pre' => [], 'hr' => [], 'img' => ['src', 'alt', 'width', 'height'],
        'figure' => [], 'figcaption' => [], 'table' => [], 'thead' => [], 'tbody' => [], 'tr' => [], 'th' => [], 'td' => [],
    ];

    public static function clean(?string $html): string
    {
        $html = trim((string) $html);
        if ($html === '' || $html === '<p></p>') {
            return '';
        }
        $doc = new DOMDocument;
        libxml_use_internal_errors(true);
        $doc->loadHTML('<?xml encoding="utf-8"?><div id="__root">'.$html.'</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        $root = $doc->getElementById('__root');
        if (! $root) {
            return e(strip_tags($html));
        }
        self::walk($root);
        $out = '';
        foreach ($root->childNodes as $child) {
            $out .= $doc->saveHTML($child);
        }

        return trim($out);
    }

    private static function walk(DOMNode $node): void
    {
        foreach (iterator_to_array($node->childNodes) as $child) {
            if ($child->nodeType === XML_COMMENT_NODE || $child->nodeType === XML_PI_NODE) {
                $node->removeChild($child);
                continue;
            }
            if (! $child instanceof DOMElement) {
                continue;
            }
            $tag = strtolower($child->tagName);
            if (in_array($tag, ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'svg', 'math'], true)) {
                $node->removeChild($child);
                continue;
            }
            if (! array_key_exists($tag, self::TAGS)) {
                self::walk($child);
                while ($child->firstChild) {           // unwrap unknown tags, keep their text
                    $node->insertBefore($child->firstChild, $child);
                }
                $node->removeChild($child);
                continue;
            }
            foreach (iterator_to_array($child->attributes) as $attr) {
                $name = strtolower($attr->name);
                if (! in_array($name, self::TAGS[$tag], true)) {
                    $child->removeAttribute($attr->name);
                    continue;
                }
                if (in_array($name, ['href', 'src'], true) && ! self::safeUrl($attr->value)) {
                    $child->removeAttribute($attr->name);
                }
            }
            if ($tag === 'a') {
                $href = $child->getAttribute('href');
                if (preg_match('#^https?://#i', $href) && ! str_contains($href, (string) parse_url(config('app.url'), PHP_URL_HOST))) {
                    $child->setAttribute('target', '_blank');
                    $child->setAttribute('rel', 'noopener noreferrer');
                } elseif ($child->getAttribute('target') !== '_blank') {
                    $child->removeAttribute('target');
                }
            }
            self::walk($child);
        }
    }

    private static function safeUrl(string $url): bool
    {
        $url = trim(html_entity_decode($url));

        return (bool) preg_match('#^(https?://|mailto:|tel:|/|\#)#i', $url);
    }
}
