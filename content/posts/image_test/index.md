---
title: Image Test
date: 2026-04-09
draft: true
author: ApolloRoboto
summary: Test the look and feel of images within an article
categories:
- Testing Thingies
main_tags:
  - Test
tags:
  - Test
---

some issues in getting the horizontal margin on images, I want them on all pictures, but not when included in a paragraph. currently only handled in the gallery with the `gallery` css class.

# Gallery shortcode

```md
{{</* gallery col=2 */>}}
  {{</* gallery-image src="thing.png" alt="thing" */>}}
  {{</* gallery-image src="thing.png" alt="thing" */>}}
{{</* /gallery */>}}
```

3 column *(+4)*

{{< gallery col=3 >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
{{< /gallery >}}
{{< gallery col=4 >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
{{< /gallery >}}

1 column

{{< gallery col=1 >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512.png" alt="thing" >}}
{{< /gallery >}}

4 columns transparent picture

{{< gallery col=4 >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
  {{< gallery-image src="apollo_by_tigerstooth_512x512_transparent.png" alt="thing" >}}
{{< /gallery >}}


# Images together in same paragraph

![](apollo_by_tigerstooth_512x512.png)
![](apollo_by_tigerstooth_512x512.png)

# Images in different paragraph

![](apollo_by_tigerstooth_512x512.png)

![](apollo_by_tigerstooth_512x512.png)

# Image in same paragraph with text

sample text <img width=50 src="apollo_by_tigerstooth_512x512_transparent.png"> sample text


# Image in different paragraph with text

sample text

![](apollo_by_tigerstooth_512x512.png)

sample text
