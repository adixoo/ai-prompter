import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

interface Prompt {
  title: string;
  prompt: string;
}

const Context = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    setPrompts(savedPrompts);
  }, []);

  const handleEdit = (prompt: number) => {
    navigate(`/add?edit=${prompt}`);
  };

  const handleUsePrompt = (prompt: number) => {
    navigate(`/?prompt=${prompt}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">All Context</h1>
          <Button onClick={() => navigate('/add')}>Add New Prompt</Button>
        </div>
        <div className="space-y-4">
          {prompts.map((prompt, index) => (
            <div
              key={prompt.title}
              className="group relative rounded-lg border p-4 text-left shadow-sm"
            >
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm" onClick={() => handleUsePrompt(index)}>
                  Use Prompt
                </Button>
              </div>
              <h2 className="mb-2 text-xl font-semibold">{prompt.title}</h2>
              <p className="line-clamp-2 text-slate-600">{prompt.prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Context;
