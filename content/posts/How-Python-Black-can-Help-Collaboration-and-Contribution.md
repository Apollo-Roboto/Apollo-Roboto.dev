---
title: "How Python Black Can Help Collaboration and Contribution"
date: 2024-06-23
draft: false
tableOfContent: false
author: Apollo-Roboto
priorityTags:
  - Python
  - Best Practices
tags:
  - Python
  - Module
  - Best Practices
  - Fomratting
summary: Formatting Python code with Black is great! Let's see how a formatter will make your life easier in your open source projects.
frameworks:
  - name: Python
    version: "3.11"
  - name: Black
    version: "24.4.2"
urls:
  - name: Black PyPi
    url: https://pypi.org/project/black/
---

Formatting can cause a lot of headaches, especially when working with a team. At some point, the common debate of “tabs vs spaces” will come up and a decision will need to be made. Well, these days in python, there’s a third answer: Black.

Python Black is a python module to format your code. It’s easy to install and use. This simple formatter can not only solve the indentation paradigm, but lots of other issues you weren’t expecting that comes with a formatter.

# Offloading the Concerns

With Black, you do not care about spaces vs tabs, it will have to be what Black decides for you. Most of its decisions are highly influenced by PEP 8, the official python styling guide. The formatter will make lots of decision for you and your team. Here are some of the concerns that easily go away by trusting Black:

- tabs vs (2, 3, 4, 8?) spaces
- single quotes vs double quotes
- maximum line width
- line wrapping
- line endings
- whitespace between classes and functions
- trailing commas
- etc.

*I’m not specifying what Black uses here, because I no longer need to care anymore. I’ll just go with it.*

# Improved Pull Requests

I often get annoyed by pull requests that changes some whitespace in an unrelated file. That causes the git commit to include a file that was completely irrelevant to the implemented feature.  Those could bring conflicts you know! When working fast, it can be considered nit picking to stop a PR for those little things.

But when you enforce a formatter as part of the PR review, those concerns goes away. This isn’t specific to Black, but any formatter. It’s good practice to include a step to check the formatting of the code before merging.

If you want to include a check in your GitHub repository, here is a quick workflow file:

```yaml
name: Pull Request Validation
on:
  pull_request:
    branches:
      - main
jobs:
  verify:
    name: Verify
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-python@v4
        name: Set up Python 3.11
        with:
          python-version: '3.11'

      - name: Install Dependencies
        run: python -m pip install black
        
      - name: Check Formatting
        run: python -m black --check ./<package> # insert the path to your code here
```

# Best for the Open Source Community

I strongly believe this is an excellent formatter for the community. When I see a project use Black, I know I can contribute without worrying about this repository’s standards (Please read the repository’s contribution guidelines). I’ll just run black when I’m done.

After discovering this tool, I’m finally ready to put the “tabs vs space” conflict to rest. Because in the end, consistency matters most.
