---
title: Tic-Tac-Toe for Galaxy Watch
date: 
draft: true
author: ApolloRoboto
summary: A stylish Tic-Tac-Toe app for Galaxy watch written with Xamarin. With more than 100k downloads!
thumbnail: thumbnail.png
featured: false
categories:
  - Computer Programming
main_tags:
  - Galaxy Watch
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
    url:  https://github.com/ApolloRoboto/simple_TicTacToe_Watch
  - name: Galaxy Store
    # url: https://galaxy.store/simpletic
    url: https://galaxystore.samsung.com/geardetail/org.tizen.example.TicTacToe_Watch.Tizen.Wearable
---

*This is a project from 2020*

The Galaxy Watch 3 was really cool, that rotating bevel is my favorite feature. Sadly *(or for the best)*, Samsung has moved away from TizenOS to Google's Wear OS. this version has become badly supported and there is pretty much zero new applications coming out. Despite that, I still really like this watch and I wear it sometimes.

Because I had to be nerdy about it, I absolutely wanted to make an app on it. I settled on a simple game of Tic-Tac-Toe. You can still download it today if you have a compatible watch, but the galaxy store is discontinuing TizenOS so that may go away soon. I can't see the page myself anymore.

{{< gallery col=2 >}}
  {{< gallery-image src="photo_1.jpg" alt="App icon as seen from the application menu" >}}
  {{< gallery-image src="photo_2.jpg" alt="Preview of the a game on the Galaxy Watch" >}}
{{< /gallery >}}

This got a surprising 100k downloads over it's time in the store, placing it in the top 50 games of the Galaxy Watch Store.

# How it was built

The application was built with Xamarin in C# for TizenOS. Having some little experience with XAML at the time, I was confident in being able to put it together.

When the game is over, it reset automatically after a few seconds, simple and far from complicated.
I followed the Samsung design guidelines to respect the spacing and design standards of the icon. The final look and feel is super clean and I'm still happy about it today.

I had a lot of fun putting this together, super simple and effective. When I looked back at this project I noticed it is published as `org.tizen.example`, nice little student mistake.

# Some stats

As I mentioned, this app was downloaded a lot, so here is a little proof from the Samsung Seller Portal:

{{< gallery >}}
  {{< gallery-image src="download_stats.png" alt="Screenshot of the download dashboard" >}}
{{< /gallery >}}

From here you can see it flatting out just as the TizenOS support ended. I'm still surprized that it kept getting so many more downloads still in 2025.
