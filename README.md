### Hexlet tests and linter status:

[![Actions Status](https://github.com/AlexNeva/backend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AlexNeva/backend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/163df6c5df78b47a2ed7/maintainability)](https://codeclimate.com/github/AlexNeva/backend-project-46/maintainability)

# About The Project

The **File Difference Analyzer** is a powerful tool designed to compare two files and accurately identify their differences. Whether you're working with text, code, or data files, this application streamlines the process of spotting changes, ensuring that no detail goes unnoticed.

The tool provides the flexibility to output the differences in various formats, including plain text, side-by-side comparison, and more. This versatility makes it suitable for a wide range of use cases, from simple file comparison tasks to complex version control and quality assurance processes.

With an intuitive user interface and robust functionality, the **File Difference Analyzer** is an essential utility for developers, writers, and anyone who needs to keep track of file changes efficiently.

Feel free to adjust any part of this to better fit your needs!

## Getting Started

Follow these steps to set up and link the project from GitHub.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14.x or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository**

Open your terminal and clone the repository from GitHub:

```sh
git clone https://github.com/AlexNeva/backend-project-46.git
```

2. **Navigate to the Project Directory**

Change your directory to the project folder:

```sh
cd backend-project-46
```

3. **Install Dependencies**

Install the required dependencies using npm:

```sh
make install
```

4. **Linking the Project**

Run the following command to create a global link:

```sh
npm link
```

## Getting Started

To use the **gendiff** tool, run the following command in your terminal:

```sh
gendiff [options] <filepath1> <filepath2>
```

This command compares two configuration files and outputs the differences between them.

**Options**:

- `-V`, `--version`: Outputs the version number of the **gendiff** tool.
- `-f`, `--format [type]`: Specifies the output format of the difference. Available formats include:

  - `"stylish"` (default)
  - `"plain"`
  - `"json"`

- `-h`, `--help`: Displays the help information for the command.
