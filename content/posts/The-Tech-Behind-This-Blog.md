---
title: "The Tech Behind This Blog"
date: 2022-11-04
draft: false
tableOfContent: false
author: Apollo-Roboto
priorityTags:
  - Hugo
  - Tailwindcss
  - Website
tags:
  - Hugo
  - Tailwindcss
  - GitHub Pages
  - GitHub Actions
  - Website
  - Project
  - HTML
  - CSS
  - Go
summary: Brief post of the tool I used for the creation of this blog.
---

This is a post to briefly explain what I used to create this blog without getting too technical. I am sure this stack will be useful to some as it cost me nothing to host and is very easy to maintain.



# Hugo

Since I didn’t want to manage any server side code, I settled on creating a static website. A static website is a simple site that does not require any server rendering. Each page has their own html file which also makes the site load really fast!

This is where Hugo comes in. It’s a framework written in Go to generate static websites. Each post is written in Markdown and Hugo generates all the html files using Go’s templating engine. I really like how quick it is to generate the site, and I only need to do it once!

Generating the entire site is done with one command:

```powershell
hugo --minify
```

*Installation and more on the [Hugo website](https://gohugo.io/).*



# Tailwindcss

There are a lot of community made themes for Hugo, I do recommend everyone to explore them since making your own can be time consuming. So of course I wanted my own.

I used Tailwindcss to create the style of the site. CSS is confusing at times and I found that Tailwindcss was really good at simplifying the design process. Also, it produces a CSS file that includes only the class needed, unlike other framework such as Bootstrap.

To Setup Tailwindcss, let’s first create a theme:

```powershell
hugo new theme [name]
```

And install Tailwindcss in the new theme directory.

```powershell
cd ./themes/[name]
npm install -D tailwindcss
npx tailwindcss init
```

Create the base css file for Tailwindcss at `.static/css/input.css`. It only needs those 3 lines to work.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add the tailwind execution to the newly created `package.json`.

```json
{
	"devDependencies": {
		"tailwindcss": "^3.2.22"
	},
	"scripts": {
		"tailwind": "npx tailwindcss -i ./static/css/input.css -o ./static/css/tailwind.css --watch"
	}
}
```

*Installation requires [Node.js](https://nodejs.org/).*



# GitHub Pages

This is where the site is being hosted, for free! I do pay for the domain, but GitHub can give you a free URL in the format `https://{username}.github.io/{repository}`.

It was surprisingly easy to configure as you mostly just need to go into the settings of the repository to enable it. Keep in mind that the repository needs to be public to fall under the free plan.

Find it under `Settings > Code and automation > Pages`. 

*More info on [GitHub](https://pages.github.com/).*



# GitHub Actions

To update the site with new content, I configured some GitHub actions to publish the generated code automatically into the GitHub pages repository. I did separate the source code and the generated code into two repositories, this is mostly to keep my drafted content hidden.

Here is a sample of the configurations that I used. It should be saved at `.github/workflows/main.yml`.

```yaml
# main.yaml
on:
  push:
    branches:
      - master
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: latest

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/master'
        with:
          personal_token: ${{ secrets.PERSONAL_TOKEN }}
          external_repository: Apollo-Roboto/Apollo-Roboto.dev
          publish_dir: ./public
          exclude_assets: ''
```



# Conclusion

This blog is a big learning milestone for me and I’m very happy with what I created here. Now to to the most challenging part: actually writing more posts!