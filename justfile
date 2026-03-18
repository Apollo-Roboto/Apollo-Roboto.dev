set windows-shell := ["powershell.exe", "-c"]

[private]
default:
    @just --list --unsorted

server:
    hugo server --buildDrafts --buildFuture --ignoreCache --noHTTPCache --disableFastRender --enableGitInfo --cleanDestinationDir --printMemoryUsage --renderToMemory

build:
    hugo --buildDrafts --buildFuture --minify --enableGitInfo

clean:
    hugo --cleanDestinationDir

new_project NAME:
    hugo new projects/{{ NAME }}.md

new_redirect NAME:
    hugo new redirect/{{ NAME }}.md
