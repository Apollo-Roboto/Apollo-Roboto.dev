---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
draft: true
tableOfContent: false
author: {{ .Site.Author.name }}
tags:
  - Tag
---