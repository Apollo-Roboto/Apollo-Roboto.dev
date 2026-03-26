---
title: "Cloudflare Dynamic Public IP"
date: 2026-02-28
draft: false
author: ApolloRoboto
summary: Automatically update Cloudflare DNS entries when your public IP changes.
thumbnail: thumbnail_4.png
featured: true
categories:
  - Computer Programming
main_tags:
  - Rust
  - DNS
  - HomeLab
tags:
  - Rust
  - DNS
  - HomeLab
  - CLI
  - Cloudflare
  - Docker
  - Microservice
  - Server
  - IP
  - Networking
  - Open Source
urls:
  - name: GitHub
    url: https://github.com/apollo-roboto/rust-cloudflare-dynamic-public-ip
---

I was getting really annoyed one summer with my Internet Service Provider. They changed my public IP often, up to 4 times a month, breaking access to game servers and automations that I had setup on my little homelab. Naturally, and with little hope, I called to ask for a static IP, then was told that reserving a static IP is exclusive to their expensive professional plans.

So what can I do about it? Well I can automate my DNS entries in Cloudflare. The plan is simple, monitor my public IP, then, if it changes, reach Cloudflare through their DNS API and update all old IP to the new one. With slow refresh, this gives about 5 minutes down time max. Not bad.

Funny enough, when I finished it and got it running, the public IP changes stopped. I was anxiously waiting for weeks to see it all work with a real external change. The ISP must have slowed down their updates. But boy was I happy to see it all get updated when my IP did change.

# Technical stuff

This project was written in Rust and is made to be run through Docker so it can be easily hosted anywhere. Rust is fantastic for projects like this, the application uses about 8mb of ram on its own, I'm sure this can still be improved. Docker adds a lot of weight of course, but it's also very convenient.

The CLI is built with [clap](https://crates.io/crates/clap), an easy to use library for console interfaces. Here's what the `help` looks like:

```txt
Automatically update public ip address in Cloudflare DNS records

Usage: cfdpip [OPTIONS] <COMMAND>

Commands:
	current  Print the current public IP
	check    Print the affected DNS records, useful to test the connection to Cloudflare
	monitor  Monitor and update DNS records on Cloudflare when the public IP changes
	help     Print this message or the help of the given subcommand(s)

Options:
	-v, --verbose <VERBOSE>  Set verbosity level [default: info] [possible values: off, error, warn, info, debug, trace]
	-h, --help               Print help
	-V, --version            Print version
```

I wrote my own little wrapper around Cloudflare's REST API. I didn't had many endpoints to interface with so that wasn't too difficult to implement. This project was an opportunity to learn more about client mocking in unit tests with [httpmock](https://crates.io/crates/httpmock).

Getting my current public IP for the monitoring wasn't too challenging thanks to this library simply called [public-ip](https://crates.io/crates/public-ip).

I never found a good name for this project, so enjoy the awkwardly long and technically correct boring name *(suggestions are welcome)*.
