---
layout: post
title: Raytracing in Bash
description: A minimal raytracer written entirely in bash
---

Last semester I took an introductory course in raytracing.

We practiced an iterative development cycle in which we built up more and more complex ray tracers over the course of the semester. The very first ray tracer was pretty simple: it had to be able to intersect rays with simple geometric objects and display the results, but there didn’t have to be any lighting calculations or anything yet.

Once I figured out the assignment in OCaml, I decided to give it a shot entirely in Bash!

(Well, not ENTIRELY in Bash. I will admit I shelled out to bc for floating point operations. A friend pointed out you could do floating point in Bash by having seperate variables for the integer and decimal components, but that’ll have to wait for version two)

It prints out the raytraced image directly to the console using special unicode characters and coloring through escape codes. Here’s what the result looks like:

![Bash ray tracer output](/public/images/bash-ray-tracer.png)

Not exactly pretty, but it works! (if only there was a way to change the line spacing in gnome-terminal).

The script is available as a gist: [raytracer.sh](https://gist.github.com/herbps10/5d606d52e6d18b8c0f34825f22f9c713/)
