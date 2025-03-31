import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

interface Prompt {
  id: number;
  title: string;
  content: string;
}

const Context = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    setPrompts(savedPrompts);
  }, []);

  const handleEdit = (prompt: Prompt) => {
    navigate(`/add?edit=${prompt.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">All Context</h1>
          <Button onClick={() => navigate('/add')}>Add New Prompt</Button>
        </div>
        <div className="space-y-4">
          {[...prompts].reverse().map(prompt => (
            <div
              key={prompt.id}
              className="group relative rounded-lg border p-4 text-left shadow-sm"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleEdit(prompt)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <h2 className="mb-2 text-xl font-semibold">{prompt.title}</h2>
              <p className="line-clamp-2 text-slate-600">{prompt.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Context;
