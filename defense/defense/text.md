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

To finish specifying the process model we need to give a form for the smoothing component.

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

So far we've been working on methods for understanding where improvement is needed. But once we know that, how can we find out which interventions are effective for improving health outcomes? Do some interventions work better for some subgroups than others?

To answer this question, we'll take advantage of _Marginal Structural Models_ (MSMs), which are a class of statistical parameters that can be used to summarize intervention effects.
Our main contribution in this chapter is to introduce a novel Bayesian estimator for MSM parameters.

# Motivating example

Our motivating example comes from a randomized experiment conducted in Malawi ([Karra et al. 2022](https://www.pnas.org/doi/10.1073/pnas.2200279119)).

Women were randomized into intervention and control groups. The intervention group received family planning information, counseling, and free transportation to clinics, among other things.

The outcome was whether or not the women reported using contraceptives two years after the intervention.

# Motivating example

Several variables were recorded for each participant.

First, we have a set of 11 covariates $X$, including number of children (which we call $X_c$).

Second, $A$ is a binary indicator of randomization into the intervention group ($A = 1$ indicates intervention group, $A = 0$ control group).

Finally, $Y$ is a binary indicator of whether the participant reported using contraceptives two years after the intervention.

All together, we have $n$ i.i.d. draws of the generic variable $O$ from the law $P_0$ of the experiment.

# Motivating example

The scientific question that we will consider is whether the effect of the intervention on contraceptive use differs depending on the participant's number of children.

This is a potential example of what we might call "Treatment Effect Modification".

The marginal distribution of the number of children illustrates how there are some strata of number of children with few observations. We could proceed by stratifying the data and estimating a treatment effect within each subgroup separately, which might work well for the strata with many observations, but would likely perform poorly for the other strata.

Next, let's formalize the problem by introducing notation and a target parameter of interest.

# CATE

Start by defining the _Conditional Average Treatment Effect_, which is the difference in the outcome conditional on intervention status vs. non-intervention status within strata of covariates $x$.

From a causal inference point of view, the CATE is identifiable under what we call "standard causal assumptions".

# MSMs

Our strategy is to summarize the association between the CATE and the potential treatment effect modifier ($X_c$) using a working model.

For instance, we can define a new parameter $B(P)$ as the solution to the following optimization problem.

We call this structure a "Marginal Structural Model".

Let's break down each part of this formula.

# MSMs

First, we have the parameter we are trying to approximate: $\Psi_P^{\mathrm{CATE}}$.

# MSMs

Second, we have a working model which tries to predict the value of the parameter. For this example I chose a linear working model which tries to predict the CATE as a linear function of the number of children $X_c$. Here the MSM parameter $\bm{\beta}$ are two numbers: the intercept and slope of the linear approximation.

# MSMs

We then have a loss function which measures how well the working model predicts the parameter. Here I chose a squared-error loss function.

# MSMs

The parameter $B(P)$ is then the value of $\bm{\beta}$ that minimizes the loss function. That is, it is the best linear approximation of the CATE in terms of the number of children.

# Results

Here's what the results are going to look like. We will find the best linear approximation of how the intervention effect changes in relation to the number of children at baseline.

That is, $\beta_1$ will be the intercept of the linear approximation, and $\beta_2$ the slope.

If the line is increasing, that means the intervention has a stronger effect as the number of children increases.

# General Setting

MSMs are more general than just this example. Let's introduce a more general notation.

We have $n$ i.i.d. copies of a variable $O$ from a law $P_0$.

$P_0$ is in a non-parametric model $\mathcal{M}$. That is, we make no a-priori assumptions about $P_0$.

The variable $O$ can be broken down into a variable $Z$ and $X$, and then we define a functional summary $\Psi_P$ with argument $X$.

Our motivating example can be cast in this general notation, with the functional summary equal to the CATE.


# General Setting

The idea with MSMs is to approximate $\Psi_P$ with a working model.

The working model is a set of functions $m_{\bm{\beta}}$ with parameter $\bm{\beta}$.

We also need a loss function which measures, for a particular $\bm{\beta}$, how well the working model approximates $\Psi_P$.

Then we are ready to define a new parameter $B(P)$ as the parameter that best approximates $\Psi_P$ under the working model.

This general framework is our first contribution.

# MSMs

We can illustrate the setup with this little diagram.

We have a law $P$ in a non-parametric model $\mathcal{M}$ that is mapped to $B(P)$ in a space $\mathcal{B}$.

_Attention: $\mathcal{M}$ is an infinite dimensional space, but we're illustrating it here in only two dimensions!_

# Semi-parametric inference

Our goal is to estimate the value of the MSM parameter under the true data generating distribution $P_0$.

The first step is to figure out the best possible variance that an estimator can achieve in a semi-parametric model. 
We call this the semi-parametric `efficiency bound.

From semi-parametric efficiency theory, we know that any regular estimator of $\bm{\beta}$ can be written as the true value, plus the empirical mean of a function called the _influence function_, plus a term that converges to zero in probability.

In general there may be multiple possibilities for the influence function. We are interested in the influence function with the smallest variance, which is called the _efficient influence function_, denoted $D^*$.

The efficiency bound for estimating $\bm{\beta}_0$ is then given by the variance of the efficient influence function.

Finding the form of $D^*$ is therefore important, because once we know $D^*$ we know the efficiency bound.

# Efficient influence function of $B(P)$

To make a long story short, we proved that the EIF of the MSM parameter $B$ has the following form.

Importantly, the form of the EIF depends on the choice of loss function and working model through several derivatives.

That is, the choice we make for the working model and loss function changes the efficiency bound.

We can use this general result to derive the EIF for specific settings.

# Efficient influence function of $B(P)$ for the example

Let's look at the form of the EIF for our motivating example.

Recall we are trying to approximate a conditional average treatment effect with a linear working model.

The EIF is the sum of two components. The best possible variance for our estimator is the variance (think the square) of these two components.

The first component has to do with the difficulty in estimating the conditional average treatment effect. The larger the square of this term, the higher the best possible variance of our estimator.
When is this term large? If the probability of receiving the intervention is very small, then the first part will be large. This makes sense: if nobody receives the intervention, it will be hard to estimate the effect of the intervention. The second term will be large if there is a lot of noise in the outcome. This also makes sense: the more noise, the harder it is to tell what effect the intervention had.

The second term has to do with the quality of the MSM approximation. If the true parameter value is far away from the MSM approximation, this term will be large, and the best possible variance of our estimator will also be large.

# Targeted Minimum Loss-Based Estimation

Now we know the best possible variance of a non-parametric estimator. Can we build an estimator that achieves this bound?

It turns out we can, using _Targeted Minimum Loss-Based Estimation_.

To explain how TMLE works, let's start by assuming we have an initial estimate of parts of the data-generating distribution $P_0$ that are relevant to $B$.

Once we have an estimate of $P_0$, we can plug it into our parameter mapping to yield an estimate of the true MSM parameter $\bm{\beta}_0$.

The problem is that this estimator will be biased. This is because even if our initial estimator does a good job estimating the relevant pieces of $P_0$, it will not necessarily balance the bias/variance tradeoff for our parameter $B$ (we say that the plug-in estimator is not _targeted_ to $B$). 

# Plug-in estimation

In diagram form, we have an initial estimate $P_n^\circ$ which we use to find an initial estimate of the true parameter value $B(P_0)$.

# Targeted Minimum Loss-Based Estimation

How do we deal with the bias?

The idea with TMLE is to carefully _fluctuate_ our initial estimate of $P_0$ in the direction of the truth.

We set up a _parametric submodel_ that fluctuates $P_n^\circ$. The parameter $\bm{\epsilon}$ of the submodel controls how far we fluctuate away from the initial estimate. 

We choose the value of $\bm{\epsilon}$ by minimizing a carefully chosen loss function $\mathcal{L}$.

Once we fluctuate $P_n^\circ$, we can plug-in the fluctuated distribution to form an updated estimate of the the true MSM parameter $\bm{\beta}$.

The work in setting up a TMLE estimator is in carefully choosing the form of the submodel and loss function such that certain conditions are satisfied. One of our contributions in the full manuscript is a blueprint for how to do this.

# TMLE: update initial estimate in direction of truth
Coming back to the diagram, the idea is that we start with the initial estimate $P_n^\circ$. The parametric submodel allows us to fluctuate that initial estimate to varying degrees, represented by the dotted line. We choose how far to fluctuate by minimizing a loss function.

Once we determine how far to fluctuate, we can then form a new estimate of the parameter of interest.

Note that there is a one-to-one correspondance between how far we fluctuate, given by $\bm{\epsilon}$, and an estimate of the MSM parameter.

If certain conditions are satisfied, then the resulting updated estimate will be efficient and asymptotically normal with variance given by the variance of the efficient influence function.

# Bayesian TMLE

That was a broad view of a frequentist TMLE procedure. Can we make it Bayesian?

The key insight is that for some choices of the loss function used by TMLE to estimate the parameter $\bm{\epsilon}$, we can interpret the loss function as defining a likelihood of the data conditional on the parameter $\bm{\epsilon}$.

(When this is the case, estimating $\bm{\epsilon}$ in the frequentist sense is equivalent to _maximum-likelihood estimation_.)

Anytime we have a likelihood, we can perform Bayesian inference.

# Bayesian TMLE

In fact, Bayesian inference here is straightforward: we just apply Bayes' Law. The posterior distribution of $\bm{\epsilon}$ is proportional to a prior distribution and the likelihood.

Once we have a posterior distribution for $\bm{\epsilon}$, we can derive a posterior distribution on the MSM parameter $\bm{\beta}$ through the parameter mapping $B$.

# Bayesian TMLE illustration

Coming back to the illustration again, the idea is that now instead of fluctuating the initial estimate to one particular point, we now have a probability distribution over all the possible fluctuations, which induces a corresponding probability distribution over the MSM parameter.

# Bernstein von-Mises idea

Theoretically, what we would like to see is that this new posterior distribution for the MSM parameter should converge to a normal distribution centered on the frequentist point estimate and with variance given by variance of the efficient influence function (the lowest possible asymptotic variance for an estimator of $\bm{\beta}_0$.
Results of this type are called _Berstein von-Mises_ proofs.

Our main theoretical contribution is what we call an _oracular_ Bernstein von-Mises proof. What we show is that, assuming we can form the fluctuation model with knowledge of the true data generating distribution $P_0$, then the posterior of $\bm{\beta}$ will converge to the optimal normal distribution.

# Bernstein von-Mises plot

Just to illustrate what I mean by oracular: we assume we can build a fluctuation model that fluctuates around the truth.

# Bernstein von-Mises condition
We do this because it tells us how we need to set up our fluctuation model.

Specifically, we found two important conditions: first, that the derivative (gradient) of the log-likelihood evaluated at $\bm{\epsilon} = \bm{0}$ needs to equal to efficient influence function. A similar condition is necessary for the frequentist TMLE.

Also, the second derivative (Hessian) of the log-likelihood evaluated at $\bm{\epsilon} = \bm{0}$ needs to equal the variance of the efficient influence function. This condition is not necessary for the frequentist TMLE, but is necessary for the posterior distribution to have the correct asymptotic variance.

It's an interesting result because it means that setting up the fluctuation model is harder in the Bayesian context, because we have an additional condition that needs to be met.

# Bernstein von-Mises theorem

Under certain conditions such as these, we were able to prove a typical Bernstein von-Mises type result that the posterior distribution converges to a normal distribution with optimal variance in $\ell_1$ norm.

# Universal algorithm

To put our results into practice, we need to be able to compute the estimator.

In practice, someone using our approach might want to try out different options for the working model and loss function. In our example I chose a linear working model, for example, but people might want to try something different as well.

The fluctuation model and efficient influence function depend on several derivatives of the working model and loss function. We could hand-code these derivatives for as many working models and loss functions we can think of, but we're sure to miss something.

We took an alternative approach, which is to use _automatic differentiation_ to compute the required derivatives automatically.

Our main computational contribution is an implementation of our estimators in Julia with an algorithm that automatically adapts to any well-chosen working model and loss function.

# Results 1

Now we're finally ready to look at some results.

Recall that in our motivating example we're trying to estimate the best linear approximation of the effect of an intervention on contraceptive use in terms of number of children.

Here I'm showing the posterior distribution (in red) for the intercept and slope of that linear approximation.

In blue I'm showing a normal distribution centered on the frequentist TMLE with variance given by the estimated variance of the efficient influence function.

The takeaway is that the two distributions are very similar, which is not surprising given our Bernstein von-Mises result.

# Results 2

Now let's look at the main results plot. Here I'm showing the treatment effect on the $y$-axis as a function of the number of children on the $x$-axis. The line is the posterior median of the best linear approximation, with credible intervals shown in blue.

We find that indeed, in terms of the approximation, the treatment effect grows larger as the number of children increases.

# Contributions

To sum up: we introduced a general notation for MSMs, and derived the efficiency bound by finding the efficient influence function.

We then proposed a novel estimation approach by adapting Targeted Minimum Loss-Based Estimation to use Bayesian inference.

Our computational approach is quite general and allows for almost arbitrary choice of MSM.

Finally, we used our results to find that the effect of a broad-based family planning intervention on contraceptive use may be larger for participants with more children.

# Future work

In future work, we are interested in strengthening the theoretical results and developing methods for choosing between multiple choices of working model.

# Summary

