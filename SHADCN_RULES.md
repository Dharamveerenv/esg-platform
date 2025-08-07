# shadcn/ui Development Rules

## General Rule
When a task requires building or modifying a user interface, you must use the tools available in the shadcn-ui MCP server.

## Planning Rule
When planning a UI build using shadcn:

### 1. Discover Assets
- **First step**: Use `list_components()` and `list_blocks()` to see all available assets in the MCP server
- This ensures you're aware of all available options before implementation

### 2. Map Request to Assets
- Analyze the user's request carefully
- Map the required UI elements to the available components and blocks
- Document which assets will be used for each UI requirement

### 3. Prioritize Blocks
- **Prioritize blocks first**: Use `get_block()` wherever possible for common, complex UI patterns
  - Examples: login pages, calendars, dashboards, product listings
  - Blocks provide more structure and accelerate development
- **Use individual components**: Call `get_component()` for smaller, more specific needs
  - Examples: buttons, inputs, badges, tooltips

## Implementation Rule
When implementing the UI:

### 1. Get a Demo First (CRITICAL)
- **Before using any component**: You must call `get_component_demo(component_name)`
- This is critical for understanding:
  - How the component is used
  - Required props and their types
  - Component structure and patterns
  - Best practices and examples

### 2. Retrieve the Code
- **For single components**: Call `get_component(component_name)`
- **For composite blocks**: Call `get_block(block_name)`
- Always retrieve the most up-to-date version from the MCP server

### 3. Implement Correctly
- Integrate the retrieved code into the application
- Customize with necessary props and logic to fulfill the user's request
- Follow the patterns shown in the demo code
- Maintain consistency with shadcn/ui conventions

## Workflow Checklist

Before starting any UI task:
- [ ] Run `list_components()` to see available components
- [ ] Run `list_blocks()` to see available blocks
- [ ] Map user requirements to available assets
- [ ] Prioritize blocks over individual components where applicable
- [ ] Get demo code for each component/block you plan to use
- [ ] Retrieve the actual component/block code
- [ ] Implement following the demo patterns

## Tools Reference

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `list_components()` | Discover all available components | Start of every UI task |
| `list_blocks()` | Discover all available blocks | Start of every UI task |
| `get_component_demo(name)` | Get usage examples | Before implementing any component |
| `get_component(name)` | Get component source code | For individual components |
| `get_block(name)` | Get block source code | For complex UI patterns |
| `get_component_metadata(name)` | Get component details | For understanding dependencies |

## Best Practices

1. **Always start with discovery** - Don't assume what's available
2. **Demo first, implement second** - Understanding usage is critical
3. **Blocks over components** - Use pre-built patterns when possible
4. **Follow shadcn conventions** - Maintain consistency with the design system
5. **Customize thoughtfully** - Modify props and styling while preserving the core structure