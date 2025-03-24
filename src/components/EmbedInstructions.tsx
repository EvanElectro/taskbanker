
import React, { useState } from 'react';
import { getEmbedCode } from '@/utils/embedCode';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface EmbedInstructionsProps {
  appUrl: string;
}

const EmbedInstructions: React.FC<EmbedInstructionsProps> = ({ appUrl }) => {
  const [copied, setCopied] = useState(false);
  const embedCode = getEmbedCode(appUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Embed code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-6 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-semibold">Embed Daily Drips in Your Website</h2>
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Copy the code below and paste it into your Framer site or any website where you want to embed Daily Drips.
        </p>
        
        <div className="relative">
          <pre className="p-4 bg-muted rounded-md overflow-auto text-xs">
            {embedCode}
          </pre>
          
          <Button
            size="sm"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
            variant="secondary"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-md">
        <h3 className="font-medium mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Make sure your Daily Drips app is published and accessible at a public URL</li>
          <li>Copy the embed code above</li>
          <li>In Framer, add an HTML embed component to your project</li>
          <li>Paste the code into the HTML embed component</li>
          <li>Adjust the width and height settings as needed</li>
        </ol>
      </div>
    </div>
  );
};

export default EmbedInstructions;
