---
title: {{ replace .Name "_" " " | title }}
date: {{ .Date | time.Format "2006-01-02" }}
draft: true
author: {{ .Site.Params.author.name }}
main_tags:
  - tag
tags:
  - Tag
---