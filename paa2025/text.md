# Title slide

I'm Herb Susmann, I'm currently a postdoc at NYU Grossman School of Medicine. I'm presenting joint work with Leontine Alkema from the University of Massachusetts Amherst.

# ArXiv

This work is available as a preprint, at [https://arxiv.org/abs/2410.09217](https://arxiv.org/abs/2410.09217).

# Motivation

Our overall goal is to build statistical models for estimating and projecting demographic and health indicators. As our working example we'll look at male life expectancy at birth, which we call $e_0$. Below is a plot showing $e_0$ for a few countries over time. 

Statistical models typically assume that the indicator exhibits smoothness of some sort, whether that be smoothness in time, space, across age groups, etc. For $e_0$, we can see this smoothness; for example, for most of the history of South Korea, male life expectancy has increased smoothly.

However, some indicators exhibit shocks. For example, $e_0$ may decrease because of wars, famine, or otehr disasters. We see this in all six of these examples.

A statistical model that assumes smoothness will typically not perform well when fit to data that have shocks. Typically this will manifest in projections with overly high uncertainty.

We propose a practical way to augment statistical models with Bayesian shrinkage priors to fit data with shocks.

# Smooth transition model
To set up the problem, we start by defining a smooth statistical model for projecting life expectancy.

Let $\eta_{c,t}$ be the true male life expectancy at birth in country $c$ and time $t$.

We model the change in $\eta_{c,t}$ as the sum of the expected rate of change, given by a function $f$, and a deviation $\epsilon$. 

For the examples we show here we chose to model the expected rate of change using a B-spline transition model. The idea is that we can flexibly model the expected rate of change as a function of level flexibly, while still assuming there is a smooth relationship.

Following extant work, we chose to model the deviations as following a white noise process.


# Transition model with shocks

Our proposal is to add an additional term to the transition model, $\delta_{c,t}$, which we call the shock term. There is a separate shock term for every country $c$ and time $t$.

The idea is that the $\delta_{c,t}$ should capture negative shocks like we see in these examples. However, a-priori we expect it to be small for most years. 

# The horseshoe prior

We need a way to encode our prior belief that the shock term should be near zero for most years. This reflects our prior knowledge that typically life expectancy evolves smoothly, with only rare large shocks.

A classical Bayesian approach to this problem is to place a prior on $\delta_{c,t}$ that shrinks it towards zero unless there is significant evidence of a large shock. 

An important and well-known prior that achieves this is the _horseshoe prior_. The prior is set up to shrink most of the shock terms to zero, while allowing some small number of them to escape this shrinkage if there is sufficient evidence. 

Graphically, we can look at some example priors on the marginal distribution of a shock term. A standard normal or student-t prior, for example, has pretty thick tails that would allow many shock terms to be non-zero. The horseshoe prior, shown in black, has much thinner tails that pull the shock terms a-priori towards zero.


# Regularized horseshoe
The horseshoe is simple to write, but has some practical problems in that it's hard to sample from using standard Bayesian computational methods. 

There's an alternative called the _regularized horseshoe_ that addresses these problems. It also has the benefit of allowing us to add some basic prior information on the expected size of a shock. 

# Regularized horseshoe

Here's a plot showing the regularized horseshoe compared to the traditional horseshoe (shown in black). One of the tuning parameters of the regularized horseshoe allows us to control the tail behavior, allowing us to add some prior information on the size of shocks that escape regularization.

In our preprint we provide guidance on how to go about setting the tuning parameters for the regularized horseshoe.

# Estimated shocks

Let's dive into the results. We fit the proposed model to life expectancy data from the United Nations World Population Prospects 2022. 

Here I'm showing the same six example countries introduced earlier. The observed male life expectancy at birth is still shown as the black points. Now I'm adding where the model detects shocks. The blue triangles show ``shock-corrected" estimates of $e_0$: what the life expectancy would have been if the shock hadn't occurred, and life expectancy had continued following the estimated smooth trends.

# Example projections

Now let's take a look at some example projections from the model, with and without shocks. The red lines show the median projection from the model without shocks, and the pink areas show the 80% uncertainty intervals. The blue lines and teal areas show the median and 80% intervals from the model that includes shocks.

# Summary

We were interested in looking at whether including a shock significantly changes the projections. On the left, we compare the posterior median $e_0$ projection at 2095-2100, with the model without shocks on the $x$-axis and the model with shocks on the $y$-axis. Most points fall along the diagonal line, indicating that the two models generate similar projections in terms of central tendancy. 

On the other side, we're comparing the 80% credible width. Here, the model without shocks has significantly wider uncertainty width than the model with shocks. This shows that including shocks reduces projection uncertainty because it is able to detect and model separately the shocks.

# mCPR example
I wanted to briefly show another application where we've found that including a shock term can be helpful. We also work on estimating and projecting modern contraceptive prevalence rate across countries using data from international surveys. These data are more sparse: in some countries, we only have observations every few years, so we need a statistical model to fill in historical estimates. These data may also exhibit shocks, but it's not always clear a-priori when or where a shock should be expected. Here I'm showing two countries, Rwanda and Timor-Leste. The left column shows model estimates without a shock term, and the right column shows estimates with a shock term. In Rwanda, the model without shocks is not able to capture the higher data point in the 1990s, while the model with shocks is able to capture it, and estimates the presence of a shock that led to contraceptive prevalence to decrease. In Timor-Leste, the model without shocks smooths over the lower observations around the year 2000, while the model with shocks is able to capture them. 

# Discussion

Overall, we found that Bayesian shrinkage priors are a natural, principled method for building models that can handle data that exhibit shocks. Shocks show up often in demographic and health indicators, so this is an important tool for building robust models.

One important thing to keep in mind is what the goal of the model is. There is a subtle difference between trying to project the value of an indicator, and the _shock-free_ value of an indicator. For life expectancy, for example, we may want to estimate _shock-free_ life expectancy vs. life expectancy that includes the possibility of shocks. Our model can do both, and it's important to be explicit about what the indicator of interest is.

Practically speaking, these methods can be incorporated into Bayesian models using software like Stan or `brms`; we have code available if you're interested in using these priors in your own models.

To wrap up, I wanted to point you again to our manuscript where we have many more details including detailed results from several validation exercises.
