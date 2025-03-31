import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Context = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">All Context</h1>
          <Button onClick={() => navigate('/add')}>Add New Prompt</Button>
        </div>
        <div className="space-y-4">{/* Context items will be added here */}</div>
      </div>
    </div>
  );
};

export default Context;
