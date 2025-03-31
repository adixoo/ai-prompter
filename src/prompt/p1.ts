export function Prompt1(context: string, task: string) {
  return `
  I am providing you with some context. Here is the context:
  ${context}

  Based on the context, please execute the following task:
  ${task}
  `;
}
