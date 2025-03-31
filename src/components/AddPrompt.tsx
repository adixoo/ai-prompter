import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AutosizeTextarea } from './ui/textarea';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { Prompt } from '../types';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  prompt: z.string().min(10, {
    message: 'Content must be at least 10 characters.',
  }),
});

const AddPrompt = () => {
  const navigate = useNavigate();
  const [editIndex] = useQueryState('edit', parseAsInteger);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    if (editIndex !== null) {
      const promptToEdit = savedPrompts[editIndex];
      if (promptToEdit) {
        setEditingPrompt(promptToEdit);
      }
    }
  }, [editIndex]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      prompt: '',
    },
  });

  useEffect(() => {
    if (editingPrompt) {
      form.reset({
        title: editingPrompt.title,
        prompt: editingPrompt.prompt,
      });
    }
  }, [editingPrompt, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const existingPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');

    if (editIndex !== null) {
      const updatedPrompts = [...existingPrompts];
      updatedPrompts[editIndex] = values;
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    } else {
      const updatedPrompts = [values, ...existingPrompts];
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    }

    form.reset();
    navigate('/context');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        {editingPrompt ? 'Edit Prompt' : 'Add New Prompt'}
      </h1>
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
            name="prompt"
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
            <Button type="submit">{editingPrompt ? 'Update Prompt' : 'Save Prompt'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/context')}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPrompt;
