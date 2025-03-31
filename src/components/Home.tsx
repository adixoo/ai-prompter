import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AutosizeTextarea } from '@/components/ui/textarea';
import { parseAsInteger, useQueryState } from 'nuqs';
import { X, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useDebounce } from '@/hooks/useDebounce';
import { Prompt } from '@/types';
import { Prompt1 } from '@/prompt/p1';

const Home = () => {
  const [promptState, setPromptState] = useState<Prompt>({ title: '', prompt: '' });
  const [promptIndex, setPromptIndex] = useQueryState('prompt', parseAsInteger);
  const [userContext, setUserContext] = useState<string>('');
  const navigate = useNavigate();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const debouncedPromptText = useDebounce(userContext, 1000);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (promptIndex !== null) {
      const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
      const prompt = savedPrompts[promptIndex];
      setPromptState(prompt);
    }
  }, [promptIndex]);

  useEffect(() => {
    if (!isFirstRender.current && debouncedPromptText) {
      if (promptState.title) {
        const prompt = Prompt1(promptState.prompt, debouncedPromptText);
        copyToClipboard(prompt);
      } else {
        copyToClipboard(debouncedPromptText);
      }
    }
    isFirstRender.current = false;
  }, [debouncedPromptText, copyToClipboard, promptState]);

  const handleClose = async () => {
    await setPromptIndex(null);
    setPromptState({ title: '', prompt: '' });
  };

  const handleCopy = () => {
    if (promptState.title) {
      const prompt = Prompt1(promptState.prompt, userContext);
      copyToClipboard(prompt);
    } else {
      copyToClipboard(userContext);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold">AI Prompter</h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {promptState.title && (
              <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
                <span className="font-medium">{promptState.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full p-0 hover:bg-indigo-100"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button onClick={() => navigate('/context')}>Add Context</Button>
          </div>

          <div className="space-y-2">
            <AutosizeTextarea
              value={userContext}
              onChange={e => setUserContext(e.target.value)}
              placeholder="Add prompt here..."
              minHeight={200}
            />
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to clipboard
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
