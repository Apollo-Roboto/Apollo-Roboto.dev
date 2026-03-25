---
title: Validating File Structure With PathSchema
date: 2026-03-17
draft: false
author: ApolloRoboto
summary: A Python module that validate file structures to enforcing conventions and catching errors early.
thumbnail: thumbnail.png
featured: false
categories:
  - Computer Programming
main_tags:
  - Python
  - Library
tags:
  - Python
  - Validation
  - Organization
  - Planning
  - CI/CD
  - File System
  - Open Source
urls:
  - name: GitHub
    url:  https://github.com/Apollo-Roboto/python-pathschema
  - name: PyPi
    url: https://pypi.org/project/pathschema/
  - name: Web Demo
    url: https://apollo-roboto.github.io/python-pathschema/
---

*This is a project from 2023*

File structures, one of my weird obsessions.

I realized that the moment you want to standardize a folder's file, it's very hard to enforce it. What I've seen is that developers will often let the tools that rely on them fail rather than being preventive with scripting or unit testing. Which sometimes, especially during complex CI/CD pipelines, could fail be very far down the road.

I wanted a flexible preventive approach to file validation, something that can run in CI Pipelines. This is where I came up with PathSchema.

After giving it a test run, it became surprisingly useful to me. I was able to organize way beyond code projects, but also a bunch of messy folders on my computer. I use it on all my photos, videos, 3D model, references, etc. When I want to sort out a mess, I create a `.pathschema` file, write the structure I want, then run it and all misplaced files are highlighted. I love this.

[Checkout the web demo!](https://apollo-roboto.github.io/python-pathschema/)

It's simple to write:
```pathschema
photos/
	"[0-9]{4}"/          # regex expression
		"[0-9]{2}"/
			*.png        # glob pattern
		unknown_month/
			*.png
	unknown_date/
		*.png
	other/
		...              # any
```

And easy to use:

```bash
$ python -m pathschema path/to/.pathschema ./directory/to/validate/
```

<!--
photos/
├╴2026/
│ ├╴03/
│ │ ├╴ 1.png
│ │ ├╴ 2.png
│ │ ╰╴ 3.mp4
│ ├╴04/
│ │ ├╴ 1.png
│ │ ├╴ 2.png
│ │ ╰╴ 3.png
│ ╰╴april/
│   ╰╴ 1.png
├╴audio/
│ ╰╴ lasers.wav
╰╴unknown_date/
-->

```log
  OK  /photos
  OK  /photos/2026
  OK  /photos/2026/03
  OK  /photos/2026/03/1.png
  OK  /photos/2026/03/2.png
FAIL  /photos/2026/03/3.mp4
        Path not allowed
  OK  /photos/2026/04
  OK  /photos/2026/04/1.png
  OK  /photos/2026/04/2.png
  OK  /photos/2026/04/3.png
FAIL  /photos/2026/april
        Path not allowed
FAIL  /photos/audio
        Path not allowed
  OK  /photos/unknown_date

Valid paths: 10/13
FAILED
```

Example above shows a misplaced video file, misplaced folder and another folder not following the naming convention.

