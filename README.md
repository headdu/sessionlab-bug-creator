# Sessionlab Bug Issue Creator

A command-line tool to create bug issues in the Sessionlab GitHub repository using the official bug report template.

## Installation

```bash
# Clone the repository
git clone https://github.com/headdu/sessionlab-bug-creator.git

# Install dependencies
cd sessionlab-bug-creator
npm install

# Make the script executable
chmod +x create-bug-issue.js

# Optional: Install globally
npm install -g .
```

## Usage

```bash
# Run locally
node create-bug-issue.js

# Or if installed globally
create-sessionlab-bug
```

## Requirements

- Node.js 12 or higher
- A GitHub personal access token with permissions to create issues in the Sessionlab repository

## Features

- Interactive command-line interface
- Validation of inputs
- Automatic formatting of the bug report
- Uses the official Sessionlab bug template
- Automatically assigns to the default assignee
- Adds the standard bug label

## License

MIT
