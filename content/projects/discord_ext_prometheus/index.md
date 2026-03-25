---
title: Prometheus Extension for Discord.py
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
    url:  https://github.com/Apollo-Roboto/discord.py-ext-prometheus
  - name: PyPi
    url: https://pypi.org/project/discord-ext-prometheus/
  - name: Grafana Dashboard
    url: https://grafana.com/grafana/dashboards/17670-discord-bot/
---

*Originally created in 2022*

As I was on a DevOps team at the time, I wanted to put the Prometheus metrics into everything. I had to make one for my own Discord bot

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

![Grafana Dashboard](./preview.png)

The grafana dashboard shows a bunch of overall metrics:
- Many discord bot support.
- All called commands, including buttons and other Discord interactions.
- Stats like the amount of users and servers each bot sees.
- Up time and connection status with latency.
- Logs rate (optional)

So it has all to get a good overview on how your bots are doing.
