## Python Projects Without Pollution: Why You Need Virtual Envs

As a developer, if you have worked with python and it's extensive ecosystem of packages for performing tasks such as data processing, visualization or for building web applications, you require different packages for doing so. After completing your installation and running your script you encounter the following error:

```bash
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
```

The culprit could be environment pollution, which is one of the most common yet neglected challenges in python development. This can cost significant development time and make collaboration painful.

### The Problem: Python's Global Package Space

When you install packages using pip, they go into your global Python environment. This can create several potential problems:

1. Dependency hell: Package A requires version 1.0 of Package C, while Package B requires version 2.0. 
2. Cluttered environments: Your global package list becomes bloated with unused dependencies
3. Version conflicts: Different projects often require different versions of the same package

### Virtual Environment Options


Virtual environments solve these problems by creating isolated Python environments for each project. Think of them as separate, clean rooms where your projects can live without contaminating each other.
Key Benefits of Virtual Environments

Isolation: Each project has its own dependencies, regardless of what other projects need
Reproducibility: Easily recreate environments across different machines
Clean testing: Test with only the packages your project actually needs
Simplified dependency management: Generate clear requirements files
Version control friendly: Avoid bloating repositories with unnecessary package information

Virtual Environment Options in Python
Python offers several tools for creating virtual environments. We will explore the 3 most prominent options:

1. venv 
The simplest option that comes built into Python 3:

```bash
python -m venv myproject_env


myproject_env\Scripts\activate

# Activate it (on macOS/Linux)
source myproject_env/bin/activate
```
2. Poetry 
Poetry combines virtual environments with dependency management:

```bash
# Initialize a new project
poetry new myproject

# Add dependencies
poetry add pandas numpy

# Activate the environment
poetry shell
```

3. uv

```bash
# Create and activate a virtual environment
uv venv
source .venv/bin/activate
```

## Best Practices for Virtual Environments

Create one environment per project: Resist the temptation to reuse environments
Track your dependencies: Use requirements.txt, environment.yml, or pyproject.toml
Include environment setup in documentation: Make it easy for collaborators
Use meaningful names: Name environments after their projects
Clean up unused environments: Remove environments for completed projects

The best time to start using virtual environments was when you began coding in Python. The second best time is now. Begin with your current project:

1. Create a new virtual environment
2. Install only the packages you need
3. Export the dependencies to a requirements file
4. Commit this file to version control