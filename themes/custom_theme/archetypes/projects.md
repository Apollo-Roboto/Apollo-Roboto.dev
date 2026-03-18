---
title: {{ replace .Name "_" " " | title }}
date: {{ .Date | time.Format "2006-01-02" }}
draft: true
author: {{ .Site.Params.author.name }}
summary: A Short summary
# thumbnail: thumbnail.png
featured: false
categories:
  - Computer Programming
main_tags:
  - Tag
tags:
  - Tag
urls:
  - name: GitHub
    url: https://github.com/
---