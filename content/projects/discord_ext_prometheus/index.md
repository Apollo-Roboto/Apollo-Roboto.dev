---
title: Prometheus Extension for discord.py
date: 2026-03-17
draft: false
author: ApolloRoboto
summary: A Python library that makes it easy to add Prometheus metrics to your Python Discord bot. Also includes a Grafana Dashboard.
thumbnail: thumbnail.png
featured: false
categories:
  - Computer Programming
main_tags:
  - Python
  - Discord
  - Prometheus
  - Grafana
tags:
  - Python
  - Discord
  - Prometheus
  - Grafana
  - Library
  - PyPi
  - Analytics
  - Bot
  - Extension
  - Metrics
  - Monitoring
  - Open Source
urls:
  - name: GitHub
    url:  https://github.com/ApolloRoboto/discord.py-ext-prometheus
  - name: PyPi
    url: https://pypi.org/project/discord-ext-prometheus/
  - name: Grafana Dashboard
    url: https://grafana.com/grafana/dashboards/17670-discord-bot/
---

*Originally created in 2022*

As I was on a DevOps team at the time, I wanted to put the Prometheus metrics into everything. So naturally I implemented it for my own Discord bot too.

# Implementation

This was built for the [discord.py](https://pypi.org/project/discord.py/) library. I made it as easy as possible to add, being inspired from other similar extensions, it's a simple cog that you can add with `add_cog()`.

```python
import os
import asyncio
from discord.ext import commands
from discord.ext.prometheus import PrometheusCog

async def main():
	bot = commands.Bot(
		command_prefix="!",
		intents=Intents.all(),
	)

	await bot.add_cog(PrometheusCog(bot))

	await bot.start(os.environ["DISCORD_TOKEN"])

if __name__ == "__main__":
	asyncio.run(main())
```

And from there, your metrics are accessible at `localhost:8000/metrics`

# Grafana

{{< gallery >}}
  {{< gallery-image src="./preview.png" alt="Preview of the Grafana dashboard">}}
{{< /gallery >}}

The Grafana dashboard shows a bunch of overall metrics:
- Multiple discord bot support.
- All called commands, including buttons and other Discord interactions.
- Stats like the amount of users and servers each bot sees.
- Up time and connection status with latency.
- Log rates (optional)

So it has everything you need to get a good overview on how your bots are doing. And it seems like developers are enjoying it too as It got 20 stars on GitHub at the time of writing.
