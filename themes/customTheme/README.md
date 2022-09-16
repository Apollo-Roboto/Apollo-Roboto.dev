# Parameters

Example parameters:
```yaml
params:
  pride: true
  visualEffects: true
  githubIssueUrl: https://github.com/Apollo-Roboto/Apollo-Roboto.dev/issues/new/choose
  socials:
  - name: GitHub
    url: https://github.com/Apollo-Roboto
    userName: Apollo-Roboto
    iconUrl: /images/GitHub_Icon.svg
  - name: Email
    url: mailto:Apollo_Roboto@outlook.com
    userName: Apollo_Roboto@outlook.com
    iconUrl: /images/Email_Icon.svg
```

# Fix the codeblock generation:
In config.yaml, configure the highlighter to generate classes

```yaml
markup:
  highlight:
    noClasses: false
```

# Redirects to social media

It's possible to configure the url `yourSite.com/twitter` to redirect to `www.twitter.com/username`
based on the socials parameters. Sadly it's not automatic, but there is an archetype in place to
create those redirects.

```bash
hugo new redirects/social.md
```

Example markdown file with ko-fi:
```md
---
socials: Ko-fi
url: /ko-fi
aliases:
  - /kofi
---

<!-- NO CONTENT WILL BE RENDERED -->
```
The `socials` parameter needs to match the social name from `config.yaml`, the target url will be
taken from there.

As for the `url` parameter, this is the source url.

`aliases` allows you to define multiple ways to redirect to the same social media
