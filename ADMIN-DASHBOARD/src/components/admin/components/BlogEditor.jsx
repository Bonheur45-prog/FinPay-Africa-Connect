import React, { useState, useRef, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Upload, X, Eye, EyeOff, ChevronDown, ChevronUp,
  Type, Heading2, Heading3, List, AlignLeft, Image as ImageIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import blogAPI from "../../../services/blogAPI.js";
import styles from './BlogEditor.module.css';

// ─── Helpers ────────────────────────────────────────────────────────────────

const CATEGORIES = ['product', 'engineering', 'growth', 'security', 'design', 'culture'];

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .trim();

const emptyBlog = () => ({
  title:          { en: '', fr: '' },
  description:    { en: '', fr: '' },
  content:        { en: '', fr: '' },
  excerpt:        { en: '', fr: '' },
  slug:           '',
  category:       'product',
  tags:           '',           // comma-separated string in form
  status:         'draft',
  featured:       false,
  author:         { name: '', avatar: '', bio: { en: '', fr: '' } },
  seoTitle:       { en: '', fr: '' },
  seoDescription: { en: '', fr: '' },
  seoKeywords:    { en: '', fr: '' }, // comma-separated string in form
});

const blogToForm = (blog) => ({
  title:          { en: blog.title?.en ?? '', fr: blog.title?.fr ?? '' },
  description:    { en: blog.description?.en ?? '', fr: blog.description?.fr ?? '' },
  content:        { en: blog.content?.en ?? '', fr: blog.content?.fr ?? '' },
  excerpt:        { en: blog.excerpt?.en ?? '', fr: blog.excerpt?.fr ?? '' },
  slug:           blog.slug ?? '',
  category:       blog.category ?? 'product',
  tags:           (blog.tags ?? []).join(', '),
  status:         blog.status ?? 'draft',
  featured:       blog.featured ?? false,
  author: {
    name:   blog.author?.name ?? '',
    avatar: blog.author?.avatar ?? '',
    bio:    { en: blog.author?.bio?.en ?? '', fr: blog.author?.bio?.fr ?? '' },
  },
  seoTitle:       { en: blog.seoTitle?.en ?? '', fr: blog.seoTitle?.fr ?? '' },
  seoDescription: { en: blog.seoDescription?.en ?? '', fr: blog.seoDescription?.fr ?? '' },
  seoKeywords:    {
    en: (blog.seoKeywords?.en ?? []).join(', '),
    fr: (blog.seoKeywords?.fr ?? []).join(', '),
  },
});

const formToPayload = (form) => ({
  title:       form.title,
  description: form.description,
  content:     form.content,
  excerpt:     form.excerpt,
  slug:        form.slug,
  category:    form.category,
  tags:        form.tags.split(',').map((t) => t.trim()).filter(Boolean),
  status:      form.status,
  featured:    form.featured,
  author: {
    name:   form.author.name,
    avatar: form.author.avatar,
    bio:    form.author.bio,
  },
  seoTitle:       form.seoTitle,
  seoDescription: form.seoDescription,
  seoKeywords: {
    en: form.seoKeywords.en.split(',').map((k) => k.trim()).filter(Boolean),
    fr: form.seoKeywords.fr.split(',').map((k) => k.trim()).filter(Boolean),
  },
});

// ─── Content preview (mirrors BlogDetailPage rendering logic) ───────────────

function ContentPreview({ content }) {
  if (!content) return <p className={styles.previewEmpty}>Nothing to preview yet…</p>;

  return (
    <div className={styles.previewBody}>
      {content.split('\n\n').map((block, idx) => {
        if (block.startsWith('## ')) {
          return <h2 key={idx} className={styles.previewH2}>{block.replace(/^## /, '')}</h2>;
        }
        if (block.startsWith('### ')) {
          return <h3 key={idx} className={styles.previewH3}>{block.replace(/^### /, '')}</h3>;
        }
        if (block.startsWith('- ')) {
          const items = block.split('\n').filter((l) => l.startsWith('- '));
          return (
            <ul key={idx} className={styles.previewList}>
              {items.map((item, i) => <li key={i}>{item.replace(/^- /, '')}</li>)}
            </ul>
          );
        }
        return block ? <p key={idx} className={styles.previewPara}>{block}</p> : null;
      })}
    </div>
  );
}

// ─── Markdown toolbar ────────────────────────────────────────────────────────

const TOOLBAR_ACTIONS = [
  { label: '¶',   title: 'Paragraph — just type',     prefix: ''    },
  { label: 'H2',  title: 'Section heading (##)',       prefix: '## ' },
  { label: 'H3',  title: 'Sub-heading (###)',          prefix: '### '},
  { label: '•',   title: 'List item (-)',              prefix: '- '  },
];

function ContentField({ lang, value, onChange, textareaRef }) {
  const [showPreview, setShowPreview] = useState(false);
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const insertMarkdown = useCallback((prefix) => {
    const ta = textareaRef.current;
    if (!ta) {
      // Fallback: just append
      onChange(value + (value ? '\n\n' : '') + prefix);
      return;
    }
    const s   = ta.selectionStart;
    const e   = ta.selectionEnd;
    const before = value.slice(0, s);
    const after  = value.slice(e);
    const sep    = before.length > 0 && !before.endsWith('\n\n') ? '\n\n' : '';
    const insert = sep + prefix;
    const newVal = before + insert + after;
    const newPos = s + insert.length;

    onChange(newVal);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(newPos, newPos);
    });
  }, [value, onChange, textareaRef]);

  return (
    <div className={styles.contentField}>
      <div className={styles.contentToolbar}>
        {TOOLBAR_ACTIONS.map(({ label, title, prefix }) => (
          <button
            key={label}
            type="button"
            title={title}
            className={styles.toolbarBtn}
            onClick={() => insertMarkdown(prefix)}
          >
            {label === '¶'  ? <AlignLeft size={14} /> :
             label === 'H2' ? <Heading2  size={14} /> :
             label === 'H3' ? <Heading3  size={14} /> :
             label === '•'  ? <List      size={14} /> :
             label}
          </button>
        ))}
        <div className={styles.toolbarDivider} />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${showPreview ? styles.toolbarBtnActive : ''}`}
          onClick={() => setShowPreview((v) => !v)}
          title={showPreview ? 'Hide preview' : 'Show preview'}
        >
          {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showPreview ? 'Edit' : 'Preview'}</span>
        </button>
        <span className={styles.wordCount}>{wordCount} words</span>
      </div>

      {showPreview ? (
        <div className={styles.previewPane}>
          <ContentPreview content={value} />
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            lang === 'en'
              ? 'Write your article in English…\n\nUse the toolbar above to add headings and lists.'
              : 'Rédigez votre article en français…'
          }
          rows={18}
          className={styles.contentTextarea}
        />
      )}
    </div>
  );
}

// ─── Cover image dropzone ────────────────────────────────────────────────────

function CoverImageField({ existingUrl, file, preview, onFileSelect, onClear }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) onFileSelect(f);
  };

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onFileSelect(f);
  };

  const displayUrl = preview || existingUrl;

  return (
    <div className={styles.coverField}>
      {displayUrl ? (
        <div className={styles.coverPreview}>
          <img src={displayUrl} alt="Cover preview" className={styles.coverImg} />
          <div className={styles.coverOverlay}>
            <button type="button" className={styles.coverClearBtn} onClick={onClear}>
              <X size={16} /> Remove
            </button>
            <button type="button" className={styles.coverChangeBtn} onClick={() => inputRef.current?.click()}>
              <Upload size={14} /> Change
            </button>
          </div>
          {file && <span className={styles.newBadge}>New image — not saved yet</span>}
        </div>
      ) : (
        <div
          className={styles.dropzone}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <ImageIcon size={28} className={styles.dropzoneIcon} />
          <p className={styles.dropzoneTitle}>Upload cover image</p>
          <p className={styles.dropzoneHint}>
            Drag & drop or click to select · JPG, PNG, WebP · max 5 MB
          </p>
          <span className={styles.requiredTag}>Required</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleChange}
      />
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ title, children, collapsible = false, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.section}>
      <div
        className={`${styles.sectionHeader} ${collapsible ? styles.sectionHeaderClickable : ''}`}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
      >
        <h3 className={styles.sectionTitle}>{title}</h3>
        {collapsible && (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </div>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

// ─── Main BlogEditor ─────────────────────────────────────────────────────────

export default function BlogEditor({ blog, onClose }) {
  const isEditing = !!blog;
  const queryClient = useQueryClient();

  const [form, setForm]               = useState(isEditing ? blogToForm(blog) : emptyBlog());
  const [coverFile, setCoverFile]     = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [langTab, setLangTab]         = useState('en'); // 'en' | 'fr'
  const [slugManual, setSlugManual]   = useState(isEditing);

  // One ref per language for the content textarea
  const contentRefEn = useRef(null);
  const contentRefFr = useRef(null);
  const contentRefs  = { en: contentRefEn, fr: contentRefFr };

  // ── Field updaters ──────────────────────────────────────────────────────
  const setField = (path, value) => {
    setForm((prev) => {
      const keys = path.split('.');
      const next = { ...prev };
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleTitleChange = (lang, val) => {
    setField(`title.${lang}`, val);
    if (lang === 'en' && !slugManual) {
      setField('slug', slugify(val));
    }
  };

  const handleCoverSelect = (file) => {
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleCoverClear = () => {
    setCoverFile(null);
    setCoverPreview('');
  };

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    if (!form.title.en.trim()) return 'English title is required.';
    if (!form.title.fr.trim()) return 'French title is required.';
    if (!form.excerpt.en.trim()) return 'English excerpt is required.';
    if (!form.excerpt.fr.trim()) return 'French excerpt is required.';
    if (!form.description.en.trim()) return 'English description is required.';
    if (!form.description.fr.trim()) return 'French description is required.';
    if (form.content.en.trim().length < 50) return 'English content must be at least 50 characters.';
    if (form.content.fr.trim().length < 50) return 'French content must be at least 50 characters.';
    if (!form.slug.trim()) return 'Slug is required.';
    if (!form.author.name.trim()) return 'Author name is required.';
    if (!isEditing && !coverFile) return 'Cover image is required.';
    return null;
  };

  // ── Mutations ───────────────────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: async () => {
      const payload = formToPayload(form);
      const createdBlog = await blogAPI.createBlog(payload);

      // Upload cover image — if this fails we clean up to avoid orphan records
      try {
        await blogAPI.uploadCoverImage(createdBlog._id, coverFile);
      } catch (uploadErr) {
        await blogAPI.deleteBlog(createdBlog._id).catch(() => {});
        throw new Error('Cover image upload failed. Please try again.');
      }

      return createdBlog;
    },
    onSuccess: () => {
      toast.success('Blog created successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogStats'] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create blog.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const payload = formToPayload(form);
      await blogAPI.updateBlog(blog._id, payload);
      if (coverFile) {
        await blogAPI.uploadCoverImage(blog._id, coverFile);
      }
    },
    onSuccess: () => {
      toast.success('Blog updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogStats'] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update blog.');
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (status) => {
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setField('status', status);
    // Give React one tick to apply status change before reading form
    setTimeout(() => {
      if (isEditing) {
        updateMutation.mutate();
      } else {
        createMutation.mutate();
      }
    }, 0);
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.editor}>
      {/* Top bar */}
      <div className={styles.editorTopBar}>
        <button type="button" className={styles.backBtn} onClick={onClose} disabled={isPending}>
          <ArrowLeft size={16} />
          Back to list
        </button>
        <h2 className={styles.editorTitle}>
          {isEditing ? `Edit: ${blog.title?.en || 'Blog'}` : 'New Blog Post'}
        </h2>
      </div>

      <div className={styles.editorLayout}>
        {/* ── Left / main column ── */}
        <div className={styles.mainColumn}>

          {/* Cover image */}
          <Section title="Cover Image">
            <CoverImageField
              existingUrl={blog?.coverImage}
              file={coverFile}
              preview={coverPreview}
              onFileSelect={handleCoverSelect}
              onClear={handleCoverClear}
            />
          </Section>

          {/* Language tabs + content */}
          <Section title="Content">
            <div className={styles.langTabs}>
              {['en', 'fr'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`${styles.langTab} ${langTab === lang ? styles.langTabActive : ''}`}
                  onClick={() => setLangTab(lang)}
                >
                  {lang === 'en' ? '🇬🇧 English' : '🇫🇷 Français'}
                </button>
              ))}
            </div>

            {['en', 'fr'].map((lang) => (
              <div
                key={lang}
                className={styles.langPanel}
                style={{ display: langTab === lang ? 'flex' : 'none' }}
              >
                {/* Title */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Title <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title[lang]}
                    onChange={(e) => handleTitleChange(lang, e.target.value)}
                    placeholder={lang === 'en' ? 'Article title in English' : 'Titre de l\'article en français'}
                    className={styles.input}
                  />
                </div>

                {/* Excerpt */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Excerpt <span className={styles.required}>*</span>
                    <span className={styles.hint}> — short summary shown in cards</span>
                  </label>
                  <textarea
                    value={form.excerpt[lang]}
                    onChange={(e) => setField(`excerpt.${lang}`, e.target.value)}
                    placeholder={lang === 'en' ? 'One or two sentence summary…' : 'Résumé en une ou deux phrases…'}
                    rows={2}
                    className={`${styles.input} ${styles.textareaSmall}`}
                  />
                </div>

                {/* Description */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Description <span className={styles.required}>*</span>
                    <span className={styles.hint}> — meta description, shown under title</span>
                  </label>
                  <textarea
                    value={form.description[lang]}
                    onChange={(e) => setField(`description.${lang}`, e.target.value)}
                    placeholder={lang === 'en' ? 'Longer description…' : 'Description détaillée…'}
                    rows={3}
                    className={`${styles.input} ${styles.textareaSmall}`}
                  />
                </div>

                {/* Content with toolbar */}
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Article Content <span className={styles.required}>*</span>
                  </label>
                  <p className={styles.formatGuide}>
                    <strong>Format guide:</strong> Use <code>## </code> for section headings,{' '}
                    <code>### </code> for sub-headings, <code>- </code> for bullet list items.
                    Separate each block with a blank line.
                  </p>
                  <ContentField
                    lang={lang}
                    value={form.content[lang]}
                    onChange={(v) => setField(`content.${lang}`, v)}
                    textareaRef={contentRefs[lang]}
                  />
                </div>
              </div>
            ))}
          </Section>

        </div>

        {/* ── Right / meta sidebar ── */}
        <div className={styles.sidebar}>

          {/* Publish status */}
          <Section title="Publish">
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setField('status', e.target.value)}
                className={styles.select}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setField('featured', e.target.checked)}
                className={styles.checkbox}
              />
              <span>Featured post</span>
            </label>

            {/* Action buttons */}
            <div className={styles.publishActions}>
              <button
                type="button"
                className={styles.draftBtn}
                onClick={() => handleSubmit('draft')}
                disabled={isPending}
              >
                {isPending ? <span className={styles.spinner} /> : 'Save Draft'}
              </button>
              <button
                type="button"
                className={styles.publishBtn}
                onClick={() => handleSubmit('published')}
                disabled={isPending}
              >
                {isPending ? <span className={styles.spinner} /> : (isEditing ? 'Update' : 'Publish')}
              </button>
            </div>
          </Section>

          {/* Slug + Category + Tags */}
          <Section title="Settings">
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                URL Slug <span className={styles.required}>*</span>
              </label>
              <div className={styles.slugRow}>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    setField('slug', slugify(e.target.value));
                  }}
                  placeholder="url-friendly-slug"
                  className={styles.input}
                />
                {!isEditing && (
                  <button
                    type="button"
                    title="Auto-generate from EN title"
                    className={styles.slugAutoBtn}
                    onClick={() => {
                      setSlugManual(false);
                      setField('slug', slugify(form.title.en));
                    }}
                  >
                    Auto
                  </button>
                )}
              </div>
              <p className={styles.fieldNote}>/blog/{form.slug || '…'}</p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Category</label>
              <select
                value={form.category}
                onChange={(e) => setField('category', e.target.value)}
                className={styles.select}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Tags</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setField('tags', e.target.value)}
                placeholder="fintech, payments, africa"
                className={styles.input}
              />
              <p className={styles.fieldNote}>Comma-separated</p>
            </div>
          </Section>

          {/* Author */}
          <Section title="Author">
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Name <span className={styles.required}>*</span></label>
              <input
                type="text"
                value={form.author.name}
                onChange={(e) => setField('author.name', e.target.value)}
                placeholder="John Doe"
                className={styles.input}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Avatar URL</label>
              <input
                type="url"
                value={form.author.avatar}
                onChange={(e) => setField('author.avatar', e.target.value)}
                placeholder="https://…"
                className={styles.input}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Bio (EN)</label>
              <textarea
                value={form.author.bio.en}
                onChange={(e) => setField('author.bio.en', e.target.value)}
                placeholder="Short bio in English"
                rows={2}
                className={`${styles.input} ${styles.textareaSmall}`}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Bio (FR)</label>
              <textarea
                value={form.author.bio.fr}
                onChange={(e) => setField('author.bio.fr', e.target.value)}
                placeholder="Courte biographie en français"
                rows={2}
                className={`${styles.input} ${styles.textareaSmall}`}
              />
            </div>
          </Section>

          {/* SEO (collapsible) */}
          <Section title="SEO & Metadata" collapsible defaultOpen={false}>
            {['en', 'fr'].map((lang) => (
              <React.Fragment key={lang}>
                <p className={styles.seoLangLabel}>{lang === 'en' ? '🇬🇧 English' : '🇫🇷 French'}</p>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>SEO Title</label>
                  <input
                    type="text"
                    value={form.seoTitle[lang]}
                    onChange={(e) => setField(`seoTitle.${lang}`, e.target.value)}
                    placeholder={`SEO title in ${lang === 'en' ? 'English' : 'French'}`}
                    className={styles.input}
                    maxLength={60}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>SEO Description</label>
                  <textarea
                    value={form.seoDescription[lang]}
                    onChange={(e) => setField(`seoDescription.${lang}`, e.target.value)}
                    placeholder={`Meta description in ${lang === 'en' ? 'English' : 'French'}`}
                    rows={2}
                    className={`${styles.input} ${styles.textareaSmall}`}
                    maxLength={160}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Keywords</label>
                  <input
                    type="text"
                    value={form.seoKeywords[lang]}
                    onChange={(e) => setField(`seoKeywords.${lang}`, e.target.value)}
                    placeholder="keyword1, keyword2"
                    className={styles.input}
                  />
                </div>
              </React.Fragment>
            ))}
          </Section>

        </div>
      </div>
    </div>
  );
}
