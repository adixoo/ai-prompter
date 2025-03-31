import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold">AI Prompter</h1>

        <div className="space-y-4">
          <Button onClick={() => navigate('/context')}>Add Context</Button>

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Add prompt here..."
            className="h-48 w-full resize-none rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
