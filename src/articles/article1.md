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

Virtual environments solve these problems by creating isolated Python environments for each project. Think of them as separate, clean rooms where your projects can live without contaminating each other.

### Benefits of Virtual Environments:

1. Isolation: Each project has its own dependencies, regardless of what other projects need

2. Reproducibility: Easily recreate environments across different machines.

3. Simplified dependency management: Generate clear requirements files.

4. Version control friendly: Avoid bloating repositories with unnecessary package information.

### Virtual Environment Options in Python
Python offers several tools for creating virtual environments. We will explore the top 3 options:

1. venv 
The simplest option that comes built into Python 3,it is the default method to create a virtual environment.

```bash
# Create a virtual environment
python -m venv myproject_env

# Activate it 
source myproject_env/bin/activate

# Export dependencies to requirements.txt file
pip freeze > requirements.txt
```
2. Poetry 
Poetry combines virtual environments with dependency resolution. It comes with a pyproject.toml metadata file and a poetry.lock file, ensuring consistent installations across environments.

```bash
# Initialize a project
poetry init

# Activate the environment
poetry env activate

# Export dependencies to requirements.txt file from pyproject.toml
poetry export --without-hashes -f requirements.txt --output requirements.txt
```

3. uv
uv is built with Rust and is significantly faster than Poetry and Pip for installing dependencies. It includes built-in Python version handling and integrates with several popular frameworks like PyTorch and Docker.

```bash
# Create a virtual environment
uv venv

# Activate it
source .venv/bin/activate

# Export dependencies to requirements.txt file
uv pip freeze > requirements.txt
```

### Best Practices for Virtual Environments

Let's view the best practices that can be applied for virtual environments:

1. Create one environment per project: Resist the temptation to reuse environments.

2. Track your dependencies: Use requirements.txt, or pyproject.toml(recommended after [PEP621](https://peps.python.org/pep-0621/)) to manage your dependencies.

3. Use meaningful names: Name environments after their projects for ease of use.

4. Clean up unused environments: Remove environments for completed projects to free up space and clutter.

### Conclusion

The best time to start using virtual environments was when you began coding in Python. The second best time is now. Begin with your current project with these 4 simple steps:

1. Create a new virtual environment with venv, poetry or uv.

2. Install only the packages you need.

3. Export the dependencies to a requirements.txt file.

4. Commit this file to git for tracking.