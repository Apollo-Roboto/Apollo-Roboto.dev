# Parameters

Example parameters:
```yaml
params:
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