#!/usr/bin/env node

/**
 * shadcn/ui Helper Script
 * Enforces the shadcn development rules workflow
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ShadcnHelper {
  constructor() {
    this.mcpTools = {
      listComponents: 'mcp__shadcn-ui__list_components',
      listBlocks: 'mcp__shadcn-ui__list_blocks',
      getComponent: 'mcp__shadcn-ui__get_component',
      getBlock: 'mcp__shadcn-ui__get_block',
      getComponentDemo: 'mcp__shadcn-ui__get_component_demo',
      getComponentMetadata: 'mcp__shadcn-ui__get_component_metadata'
    };
  }

  /**
   * Start a new UI task following the shadcn rules
   */
  startUITask(taskName) {
    console.log(`🚀 Starting UI task: ${taskName}`);
    console.log('\n📋 Following shadcn/ui rules workflow:');
    
    // Step 1: Discover Assets
    console.log('\n1️⃣ DISCOVERY PHASE');
    console.log('   ✅ Run list_components() to see available components');
    console.log('   ✅ Run list_blocks() to see available blocks');
    
    // Step 2: Map Request to Assets
    console.log('\n2️⃣ PLANNING PHASE');
    console.log('   ✅ Analyze the request and map to available assets');
    console.log('   ✅ Prioritize blocks over individual components');
    
    // Step 3: Implementation
    console.log('\n3️⃣ IMPLEMENTATION PHASE');
    console.log('   ✅ Get demo first: get_component_demo(name)');
    console.log('   ✅ Retrieve code: get_component(name) or get_block(name)');
    console.log('   ✅ Implement following demo patterns');
    
    this.createTaskChecklist(taskName);
  }

  /**
   * Create a checklist file for the current task
   */
  createTaskChecklist(taskName) {
    const checklistContent = `# ${taskName} - shadcn/ui Task Checklist

## Discovery Phase
- [ ] Run \`list_components()\` to see available components
- [ ] Run \`list_blocks()\` to see available blocks
- [ ] Document available assets

## Planning Phase
- [ ] Map user requirements to available assets
- [ ] Prioritize blocks over individual components
- [ ] Plan implementation approach

## Implementation Phase
- [ ] Get demo code for each component/block: \`get_component_demo(name)\`
- [ ] Retrieve source code: \`get_component(name)\` or \`get_block(name)\`
- [ ] Implement following demo patterns
- [ ] Test implementation
- [ ] Review for shadcn/ui conventions

## Assets Used
<!-- Document which components/blocks were used -->

## Notes
<!-- Implementation notes and customizations -->
`;

    const checklistPath = path.join(process.cwd(), `${taskName.toLowerCase().replace(/\s+/g, '-')}-checklist.md`);
    fs.writeFileSync(checklistPath, checklistContent);
    console.log(`\n📝 Created task checklist: ${checklistPath}`);
  }

  /**
   * Validate that the workflow was followed
   */
  validateWorkflow(componentPath) {
    console.log('\n🔍 Validating shadcn/ui workflow compliance...');
    
    if (!fs.existsSync(componentPath)) {
      console.error('❌ Component file not found');
      return false;
    }

    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Check for proper shadcn imports
    const hasShadcnImports = content.includes('@/components/ui/') || 
                           content.includes('@/lib/utils');
    
    if (!hasShadcnImports) {
      console.warn('⚠️  No shadcn/ui imports detected. Ensure you\'re using MCP server components.');
    }

    // Check for proper className usage with cn()
    const usesCnFunction = content.includes('cn(');
    if (!usesCnFunction && content.includes('className')) {
      console.warn('⚠️  Consider using cn() function for className composition.');
    }

    console.log('✅ Workflow validation complete');
    return true;
  }

  /**
   * Display available MCP tools
   */
  showMCPTools() {
    console.log('\n🛠️  Available shadcn/ui MCP Tools:');
    console.log('');
    Object.entries(this.mcpTools).forEach(([name, tool]) => {
      console.log(`   ${name}: ${tool}`);
    });
  }

  /**
   * Display help
   */
  showHelp() {
    console.log(`
🎨 shadcn/ui Helper Script

Usage:
  node scripts/shadcn-helper.js <command> [options]

Commands:
  start <task-name>     Start a new UI task with workflow checklist
  validate <file-path>  Validate component follows shadcn rules
  tools                 Show available MCP tools
  help                  Show this help message

Examples:
  node scripts/shadcn-helper.js start "Login Page"
  node scripts/shadcn-helper.js validate src/components/LoginForm.tsx
  node scripts/shadcn-helper.js tools
`);
  }
}

// CLI Interface
const helper = new ShadcnHelper();
const [,, command, ...args] = process.argv;

switch (command) {
  case 'start':
    helper.startUITask(args.join(' ') || 'New UI Task');
    break;
  case 'validate':
    helper.validateWorkflow(args[0]);
    break;
  case 'tools':
    helper.showMCPTools();
    break;
  case 'help':
  default:
    helper.showHelp();
    break;
}