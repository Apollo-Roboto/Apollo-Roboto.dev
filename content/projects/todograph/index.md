---
title: TodoGraph
date: 2026-03-30
draft: false
author: ApolloRoboto
summary: When the simple todo list becomes a little too overengineered. Rust GUI application for managing tasks in an experimental approach.
thumbnail: thumbnail.png
featured: true
categories:
  - Computer Programming
main_tags:
  - Rust
  - GUI
  - Planning
tags:
  - Rust
  - GUI
  - Planning
  - Slint UI
  - Editor
  - Graph
  - CLI
  - WIP
urls:
  - name: GitHub
    url: https://github.com/ApolloRoboto/rust-todograph
---

*Application is a work in progress*

I present to you my overengineered todo list. My personal attempt at removing total order.

Wait hold on? What's wrong with todo lists? Well I'm glad you asked! *(hopefully)*.

{{< gallery col=2 >}}
  {{< gallery-image src="preview_1.png" alt="Showing the todograph software" >}}
  {{< gallery-image src="preview_2.png" alt="Showing a task being edited" >}}
{{< /gallery >}}

# What's the problem with todo lists?

I got a weird brain, when I write a list down, I never put the most important item at the top. Not that I'm avoiding it, just that I have a lot to write down, importance isn't in my mind at the moment. Which leads to unorganized and hard to follow todo lists. If you've ever checked items in a list from the middle first, you've absolutely fallen for this too.

There are two important element that I want to capture in my tasks: **Dependencies** and **Relations**. The **Order** is much less important in a lot of cases. Todo lists being written from top to bottom can only communicate the order of tasks, and that is the problem.

Take for example the following todo list:

```txt
Website
	Buy Domain
	Create Home page
	Create About page
	Create Base page
```

It has some important elements but it fails to communicate what's called a **dependency**: `Base page` has to be done before `Home page` and `About page`.

You could try to reorganize it by placing that dependency at the top. That's easy. But you might notice another issue:

```txt
Website
	Create Base page
	Create Home page
	Create About page
	Buy Domain
```

The `Domain` task doesn't have to be completed last, we find ourself unable to show what can be completed in parallel. This is exactly why you often check items in the middle first. In this scenario, the `Domain` and the `Pages` are all siblings, in what is called a **relation** to the `Website`.

**Note:** I think it's worth knowing that order is still around, but it only rises from its dependencies.

Does any of that make sense? Because I had a lot of fun trying to solve this problem!

# Is this really a problem?

Nope! I'm exploring silly ideas, todo lists are quick and easy to write. No need to start thinking in graphs for simple tasks! This is indeed, just a fun learning project and an overengineered solution.

# The technical side of this application

This is written in Rust, using the [Slint UI Framework](https://crates.io/crates/slint). I have a lot of fun building interfaces with this, even if not perfect. I even got to contribute to Slint while working on this. Their menu bar implementation was stuck on the white theme, which was an eyesore to me, thankfully there was an existing discussion that helped me out a lot to find what to change and where in the code. You chan check my contribution [here (#10034)](https://github.com/slint-ui/slint/pull/10034).

For some reason, I'm always looking into the UI world of Rust, it's fascinating to me. Something about a modern, performant and crashless future just piques my interrest. Take a look at [Are We GUI Yet](https://areweguiyet.com/) if that's interesting to you too.

So I learned that writing editors is hard! Unsurprising but this is my first attempt at fully featured complex editor, even if it's just for todo items. This thing needed undo redo, which means that every actions are now commands that must be capable of reversing their action. Quite a different flow to get used to, especially when thinking about memory consumption. For example, saving a snapshot of the project at each commands is easy but very memory intensive when you have a longer undo history, it's much better to store what changed instead.

Lots of commands and general feel is inspired by Blender's node editor *(Blender's gotta be my favorite software out there)*.

<!-- I haven't fully completed these yet

Data migration is also an interesting challenge I tackled. What should happen when you introduce breaking changes in the saved user files. I had two main solutions:
- The first is to have default values during deserialization in as many places as possible. That loosen the restrictions drastically during a migrations.
- The second is to call scripted conversions that are triggered by tracking a version number stored in the file's metadata. This then create a chain of migrations: if the original file is v4 and latest is v6, we do all conversions in `migrate_4_to_5` then `migrate_5_to_6`.

I also have implemented a simple cli for little actions around the data files. For browsing metadata and such.

```txt
TODO: show help stdout here
```

-->


# The future of this project

There are lots to patch out and many visual improvements to do. I would love to explore these features in the future:
- Custom user defined task types and properties.
- Custom User defined state beyond `Todo`, `Doing` and `Done`.
- Scripting support with [Rhai](https://crates.io/crates/rhai) for quick and advanced custom actions.
- Plugging support for optional features like MQTT.

**Note:** Top down order here is a suggestion, as learned above.

Plugins and scripting features are mostly for personal learning, I might only stick with Rhai depending of it's capabilities. Or maybe Scripting will be within a plugin. Won't know until I try!

Oh and if you are wondering, I am fully tracking this project within itself as a todo graph! *(It's massive)*

{{< gallery  >}}
  {{< gallery-image src="this_project_todograph.png" alt="The project within itself" >}}
{{< /gallery >}}

