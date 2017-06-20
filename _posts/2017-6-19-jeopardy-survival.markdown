---
layout: post
title: Jeopardy! Survival Analysis
description: Kaplan-Meier survival plot of Jeopardy winning streaks
---

Long streaks are rare in Jeopardy. Most winners only win one game, and slightly less than 40% win two games in a row. In fact, only 6 contestants have won more than ten games in a row.

This [Kaplan-Meier survival plot](https://en.wikipedia.org/wiki/Kaplan%E2%80%93Meier_estimator) visualizes the survival function of Jeopardy winners:

<img src='/public/images/jeopardy-survival-plot.png' width='95%' alt='Kaplain-Meier survival plot of Jeopardy! winning streaks' />

The point on the extreme right is due, of course, to Ken Jennings and his 74 game winning streak.

Here's the [R code](https://gist.github.com/herbps10/c3282c5b869d7a33d601079e66eba490) for the figure.
