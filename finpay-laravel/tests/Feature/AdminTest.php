<?php

namespace Tests\Feature;

use App\Models\Lead;
use App\Models\Media;
use App\Models\Page;
use App\Models\Post;
use App\Models\Setting;
use App\Models\Solution;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedContent();
    }

    public function test_guests_are_sent_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
        $this->get('/admin/login')->assertOk();
    }

    public function test_login_and_logout(): void
    {
        $user = $this->admin();
        $this->post('/admin/login', ['email' => $user->email, 'password' => 'wrong'])->assertSessionHasErrors('email');
        $this->post('/admin/login', ['email' => $user->email, 'password' => 'secret-pass-123'])->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
        $this->post('/admin/logout')->assertRedirect('/admin/login');
        $this->assertGuest();
    }

    public function test_disabled_users_cannot_sign_in(): void
    {
        $user = $this->admin();
        $user->update(['is_active' => false]);
        $this->post('/admin/login', ['email' => $user->email, 'password' => 'secret-pass-123'])->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_every_admin_screen_renders(): void
    {
        $this->actingAs($this->admin());
        Lead::create(['type' => 'general', 'first_name' => 'Jean', 'last_name' => 'Doe', 'email' => 'j@example.com', 'message' => 'Hello there team']);
        $page = Page::first();
        $routes = ['/admin', '/admin/pages', '/admin/pages/create', "/admin/pages/{$page->id}/edit", '/admin/solutions', '/admin/solutions/create',
            '/admin/solutions/'.Solution::first()->id.'/edit', '/admin/posts', '/admin/posts/create', '/admin/posts/'.Post::first()->id.'/edit',
            '/admin/partners', '/admin/partners/create', '/admin/team', '/admin/team/create', '/admin/media', '/admin/media/picker',
            '/admin/leads', '/admin/leads/'.Lead::first()->id, '/admin/subscribers', '/admin/settings', '/admin/settings/contact',
            '/admin/settings/navigation', '/admin/settings/footer', '/admin/settings/seo', '/admin/redirects', '/admin/users',
            '/admin/users/create', '/admin/activity', '/admin/trash', '/admin/account'];
        foreach ($routes as $r) {
            $this->get($r)->assertOk();
        }
    }

    public function test_editors_cannot_open_admin_only_sections(): void
    {
        $this->actingAs($this->admin('editor'));
        $this->get('/admin/pages')->assertOk();
        $this->get('/admin/settings')->assertForbidden();
        $this->get('/admin/users')->assertForbidden();
    }

    public function test_page_blocks_are_saved_and_sanitized(): void
    {
        $this->actingAs($this->admin());
        $page = Page::where('slug', 'privacy-policy')->first();
        $sections = [
            ['id' => 'b_test0001', 'type' => 'rich_text', 'visible' => true, 'data' => ['title' => ['fr' => 'Titre', 'en' => 'Title'],
                'body' => ['fr' => '<p onclick="x()">Bonjour<script>alert(1)</script> <a href="javascript:alert(1)">lien</a></p>', 'en' => '<p>Hello</p>']]],
            ['id' => 'bad', 'type' => 'not_a_block', 'data' => []],
        ];
        $this->put("/admin/pages/{$page->id}", [
            'title' => ['fr' => 'Confidentialité', 'en' => 'Privacy'], 'slug' => 'privacy-policy', 'status' => 'published',
            'sections' => json_encode($sections),
        ])->assertSessionHasNoErrors()->assertRedirect();

        $saved = $page->fresh()->sections;
        $this->assertCount(1, $saved);
        $html = $saved[0]['data']['body']['fr'];
        $this->assertStringNotContainsString('<script', $html);
        $this->assertStringNotContainsString('onclick', $html);
        $this->assertStringNotContainsString('javascript:', $html);
        $this->assertGreaterThan(0, $page->versions()->count());

        $this->get('/en/privacy-policy')->assertSee('Hello');
    }

    public function test_core_pages_cannot_be_deleted(): void
    {
        $this->actingAs($this->admin());
        $this->delete('/admin/pages/'.Page::where('system_key', 'home')->first()->id)->assertForbidden();
    }

    public function test_article_can_be_created_and_published(): void
    {
        $this->actingAs($this->admin());
        $this->post('/admin/posts', [
            'title' => ['fr' => 'Nouvel article', 'en' => 'New article'], 'slug' => 'new-article', 'status' => 'published',
            'excerpt' => ['fr' => 'Résumé', 'en' => 'Summary'], 'body' => ['fr' => '<p>Texte</p>', 'en' => '<h2>Heading</h2><p>Body text</p>'],
        ])->assertSessionHasNoErrors();
        $this->get('/en/blog/new-article')->assertOk()->assertSee('Body text');
    }

    public function test_media_upload_creates_variants(): void
    {
        $this->actingAs($this->admin());
        $file = UploadedFile::fake()->image('photo.jpg', 1600, 900);
        $this->postJson('/admin/media', ['files' => [$file]])->assertOk()->assertJsonPath('data.0.is_image', true);
        $media = Media::latest('id')->first();
        $this->assertSame(1600, $media->width);
        $this->assertArrayHasKey('md', $media->variants);
        $this->assertFileExists($this->mediaRoot.'/'.$media->variants['sm']);

        $this->postJson('/admin/media', ['files' => [UploadedFile::fake()->create('evil.php', 10, 'application/x-php')]])->assertStatus(422);
    }

    public function test_settings_update_is_reflected_on_the_site(): void
    {
        $this->actingAs($this->admin());
        $this->put('/admin/settings/contact', ['email' => 'hello@finpay-africa.com', 'phone' => '+250 700 000 000',
            'address' => ['fr' => 'Kigali', 'en' => 'Kigali'], 'hours' => ['fr' => '', 'en' => ''], 'response_time' => ['fr' => '', 'en' => '']])
            ->assertSessionHasNoErrors();
        $this->assertSame('hello@finpay-africa.com', Setting::get('contact.email'));
        $this->get('/en')->assertSee('hello@finpay-africa.com');
    }

    public function test_leads_export_neutralises_spreadsheet_formulas(): void
    {
        $this->actingAs($this->admin());
        Lead::create(['type' => 'general', 'first_name' => '=HYPERLINK("x")', 'last_name' => 'Doe', 'email' => 'j@example.com', 'message' => 'Hello there team']);
        $csv = $this->get('/admin/leads/export')->assertOk()->streamedContent();
        $this->assertStringContainsString("'=HYPERLINK", $csv);
    }

    public function test_last_admin_cannot_be_demoted(): void
    {
        $me = $this->admin();
        $this->actingAs($me);
        $this->delete('/admin/users/'.$me->id)->assertSessionHas('error');
    }

    public function test_an_earlier_version_can_be_restored(): void
    {
        $this->actingAs($this->admin());
        $post = Post::first();
        $original = $post->t('title', 'en');
        $post->update(['title' => ['fr' => 'Modifié', 'en' => 'Changed title']]);
        $first = $post->versions()->reorder('id')->first();
        $this->post('/admin/versions/'.$first->id.'/restore')->assertSessionHas('status');
        $this->assertSame($original, $post->fresh()->t('title', 'en'));
    }
}
