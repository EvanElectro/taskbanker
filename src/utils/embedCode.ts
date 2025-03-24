
export const getEmbedCode = (appUrl: string): string => {
  return `
<!-- Daily Drips Embed Code -->
<iframe 
  src="${appUrl}/embedded" 
  style="width: 100%; border: none; min-height: 400px;" 
  id="daily-drips-frame"
  title="Daily Drips Task Manager"
  allow="clipboard-write"
></iframe>

<script>
  // Make the iframe responsive
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'resize') {
      const iframe = document.getElementById('daily-drips-frame');
      if (iframe) {
        iframe.style.height = (event.data.height + 20) + 'px';
      }
    }
  }, false);
</script>
<!-- End Daily Drips Embed Code -->
`;
};
