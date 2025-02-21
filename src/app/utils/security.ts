/**
 * @description Sanitize HTML
 * @param htmlString {string | null | undefined}
 * @returns {string}
 * @example
 * sanitizeHTML(`
 *   <h1>Hello World</h1>
 *   <script>alert('Hello World')</script>
 * `);
 * // => <h1>Hello World</h1>
 */
export const sanitizeHTML = (htmlString?: string | null): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString ?? '', 'text/html');

  doc.querySelectorAll('script').forEach(script => script.remove());

  return doc.body.innerHTML;
};
