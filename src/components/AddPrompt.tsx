import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AutosizeTextarea } from './ui/textarea';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useLocation, useNavigate } from 'react-router-dom';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z.string().min(10, {
    message: 'Content must be at least 10 characters.',
  }),
});

const AddPrompt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const promptToEdit = location.state?.prompt;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: promptToEdit?.title || '',
      content: promptToEdit?.content || '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const existingPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');

    if (promptToEdit) {
      const updatedPrompts = existingPrompts.map((p: any) =>
        p.id === promptToEdit.id ? { ...p, ...values } : p
      );
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    } else {
      const newPrompt = {
        id: existingPrompts.length + 1,
        ...values,
      };
      const updatedPrompts = [newPrompt, ...existingPrompts];
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    }

    form.reset();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{promptToEdit ? 'Edit Prompt' : 'Add New Prompt'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter prompt title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt Content</FormLabel>
                <FormControl>
                  <AutosizeTextarea
                    minHeight={200}
                    placeholder="Enter your prompt content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit">{promptToEdit ? 'Update Prompt' : 'Save Prompt'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPrompt;
