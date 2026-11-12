<?php

namespace Tests\Unit;

use App\Support\Blocks;
use App\Support\HtmlSanitizer;
use Tests\TestCase;

class HtmlSanitizerTest extends TestCase
{
    public function test_dangerous_markup_is_removed(): void
    {
        $out = HtmlSanitizer::clean('<p style="x" onmouseover="a()">Hi <img src=x onerror=alert(1)><iframe src="//evil"></iframe><a href="javascript:alert(1)">x</a> <a href="https://example.com">ok</a></p><script>bad()</script>');
        $this->assertStringNotContainsString('onmouseover', $out);
        $this->assertStringNotContainsString('onerror', $out);
        $this->assertStringNotContainsString('iframe', $out);
        $this->assertStringNotContainsString('script', $out);
        $this->assertStringNotContainsString('javascript:', $out);
        $this->assertStringContainsString('rel="noopener noreferrer"', $out);
    }

    public function test_internal_links_get_the_current_language(): void
    {
        app()->setLocale('en');
        $this->assertSame(url('en/about'), Blocks::href('/about'));
        $this->assertSame(url('fr/about'), Blocks::href('/fr/about'));
        $this->assertSame('https://example.com', Blocks::href('https://example.com'));
        $this->assertSame('', Blocks::url('javascript:alert(1)'));
    }
}
