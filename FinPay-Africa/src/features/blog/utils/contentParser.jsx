/**
 * Content Parser Utility
 * Parses custom markdown-like syntax used in blog content
 * Supports inline formatting: *bold*, _italic_, ~center~, ![alt](url)
 * Supports block formatting: ## headings, ### subheadings, - lists, #H1#, ~centered blocks~
 */

export const parseInlineContent = (text, keyPrefix = '') => {
  if (!text) return [];

  // Handle inline images first
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/;
  const imageMatch = imagePattern.exec(text);
  if (imageMatch) {
    const before = text.slice(0, imageMatch.index);
    const after = text.slice(imageMatch.index + imageMatch[0].length);
    return [
      ...parseInlineContent(before, `${keyPrefix}before-`),
      <img
        key={`${keyPrefix}img-${imageMatch.index}`}
        src={imageMatch[2].trim()}
        alt={imageMatch[1].trim() || 'Blog image'}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          margin: '16px 0',
        }}
      />,
      ...parseInlineContent(after, `${keyPrefix}after-`),
    ];
  }

  // Handle inline formatting markers
  const markerPattern = /(\*[^*]+\*|_[^_]+_|~[^~]+~)/;
  const markerMatch = markerPattern.exec(text);
  if (markerMatch) {
    const before = text.slice(0, markerMatch.index);
    const after = text.slice(markerMatch.index + markerMatch[0].length);
    const raw = markerMatch[0];
    const inner = raw.slice(1, -1);
    const marker = raw[0];
    const innerNodes = parseInlineContent(inner, `${keyPrefix}inner-${markerMatch.index}-`);

    const wrapped = marker === '*'
      ? <strong key={`${keyPrefix}bold-${markerMatch.index}`}>{innerNodes}</strong>
      : marker === '_'
        ? <em key={`${keyPrefix}italic-${markerMatch.index}`}>{innerNodes}</em>
        : <span key={`${keyPrefix}center-${markerMatch.index}`} className="content-centered">{innerNodes}</span>;

    return [
      ...parseInlineContent(before, `${keyPrefix}before-`),
      wrapped,
      ...parseInlineContent(after, `${keyPrefix}after-`),
    ];
  }

  return [text];
};

export const parseBlockContent = (block, idx, center = false) => {
  const trimmed = block.trim();
  if (!trimmed) return null;

  // Handle standalone images
  const imageOnly = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imageOnly) {
    return (
      <img
        key={`image-${idx}`}
        src={imageOnly[2].trim()}
        alt={imageOnly[1].trim() || 'Blog image'}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '12px',
          margin: '16px 0',
        }}
      />
    );
  }

  // Handle centered blocks
  if (trimmed.startsWith('~') && trimmed.endsWith('~')) {
    return parseBlockContent(trimmed.slice(1, -1).trim(), idx, true);
  }

  // Handle H1 headings
  if (trimmed.startsWith('#') && trimmed.endsWith('#') && !trimmed.startsWith('## ')) {
    return (
      <h1 key={idx} className={center ? "content-heading-h1 content-centered-heading" : "content-heading-h1"}>
        {parseInlineContent(trimmed.slice(1, -1).trim(), `h1-${idx}-`)}
      </h1>
    );
  }

  // Handle H2 headings
  if (trimmed.startsWith('## ')) {
    return (
      <h2 key={idx} id={`section-${idx}`} className={center ? "content-heading content-centered-heading" : "content-heading"}>
        {parseInlineContent(trimmed.replace(/^## /, ''), `h2-${idx}-`)}
      </h2>
    );
  }

  // Handle H3 headings
  if (trimmed.startsWith('### ')) {
    return (
      <h3 key={idx} className={center ? "content-subheading content-centered-heading" : "content-subheading"}>
        {parseInlineContent(trimmed.replace(/^### /, ''), `h3-${idx}-`)}
      </h3>
    );
  }

  // Handle lists
  if (trimmed.startsWith('- ')) {
    const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
    return (
      <ul key={idx} className="content-list">
        {items.map((item, i) => (
          <li key={i}>{parseInlineContent(item.replace(/^- /, ''), `li-${idx}-${i}-`)}</li>
        ))}
      </ul>
    );
  }

  // Handle centered paragraphs
  if (center) {
    return (
      <div key={idx} className="content-centered-block">
        {parseInlineContent(trimmed, `p-${idx}-`)}
      </div>
    );
  }

  // Regular paragraphs
  return (
    <p key={idx} className="content-paragraph">
      {parseInlineContent(trimmed, `p-${idx}-`)}
    </p>
  );
};

export const parseBlogContent = (content) => {
  if (!content) return null;

  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return normalized.split('\n\n').map((block, idx) => parseBlockContent(block, idx));
};