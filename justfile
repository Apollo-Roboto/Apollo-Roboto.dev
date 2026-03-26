set windows-shell := ["powershell.exe", "-c"]

[private]
default:
    @just --list --unsorted

# Host the site locally with drafts and future content
server:
    hugo server --buildDrafts --buildFuture --ignoreCache --noHTTPCache --disableFastRender --enableGitInfo --cleanDestinationDir --printMemoryUsage --renderToMemory

# Build the site with drafts and future content
build:
    hugo build --buildDrafts --buildFuture --minify --enableGitInfo

# Clean all build and temporary files
[windows]
clean:
    hugo mod clean --all --quiet
    $file = "./public/"; if (Test-Path $file) {Remove-Item -Recurse $file}
    $file = ".hugo_build.lock"; if (Test-Path $file) {Remove-Item $file}
    $file = "hugo_stats.json"; if (Test-Path $file) {Remove-Item $file}

# Clean all build and temporary files
[unix]
clean:
    hugo mod clean --all --quiet
    rm -r "./public/"
    rm ".hugo_build.lock"
    rm "hugo_stats.json"

# Add a new project content
new_project NAME:
    hugo new projects/{{ NAME }}.md
    code ./content/projects/{{ NAME }}.md

# Add a new redirect content
new_redirect NAME:
    hugo new redirect/{{ NAME }}.md
    code ./content/redirect/{{ NAME }}.md
