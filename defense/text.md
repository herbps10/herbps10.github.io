# Bayesian Hierarchical Temporal Modeling and Targeted Learning with Application to Reproductive Health

# Follow along

# Background

I'm going to start by giving a broad overview of the subject of my thesis.

The international community has set ambitious goals for improvement in global health. 
For example, the UN [Sustainable Development Goals](https://sdgs.un.org/goals) set the target of universal access to reproductive health-care services by 2030 ([SDG Target 3.7](https://sdgs.un.org/goals/goal3)).

To meet these goals, it's important to know the answers to two questions.

First, where is improvement needed? Chapters 1 and 2 help to answer this question through statistical methods for estimating and projecting global health indicators, so we can understand where progress still needs to be made.

Second, once we know where improvement is needed, can we identify which interventions are effective in improving health outcomes? Chapter 3 develops novel statistical tools to answer this question.

# Outline

# Outline

# Chapter 1 Background

There is growing interest in modeling demographic and health indicators, like the under-five mortality rate or maternal mortality rate, in order to track progress towards meeting international goals.


This is a tricky problem because data are not always available in every country and data are of varying quality. Statistical models are needed to combine all the existing data into estimates and projections with uncertainty.


Many different models have been created and published for various indicators, and sometimes multiple models exist for the same indicator. But comparing across models is difficult because they each use different notation and conventions.


To help document models and the assumptions they make, as well as facilitate comparing across models, we propose in this chapter an overarching model class that encompasses many existing approaches under one framework and notation, which we are calling **Temporal Models for Multiple Populations** (TMMPs.)

# Publication

This chapter has been published in [International Statistical Review](https://onlinelibrary.wiley.com/doi/full/10.1111/insr.12491).

# Background

As a case study, we’re going to look at two existing models of the under five mortality rate. On the left we have estimates of the U5MR from 1950 to 2019 in Senegal from a model created by the Institute for Health Metrics and Evaluation ([Dicker  2018](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)31891-9/fulltext)), and on the right are estimates from a model by the UN Inter-agency Group for Child Mortality estimation ([Alkema and New 2014](https://projecteuclid.org/journals/annals-of-applied-statistics/volume-8/issue-4/Global-estimation-of-child-mortality-using-a-Bayesian-B-spline/10.1214/14-AOAS768.full)). The models give differing estimates, so a natural question is how the models differ. Comparing them is difficult, though, because the published descriptions of the models use different notations. 

# GBD model
Here's a glimpse of how the GBD model is described in the author's original notation.

# IGME model
And here is a figure from the paper that describes the IGME model giving an overview of the model structure. 

It's difficult to compare across the two models when they are written in such different notation.

Now I’m going to describe our model class, before coming back to these two models later to show how they can be written using our framework.

# TMMPs

Now I’m going to describe the setup for the framework, which is organized around a distinction between the observed data and the true, unobserved values of the indicator over time.


First, we define the true values of the indicator in each country and time point, which we call $\eta_{c,t}$.
 
The first part of the model, which we call the _process model_ describes how we think these true values evolve over time, perhaps drawing on values of covariates or on temporal trends we expect to see in the indicator.


Then have some observed data $y_i$,  where each data point has some properties associated with it, like a country $c[i]$, time point $t[i]$, or data source $s[i]$.


The second part of the model, the _data model_, describes the relationship between the observed data and the truth; this is where we can model things like sampling errors and systematic biases.

# Framework structure
This diagram summarizes the high-level structure of the framework: we have the latent, true values which evolve over time according to the process model, and then the data model describes how the noisy observed data is generated from the truth.


# Data Model

We've mostly focused on understanding the various possibilities for the process model, but for completeness I give two examples here of possible data models.

For example, we might posit that the observed data are normally distributed around the unobserved true value of the indicator, with variance equal to an estimated sampling variance.

If the observed data are counts, we might adopt a Binomial data model.

# Process Model Structure
In our framework, we break the process model into multiple building blocks.

On the left hand side, we have the true value of the indicator $\eta_{c,t}$, possibly transformed.

On the right hand side, we have four components, which I'll describe one by one.


Let’s go through each one of these components one by one.

# Covariate Component
The covariate component is typically some kind of regression function that allows for modeling the true value of the indicator in terms of a set of covariates. 

# Systematic Component
The systematic component is a parametric function that describes how the indicator evolves over time. This is helpful if we expect trends to follow a particular shape over time.

# Offset Term
The offset term allows for the use of external information, for example from a separate modeling stage. 

# Smoothing Component
The last term, $\epsilon_{c,t}$, models trends not captured in the other components, while still enforcing some degree of smoothness on the resulting estimates.


Existing models use a lot of different approaches for the smoothing component, like B-splines, Gaussian Processes, autoregressive processes and random walks, and spatio-temporal smoothing methods.

# Hierarchical modeling
Each of these components introduces parameters that need to be estimated, with a typical model having hundreds or thousands of parameters. 

Hierarchical modeling is a powerful method used in many models to share information about parameters between units, which is helpful especially in data sparse settings. Because this introduces extra assumptions, it’s important to clearly document it, which can be done within the TMMP framework. 

# Comparing the models
We rewrote both of the U5MR models using our proposed model framework.

Once they are expressed in a common notation, it's much easier to compare them.

# Contributions

In this chapter, we proposed a model class called Temporal Models for Multiple Populations for statistical models of demographic and health indicators.

Our paper describes the model class in more detail and details six existing models using TMMP notation.

# Outline

In this chapter we turn to the problem of estimating and projecting demographic and health indicators.

# Chapter 2 Background

There are some indicators that seem to evolve similarly across populations.

In particular, there are indicators that tend to transition between two stable states.

The [Demographic Transition](https://en.wikipedia.org/wiki/Demographic_transition) is a classic example of this: over time, countries transition from having a high total fertility rate and high under-5 mortality rate to low fertility and low mortality.

We can draw on this pattern to do a better job modeling how these indicators evolve over time.

# Case Study

As a case study we'll take a look at the Modern Contraceptive Prevalence Rate (mCPR) indicator.

# Case Study Raw Data

Some countries, like the ones in the top row, have good data availability, and we can clearly see the shape of the transition.

Other countries, like the ones in the bottom, have much less data. We would like to build a model that can accomodate both types of countries.

# Transition Models
Our first contribution is to define a model class for models of indicators that follow transitions.

We define a transition model as having a process model with a systematic and smoothing component.

The systematic component has a specific form. At a reference year $t^*$, the systematic component is equal to a parameter $\Omega$.

We then simulate forward in time. After the reference year, the systematic component is equal to the previous level plus a rate of change given by the function $f$, which we call the _transition function_. 

Similarly, we simulate backwards in time by taking the level at time $t+1$ and subtracting the rate of change.

Importantly, the transition function gives the rate of change of $\eta$ _as a function of itself_. The parameter $P_c$ is used to define a maximum level that can be reached, and $\bm{\beta}_c$ is used to control how fast the transition happens.

# FPEM Example

Let's look at an example of an existing transition model, the Family Planning Estimation Model (FPEM), which is the model currently used by the UN for estimating trends in mCPR.

Because mCPR is between 0 and 1, FPEM models the true mCPR $\eta_{c,t}$ on the logit scale.

The core assumption behind FPEM is that $\eta_{c,t}$ will follow a logistic curve over time.

Using the logistic growth assumption, you can derive a particular functional form for the function $f$ depending on two parameters: $\omega_c$ gives the rate of the transition, and $P_c$ gives the asymptote (the highest level that mCPR will reach in a country).

# FPEM example
It's easiest to see with an example.

# B-spline Transition Model

Our contribution is to estimate the transition function $f$ in a more flexible way.

Specifically, we estimate $f_b$ using [B-splines](https://en.wikipedia.org/wiki/B-spline).

# B-splines

# B-spline Transition Model

The idea with B-splines is that we define our function $f_b$ as the linear combination of a set of basis functions $B_j$ and coefficients $h_j(\beta_{c,j})$.

The smoothness of the resulting function is controlled by how many basis functions there are, which is set by placing a certain number of knots over the domain of $\eta_{c,t}$, and the _degree_ of the basis functions, where the higher the degree the smoother the resulting function.

# B-spline example
Again, it's easiest to illustrate with an example.

Note that we constrain the final knot at $P$ to be zero, so that there is an asymptote in the transition at $P$.

# Hierarchical

Ideally we would have lots of data from each country that we could use to estimate the shape of the transitions.

However, in reality there are some countries without very much data.

We would like to be able to share information about the shape of the transition across countries so that we can improve estimation and projection in countries with limited data.

To do that, we set up a hierarchical distribution on the spline coefficients so that they are nested within sub-regions, regions, and the world.

# Smoothing model

To finish specificying the process model we need to give a form for the smoothing component.

We choose an AR(1) model. The parameter $\rho$ controls the degree of autocorrelation and $\tau$ the variance of the process.

# Smoothing model example

# Hierarchical distribution example

Here's an example of a draw from that hierarchical model.

# Data model

To fully specify the model, we need to make a connection to the observed data.

We used a truncated normal data model where the variance is the sum of a fixed non-sampling error (incorporating the complex sampling design for each survey) and an additional estimated non-sampling error  for each data source. 

# Choosing the splines

Next, we needed to choose the tuning parameters for the spline model. 

We conducted several out of sample validation tests. I'm going to show you the results for just one of them, in which we held out every data point after the year $2010$, fit the model to the previous data, and then looked at how well we could predict the held out points.

Of particular interest is the empirical performance of the 95\% credible interval. What we want to see is that about 95\% of the held out points should fall within that credible interval. Overall the different setups performed similarly, with two of them getting particularly close to 95\% (I would be careful not to over-interpret the different empirical coverage rates, though.)

Based on the whole set of validation exercises, we decided to report results from the model with degree $d = 2$ and number of knots $K = 5$.

# Illustrative fits

Here are a few illustrative fits from that model.

For countries with a lot of data, we tend to see the estimates follow the observed data closely.

For countries with less data, the uncertainty between the observed data points is higher.

# Regional transition functions

An interesting consequence of how we set up the model in terms of this flexible transition function is we can look at the transition functions as a novel way of summarizing each country's transition. 

Here I'm showing the estimated transition functions for each country in gray, separated out by which subregion they are from. 

You can see that in the African subregions, the transitions tend to follow a "double-hump" shape. This suggests a slow-down in mCPR during the transition.

In Asia, we don't see this shape -- the transition seems to have been smoother.

# Comparison to logistic

The second thing we were interested in was how the new model fares in comparison to a simpler, logistic type model.

The B-spline model we used for reporting results fared slightly better than the logistic model in terms of the validation exercise where we held out all data after $2010$.

# Rwanda example

Rwanda provides an interesting example where we can see differences in how the logistic and spline models behave.

In the raw data, we can see that mCPR increased sharply in the 2000s.

# Rwanda example

When we look at the transition functions estimated by the two models, we can see a large difference.

The logistic transition is constrained to follow a particular shape, so it can't capture the sharp uptick in adoption.

On the other hand, the B-spline transition function is much more flexible and can take on a different shape to better capture the trends in the data.

# Rwanda example

Due to the decreased flexibility in the transition function, the smoothing component has to make up the difference for the logistic model.

# Rwanda example
Interestingly, the resulting model fits are similar for the two models (the spline model has perhaps slightly lower variance in projections), suggesting that the added uncertainty in estimating the more flexible B-spline model "cancels out" the reduced role of the smoothing component.

# One last example

One last example where we see some differences in the two models. In Oceania, where there tend to be less data available, we can see that the B-spline model is more conservative in back-projections than the logistic type model. Again, we're seeing the difference here because the B-spline transition model can more flexibly model (and more flexibly share information between countries) the transitions.

# Contributions

# Outline

# Chapter 3 Background

So far we've been working on methods for understanding where improvement is needed. But once we know that, how can we find out which interventions are effective for improving health outcomes?

In this chapter we're going to talk about a novel Bayesian estimator for Marginal Structural Models, which can be used to summarize how the effect of an intervention changes within population subgroups.

# Motivating example

Motivating example from [Karra et al. 2022](https://www.pnas.org/doi/10.1073/pnas.2200279119).

# Motivating example

# Motivating example

The marginal distribution of the number of children illustrates how there are some strata with few observations. We could proceed by stratifying the data and estimating a treatment effect within each subgroup separately, which might work well for the strata with many observations, but would likely perform poorly for the other strata.

# CATE

We begin by formalizing the parameter that we will try to estimate.

Start by defining the _Conditional Average Treatment Effect_, which is the difference in the outcom conditional on intervention status vs. non-intervention status within strata of covariates $x$.

# MSMs

We then seek to summarize the association between the CATE and the potential treatment effect modifier ($X_c$) using a working model.

For instance, we can define an MSM by the following equation.

Let's break down each part of this formula.

# MSMs

# MSMs

# MSMs

# MSMs

# Results

Here's what the results are going to look like. We will find the best linear approximation of how the intervention effect changes in relation to the number of children at baseline.

That is, $\beta_1$ will be the intercept of the linear approximation, and $\beta_2$ the slope.

If the line is increasing, that means the intervention has a stronger effect as the number of children increases.

# General Setting

MSMs are more general than just this example. Let's introduce a more general notation.

# General Setting

This general framework is our first contribution.

# MSMs

We can illustrate the setup with this little diagram.

We have a law $P$ in a non-parametric model $\mathcal{M}$ that is mapped to $B(P)$ in a space $\mathcal{B}$.

_Attention: $\mathcal{M}$ is an infinite dimensional space, but we're illustrating it here in only two dimensions!_

# Semi-parametric inference

# Efficient influence function of $B(P)$

# Efficient influence function of $B(P)$ for the example

# Targeted Minimum Loss-Based Estimation

# Plug-in estimation

# Targeted Minimum Loss-Based Estimation

# TMLE: update initial estimate in direction of truth
Test

# Bayesian TMLE

# Bayesian TMLE

# Bayesian TMLE illustration

# Bernstein von-Mises idea

# Bernstein von-Mises plot

# Bernstein von-Mises condition

# Bernstein von-Mises theorem

# Universal algorithm

# Results 1

# Results 2

# Contributions

# Future work

# Summary

Test
