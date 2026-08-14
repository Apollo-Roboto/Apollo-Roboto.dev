---
title: Galaxy Watch app with 100k downloads
date: 2026-08-14
author: ApolloRoboto
summary: A stylish and simple Tic-Tac-Toe app for Galaxy watch. With more than 100k downloads.
weight: 70
featured: false
draft: false
thumbnail: thumbnail.png
categories:
  - Computer Programming
main_tags:
  - Smart Watch
  - Xamarin
  - C#
tags:
  - Galaxy Watch
  - Smart Watch
  - Xamarin
  - C#
  - TizenOS
  - Open Source
  - Design
  - Game
urls:
  - name: GitHub
    url: https://github.com/ApolloRoboto/simple_TicTacToe_Watch
  - name: Galaxy Store
    # url: https://galaxy.store/simpletic
    url: https://galaxystore.samsung.com/geardetail/org.tizen.example.TicTacToe_Watch.Tizen.Wearable
---

*This is a project from 2020*

The Galaxy Watch 3 was really fascinating to me, that rotating bevel is my favorite feature. Sadly *(or for the best)*, Samsung has moved away from TizenOS to Google's Wear OS. This version has become badly supported and there are pretty much no new applications coming out. Despite that, I still really like this watch and I wear it sometimes.

Because I had to be nerdy about it, I absolutely wanted to make an app on it. I settled on a simple game of Tic-Tac-Toe. You can still download it today if you have a compatible watch, but the galaxy store is discontinuing TizenOS so that may go away soon. I can't see the page myself anymore.

{{< gallery col=2 >}}
  {{< gallery-image src="photo_1.jpg" alt="App icon as seen from the application menu" >}}
  {{< gallery-image src="photo_2.jpg" alt="Preview of the a game on the Galaxy Watch" >}}
{{< /gallery >}}

This got a surprising 100k downloads over its time in the store, placing it in the top 50 games of the Galaxy Watch Store.

# How it was built

The application was built with Xamarin in C# for TizenOS. Having little experience with XAML at the time, I was confident in being able to put it together.

When the game is over, it resets automatically after a few seconds, simple and far from complicated.
I followed the Samsung guidelines to respect the app and icon design standards. The final look and feel is super clean and I'm still happy about it today.

I had a lot of fun putting this together, super simple and effective. When I looked back at this project I noticed it is published as `org.tizen.example`, nice little student mistake.

# Some stats

As I mentioned, this app was downloaded a lot, so here is a little proof from the Samsung Seller Portal:

{{< gallery >}}
  {{< gallery-image src="download_stats.png" alt="Screenshot of the download dashboard" >}}
{{< /gallery >}}

There's a spike not long after its release with ~300 downloads a day right at the end of 2020. My app is likely among the first thing many people downloaded after getting their brand new watch on Christmas. It later flattened out just as the TizenOS support ended in July 2025. I'm surprised that it kept getting so many more downloads even in 2025.
