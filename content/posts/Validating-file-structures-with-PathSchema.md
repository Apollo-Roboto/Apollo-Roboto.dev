---
title: "Validating File Structures With PathSchema"
date: 2023-06-12
draft: false
tableOfContent: false
author: Apollo-Roboto
priorityTags:
  - Library
  - Python
  - Tutorial
tags:
  - Library
  - Python
  - Validation
  - PathSchema
  - Organization
  - Project
  - Tutorial
  - GitHub Action
summary: PathSchema is a Python module that validate folder structures.
---

PathSchema is a Python module that offers a simple and effective solution for enforcing standardized file organization within a project. By defining a schema file, developers can validate their folder structures, enhancing code quality and project organization. In this blog post, I’ll introduce the tool, and explain how to create a `.pathschema` file as well as how to use the command line utility.

# How to Create a PathSchema File

To define a schema, create a new file with the `.pathschema` extension. This file will declare what is allowed in a directory.

As a first introduction, consider this file structure:

```pathschema
media/
	photos/
		2022/
			1.png
		2023/
			1.png
			2.png
	wallpapers/
		default.png
		company logo.webp
	sound effects/
		lasers.wav
```

With this matching schema, no other folders are allowed and only some extensions are expected.

```pathschema
media/
	photos/
		*/
			*.png
	wallpapers/
		*.png
		*.webp
	sound effects/
		*.wav
```



*Notice the `*/`, this is matching any name for the directory, allowing 2022 and 2023.*

## Files and Folders

A `/` in the end of a line marks the path as a folder.

Here is a simple file definition
```pathschema
Dockerfile
README.md
```

And a folder definition
```pathschema
resources/
	# Folders can declare child paths
	settings.yaml
```

## Making a Path as Required or Forbidden.

By default, every path you define in a schema is an optional file. To require a path to exist, prefix its name with a `+`. Similarly, to require a path to be absent, prefix its name with a `-`. This can work on both files and directories.

Here is an example that makes the readme required:

```pathschema
# A readme is always required
+ README.md

# But a .env should never be there
- .env

# Always include the .github folder
+ .github/

# Ignore other files
...
```

*More on the `...` bellow.*

## Name Pattern Matching

PathSchema supports two styles of name matching: 

- Wildcards for quick, short and clear name matching.
- Regex expressions for more complex name matching.

### Wildcard Characters

Each path will allow wildcards by default.

Here is an example:

```pathschema
# Allows any files that ends with .png
*.png

# Folder for a 3d object must start with object
object_*/
	model.fbx
	texture.png
```

These are all the matching options, coming from the [fnmatch python module](https://docs.python.org/3/library/fnmatch.html).

| Symbol | Description                       |
|:------:|-----------------------------------|
| *      | Matches everything                |
| ?      | Matches any single character      |
| [seq]  | Matches any character in seq      |
| [!seq] | Matches any character not in seq  |

### Regex Pattern Matching

To enable regex matching, surround the path’s name with double quotes.

Here is an example:

```pathschema
# logs must include the date (expecting yyyy-mm-dd)
logs/
	"log_\d{4}-\d{2}-\d{2}\.txt"

# pictures must be in a directory that represent it's year
pictures/
	"\d{4}"/
		*.png
```

## Preventing Further Validation

In some cases, it may not be necessary to validate every single folder. There are situations where we need more flexibility. To make additional files or directories valid, you can add an ellipsis (`...`).

For example, take this schema that represents Java’s source code.

```pathschema
src/
	main/
		...
	test/
		...
+pom.xml
```

Java having lots of nested directories can make this more tedious to structure, but we can skip this part using the ellipsis.

# Using the Command Line

The PathSchema command line tool provides detailed feedback on the validation process. Any failures will always give provide an explanation.

Usage:

```python
python -m pathschema path/to/.pathschema ./directory/to/validate/
```

*If you only want to see the errors, you can add the optional flag `--errors-only`.*

Example logs of a missing required file: 

```log
FAIL  /home/runner/work/test/test
	Missing required file README.md
  OK  /home/runner/work/test/test/.git
  OK  /home/runner/work/test/test/pathschema.txt
  OK  /home/runner/work/test/test/.github
  OK  /home/runner/work/test/test/.github/FUNDING.yml
  OK  /home/runner/work/test/test/.github/workflows
  OK  /home/runner/work/test/test/.github/workflows/build.yml

Valid files: 6/7
FAILED
```

# Using PathSchema in GitHub Workflows

A good place to use PathSchema would be in GitHub Workflows to validate your project structure as soon as a new pull request comes in.

Below is a sample workflow that can detect invalid pull requests. If there is a failure, users can easily go in the action log and find exactly what caused the failure.

```yaml
name: Example Validation

on:
  push:
    branches:
      - 'main'
  pull_request:
    branches:
      - 'main'

jobs:

  validate:
    name: Validate Structure
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-python@v4
        name: Set up Python 3.10
        with:
          python-version: '3.10'

      - name: Install PathSchema
        run: python -m pip install pathschema

      - name: Validate Files
        run: python -m pathschema .pathschema .
```
