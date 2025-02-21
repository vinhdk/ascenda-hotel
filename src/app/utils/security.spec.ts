import { sanitizeHTML } from './security';

describe('[Function sanitizeHTML]', () => {
  it('Happy case', () => {
    const htmlString = `
      <h1>Hello World</h1>
      <script>alert('Hello World')</script>
    `;

    const expected = `
      <h1>Hello World</h1>
    `;

    expect(sanitizeHTML(htmlString).trim()).toEqual(expected.trim());
  });

  it('Empty case', () => {
    expect(sanitizeHTML('')).toEqual('');
  });

  it('Null case', () => {
    expect(sanitizeHTML(null)).toEqual('');
  });

  it('Secured case', () => {
    expect(sanitizeHTML('Hello World')).toEqual('Hello World');
  });
});
