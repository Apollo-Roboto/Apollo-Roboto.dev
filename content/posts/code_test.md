---
title: Code Test
date: 2022-08-17
draft: true
author: ApolloRoboto
summary: Test the look and feel of code within an article
categories:
  - Testing Thingies
main_tags:
  - Test
tags:
  - Test
---

Inline `Code`.

```
code block
```

```python
# some Python code
def display(value):
	print(f"== {value} ==")

class Cube:
	def __init__(self, side):
		self.side = side

def main():
	for x in range(50):
		if(x % 2 == 0):
			continue
		display(x)

if __name__ == '__main__':
	main()
```

```Rust
// some Rust code
pub fn display(val: u32) {
	println!("== {val} ==");
}

pub struct Cube {
	pub side: f32,
}
impl Cube {
	pub new(side: f32) -> Self {
		Self {
			side,
		}
	}
}

pub fn main() {
	for x in 0..50 {
		if(x % 2 == 0) {
			display(x);
		}
	}
}
```

```c#
// some C# code
public static void Display(int val)
{
	Console.WriteLine($"== {val} ==")
}

public class Cube
{
	public double Side {get;set;}
	public Cube(double side)
	{
		this.Side = side
	}
}

public static void Main(string[] args)
{
	for(int x = 0; x < 50; x++)
	{
		if(x % 2 == 0)
			Display(x);
	}
}
```

Constants
```Python
PI = 3.14159
```
```Rust
pub const PI: f32 = 3.14159;
```
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
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere ex scelerisque egestas porta. Aliquam vitae turpis sed urna vehicula cursus. In fringilla commodo velit eget ultricies.
```