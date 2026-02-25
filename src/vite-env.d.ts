/** Vite `?inline` import suffix — returns the file content as a string at build time. */
declare module "*?inline" {
  const content: string;
  export default content;
}
