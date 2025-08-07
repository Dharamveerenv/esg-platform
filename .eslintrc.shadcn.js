module.exports = {
  rules: {
    // Custom rule to enforce shadcn/ui MCP server usage
    'shadcn/use-mcp-server': 'error',
    // Rule to ensure demo is retrieved before component usage
    'shadcn/demo-before-implementation': 'error',
    // Rule to prioritize blocks over individual components
    'shadcn/prioritize-blocks': 'warn',
    // Rule to ensure proper component import patterns
    'shadcn/proper-imports': 'error',
  },
  overrides: [
    {
      files: ['src/components/**/*.tsx', 'src/app/**/*.tsx'],
      rules: {
        // Enforce that UI components use shadcn patterns
        'shadcn/use-mcp-server': 'error',
      },
    },
  ],
};