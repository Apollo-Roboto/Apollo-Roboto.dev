---
title: "Code Test"
date: 2022-08-17
draft: true
tableOfContent: false
author: Apollo-Roboto
tags:
  - Test
---

# Code Test

Inline `Code`.

```
code block
```

```python
# some python code
def display(value):
    print(f"== {value} ==")

for x in range(50):
    if(x % 2 == 0):
        continue
    display(x)

class Cube:
	def __init__(self, side):
		self.side = side
```

```c#
// some C# code
public static void Display(int val)
{
	Console.WriteLine($"== {val} ==")
}

public static void Main(string[] args)
{
	for(int x = 0; x < 50; x++)
	{
		if(x % 2 == 0)
			Display(x);
	}
}

public class Cube
{
	public double Side {get;set;}
	public Cube(double side)
	{
		this.Side = side
	}
}
```

Constants
```c#
public const float PI = 3.14159;
```

html
```html
<body>
	<p>Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Proin </p>
</body>
```

Long line
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere ex scelerisque egestas porta. Aliquam vitae turpis sed urna vehicula cursus. In fringilla commodo velit eget ultricies. Suspendisse sodales eros vel euismod iaculis. Aliquam maximus tempor lorem quis sodales. Mauris molestie elementum auctor. Nulla
```