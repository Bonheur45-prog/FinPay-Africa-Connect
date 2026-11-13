<?php

namespace Tests\Feature;

use App\Models\Lead;
use App\Models\Post;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicSiteTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedContent();
    }

    public function test_root_redirects_to_a_language(): void
    {
        $this->get('/', ['Accept-Language' => 'fr-FR,fr;q=0.9'])->assertRedirect('/fr');
        $this->get('/', ['Accept-Language' => 'rw-RW'])->assertRedirect('/fr');
        $this->get('/', ['Accept-Language' => 'en-GB,en;q=0.9'])->assertRedirect('/en');
    }

    public function test_every_public_page_renders_in_both_languages(): void
    {
        foreach (['fr', 'en'] as $l) {
            foreach (['', '/about', '/solutions', '/partners', '/investors', '/contact-us', '/blog', '/privacy-policy', '/terms', '/cookies',
                '/solutions/cross-border', '/solutions/diaspora', '/solutions/api', '/solutions/cards', '/solutions/kyc'] as $path) {
                $this->get("/$l$path")->assertOk()->assertSee('<html lang="'.$l.'"', false);
            }
        }
    }

    public function test_home_shows_cms_content_and_seo_tags(): void
    {
        $this->get('/en')->assertOk()
            ->assertSee('corner of Africa')
            ->assertSee('hreflang="fr"', false)
            ->assertSee('rel="canonical"', false)
            ->assertSee('application/ld+json', false);
        $this->get('/fr')->assertSee('de l&#039;Afrique', false);
    }

    public function test_unknown_pages_and_solutions_return_404(): void
    {
        $this->get('/fr/does-not-exist')->assertNotFound();
        $this->get('/en/solutions/nope')->assertNotFound();
        $this->get('/de')->assertNotFound();
    }

    public function test_cms_redirects_work(): void
    {
        $this->get('/fr/solutions/payments')->assertRedirect(url('/fr/solutions/cross-border'))->assertStatus(301);
    }

    public function test_draft_posts_are_hidden_and_published_posts_listed(): void
    {
        $post = Post::first();
        $this->get('/en/blog/'.$post->slug)->assertNotFound();
        $post->update(['status' => 'published', 'published_at' => now()->subDay()]);
        $this->get('/en/blog')->assertSee($post->t('title', 'en'));
        $this->get('/en/blog/'.$post->slug)->assertOk()->assertSee($post->t('title', 'en'));
    }

    public function test_sitemap_and_robots(): void
    {
        $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'application/xml')->assertSee('/en/solutions/kyc');
        $this->get('/robots.txt')->assertOk()->assertSee('Disallow: /admin');
    }

    public function test_contact_form_stores_the_enquiry_and_confirms(): void
    {
        $this->from('/en/contact-us')->post('/en/contact', [
            'type' => 'investor', 'first_name' => 'Amina', 'last_name' => 'Uwase', 'email' => 'amina@example.com',
            'message' => 'We would like to receive the pitch deck.', 'consent' => '1',
        ])->assertRedirect()->assertSessionHas('contact_success');

        $lead = Lead::first();
        $this->assertSame('investor', $lead->type);
        $this->assertSame('en', $lead->locale);
        $this->assertSame('new', $lead->status);
    }

    public function test_contact_form_validates_and_never_fakes_success(): void
    {
        $this->post('/fr/contact', ['type' => 'partnership', 'first_name' => 'A', 'last_name' => 'B', 'email' => 'not-an-email', 'message' => 'short'])
            ->assertSessionHasErrors(['email', 'message', 'organization', 'consent'])
            ->assertSessionMissing('contact_success');

        // Honeypot filled: rejected, nothing stored, no success message.
        $this->post('/fr/contact', ['website' => 'spam.example', 'type' => 'general', 'first_name' => 'Bot', 'last_name' => 'Bot',
            'email' => 'bot@example.com', 'message' => 'Buy cheap things now', 'consent' => '1'])
            ->assertSessionHas('contact_error')->assertSessionMissing('contact_success');

        $this->assertSame(0, Lead::count());
    }

    public function test_newsletter_subscribe_and_unsubscribe(): void
    {
        $this->from('/fr')->post('/fr/newsletter', ['email' => 'Reader@Example.com'])->assertSessionHas('newsletter_success');
        $sub = Subscriber::first();
        $this->assertSame('reader@example.com', $sub->email);
        $this->get('/newsletter/unsubscribe/'.$sub->token)->assertOk();
        $this->assertSame('unsubscribed', $sub->fresh()->status);
        $this->get('/newsletter/unsubscribe/wrong-token')->assertNotFound();
    }
}
