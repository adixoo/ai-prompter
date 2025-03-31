import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AutosizeTextarea } from '@/components/ui/textarea';
import { useQueryState } from 'nuqs';
import { X } from 'lucide-react';

interface Prompt {
  id: number;
  title: string;
  content: string;
}

const Home = () => {
  const [promptText, setPromptText] = useState('');
  const [promptId, setPromptId] = useQueryState('prompt');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    setPrompts(savedPrompts);
  }, []);

  const selectedPrompt = prompts.find(p => p.id === Number(promptId));

  const handleClose = async () => {
    await setPromptId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold">AI Prompter</h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {selectedPrompt && (
              <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
                <span className="font-medium">{selectedPrompt.title}</span>
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

          <AutosizeTextarea
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            placeholder="Add prompt here..."
            minHeight={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
