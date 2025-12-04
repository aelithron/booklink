function stripHTMLTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
console.log(stripHTMLTags(`<scrip<script>is removed</script>t>alert(123)</script>`));