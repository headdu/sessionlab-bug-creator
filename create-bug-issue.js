#!/usr/bin/env node

const { Octokit } = require('@octokit/rest');
const readline = require('readline');
const chalk = require('chalk');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input with validation
const promptWithValidation = (question, validator = null) => {
  return new Promise((resolve) => {
    const askQuestion = () => {
      rl.question(question, (answer) => {
        if (!validator || validator(answer)) {
          resolve(answer);
        } else {
          console.log(chalk.red('Invalid input. Please try again.'));
          askQuestion();
        }
      });
    };
    askQuestion();
  });
};

// Main function to create bug issue
async function createBugIssue() {
  try {
    console.log(chalk.blue('=== SessionLab Bug Issue Creator ===\n'));
    
    // Get GitHub credentials
    const token = await promptWithValidation(chalk.yellow('Enter your GitHub token: '));
    
    // Initialize Octokit with the token
    const octokit = new Octokit({
      auth: token
    });
    
    const owner = 'sessionlab';
    const repo = 'sessionlab';
    
    // Get bug information from user
    console.log(chalk.blue('\nPlease provide the bug details:'));
    
    const shortDescription = await promptWithValidation(chalk.yellow('Short description: '));
    const slackNumber = await promptWithValidation(chalk.yellow('Slack number (optional): '), () => true);
    
    const issueDescription = await promptWithValidation(chalk.yellow('Issue description: '));
    const stepsToReproduce = await promptWithValidation(chalk.yellow('Steps to reproduce (separate steps with commas): '));
    const expectedBehavior = await promptWithValidation(chalk.yellow('Expected behavior: '));
    
    // Environment details
    const browser = await promptWithValidation(chalk.yellow('Browser (e.g., chrome, safari): '));
    const version = await promptWithValidation(chalk.yellow('Version: '));
    const device = await promptWithValidation(chalk.yellow('Device (desktop or mobile): '), 
      (answer) => ['desktop', 'mobile'].includes(answer.toLowerCase()));

    // Format steps to reproduce
    const stepsArray = stepsToReproduce.split(',').map((step, index) => `${index + 1}. ${step.trim()}`);
    
    // Construct issue title
    const title = slackNumber ? `${shortDescription} - (${slackNumber})` : shortDescription;
    
    // Construct issue body using the template format
    const body = `## Issue description
${issueDescription}

<!-- Ideally provide video description and/or screenshots -->

<!-- Provide links to any relevant Slack conversation -->

## Steps to reproduce
${stepsArray.join('\n')}

## Expected behavior
${expectedBehavior}

## Environment
- Browser: ${browser}
- Version: ${version}
- Device: ${device}

## Technical refinement

## Testing instructions
<!-- To be filled by developers in case there are any special considerations for testing this bug -->

<!--  ====>>> Assign testers and change testing status to Ready to Test <<<====  -->

## Definition of done
- [ ] matches expected behaviour
- [ ] passes CI workflow
- [ ] code reviewed
- [ ] accepted by testers
- [ ] deployed to production
`;

    // Create the issue
    console.log(chalk.blue('\nCreating bug issue...'));
    
    const issue = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
      labels: ['t:bug'],
      assignees: ['SandijsLiepins']
    });
    
    console.log(chalk.green(`\nSuccess! Bug issue created: ${issue.data.html_url}`));
  } catch (error) {
    console.error(chalk.red(`\nError creating bug issue: ${error.message}`));
  } finally {
    rl.close();
  }
}

// Run the script
createBugIssue();
