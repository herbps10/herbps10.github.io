# Title slide
My name is Herb Susmann, I'm a postdoc in the [Division of Biostatistics](https://med.nyu.edu/departments-institutes/population-health/divisions-sections-centers/biostatistics/) in the [Department of Population Health](https://med.nyu.edu/departments-institutes/population-health/) at [NYU Grossman School of Medicine](https://med.nyu.edu/). Today I'll be talking to you about a new method we've developed to handle positivity violations, which are a common problem that comes up in estimating treatment effects based on observational data.

# Collaborators
I'll be presenting joint work with [Alec McClean](https://alecmcclean.github.io/), also a postdoc, and our faculty advisor [Iván Díaz](https://idiaz.xyz/). 

# Preprint
We also have a preprint of our article available at [https://arxiv.org/abs/2509.20206](https://arxiv.org/abs/2509.20206), which has much more detail about the details of the estimator, the simulation study, and the data application.

# Summary
Here are three ways of seeing our project, in order of increasing technicality. 

At the highest level, we propose a new method for estimating treatment effects from observational data that is more robust than existing methods.

More specifically, our methods are more robust to positivity (also known as overlap) violations, which occur when some part of the population has a low probability of being treated or not treated. 

More technically speaking, we propose partial identification bounds for the Average Treatment Effect that achieve higher power under challenging non-overlap scenarios. 

# Motivating example
I'm going to introduce the main ideas with the story of a real study that was done back in the 1990s.

Say you are interested in studying the effect of a heart procedure called right heart catheterization on survival in a clinical setting. 

You put together a prospective cohort study based on data collected from several hospitals. 

You define the treatment to be whether or not the patient was given the RHC procedure within 24 hours of being admitted to the hospital, and the outcome as survival measured 30 days later. 

Along with the exposure and outcome, you also gather a lot of information about each patient -- things like their age, mean blood pressure, and comorbidities.

# Estimands
Before analyzing the study, we need to formally define the [estimand](https://www.bmj.com/content/384/bmj-2023-076316.long): the exact treatment effect we want to quantify. 

A reasonable estimand for this study is the average treatment effect over the study population, which comprise critically ill hospital patients.

We can formalize the estimand using concepts from causal inference.

# Formalized estimand
In formal terms, the observed data comprise a set of patient characteristics $X$, a binary indicator of receiving the heart catheterization treatment $A$, and a binary indicator of 30-day survival $Y$. 

Next, for each patient, we imagine that we could know two outcomes. First, what _would have happened_ if they had received RHC: that's called $Y^1$. Second, what _would have happened_ if they _had not_ received RHC: that's called $Y^0$. 

We then define the average treatment effect (ATE) as the population average of the difference in the counterfactual outcomes. The ATE can be interpreted as the mean difference in 30-day survival had every patient received right-heart catheterization versus if every patient had not received the treatment.

# Estimating the ATE
What we've done so far is a thought experiment, because in reality we can't observe both counterfactual outcomes for a patient. In reality, a patient either received RHC or they didn't, and then we see what their 30-day survival is. We can't go back in time, switch them to the other treatment, and then see what happens. 

What we do instead is we make an educated guess. For each patient, we predict what their expected survival would have been if they received RHC, and also what their survival would have been if they had not received RHC. 

Note that I'm not talking yet about how to actually make those predictions -- i.e. whether to use a linear model, or a random forest, or some other fancy method. 

# Identification assumptions
This educated guess for the ATE will align with the theoretical treatment effect based on counterfactuals only if certain conditions hold. These are called _identification assumptions_. 

First, we have to measure any variable that causes both the treatment and the outcome. For example, in the study this means that anything that might make it more likely to receive RHC and also makes it more likely to not survive must be included in the data. 

The second assumption is called overlap or positivity. This assumption requires that every possible type of patient has a positive probability of receiving the treatment or not receiving the treatment. 

# Overlap violations
Let's illustrate with a simulated example. Say I look at the data from the study, and plot all the patients by how their age (x-axis) and their mean blood pressure. The color of each point is whether they were treated with RHC or not. 

In this example, it looks like younger patients are more likely to get the treatment, while older patients do not. On the right here, there's an area where it looks like older patients were very unlikely to get the treatment. 

The reason why this is called an overlap violation is because the treatment and control groups literally don't overlap each other. 

Why is this a problem? When we estimate the ATE, we need to make a good educated guess about the expected survival of older people who receive the treatment. But if we have not data from older people who received the treatment, then we have no basis to make a high quality prediction.

# Practical implications
What happens when overlap fails? Traditional estimators may be biased and/or exhibit high uncertainty. Practically speaking, this means you may see confidence intervals that are so wide as to be meaningless.

This is exactly what happens in our example application: if I run a typical analysis, the confidence interval covers the whole parameter space, and we cannot learn anything about the average treatment effect in the study population. This is a sign of extreme overlap violations.

# What to do
Current recommendations are to, one way or another, change the estimand to one that can be identified without the overlap assumption or via a weaker overlap assumption.

One popular set of estimands target forms of an overlap treatment effect, which is the treatment effect within the subpopulation that satisfies overlap.

# Overlap Treatment Effects
Coming back to the example plot, the overlap treatment effect targets the treatment effect for the population within the circle.

# Changing the estimand
The major issue with changing estimands is that you are no longer estimating the quantity you originally set out to estimate. This new estimand may no longer answer the scientific question of interest. This [recent paper](https://www.sciencedirect.com/science/article/pii/S0895435625002756) by John Rizk in the Journal of Clinical Epidemiology makes this point very nicely.

In our example, the difference is between estimating the expected mean difference in survival among all critically ill adult patients, versus the expected mean difference in survival among all critically ill adult patients who satisfy overlap. 

# Our proposal
Our proposal is not to change the estimand, but rather estimate bounds on the estimand we care about. 

The traditional approach is to form a point estimate of the ATE, and then form a confidence interval around that point estimate.

Our approach is to estimate a lower and upper bounds, and combine their confidence intervals to form a confidence interval for the ATE.

# Bound construction
Let's take a quick look at the math behind the bounds.

The idea is that we divide the population into overlap and non-overlap subpopulations.

Whether or not you fall in the overlap population is defined by setting a threshold $c$. If your probability of receiving the treatment (known as your propensity score) is above that threshold, then you are placed in the overlap subpopulation. Otherwise, you are in the non-overlap subpopulation.

Next, we need to assume that the outcome is bounded. In our running example, the outcome is 30-day survival, which is bounded because it is either 0 or 1.

Then the ATE is bounded by the treatment effect in the overlap subpopulation  (which his easy to estimate, because overlap is satisfied by construction) plus or minus the proportion of the population that falls in the non-overlap subpopulation. 

In practice, we can try multiple different thresholds for defining the overlap and non-overlap subpopulations. If the threshold is too high, then the bounds will be very large. On the other hand, if the threshold is too low, then it will be difficult to estimate the ATE in the overlap population, also making the bounds large. Our goal is find a sweet spot where bounds are as small as possible.

# Example
Let's take a look at an example. If the overlap population (represented by the interior of the circle) is too small, then the bounds will be large. 

# Example
As we increase the size of the overlap population, the bounds start to get smaller.

# Example

# Example

# Example

# Example

# Example
If we include too many people in the overlap population, then the overlap treatment effect becomes hard to estimate, and the bounds increase in size again. It looks like the sweet spot was just before hhis one.

# Results
We systematized this form of analysis, in which we apply a range of propensity score thresholds, and applied it to the running example.

On this plot, the x-axis shows the range of thresholds we used to define the size of the overlap population. The red lines show the estimated bounds on the average treatment effect associated with each value of the threshold.

We can see that for larger thresholds, the size of the non-overlap population becomes large enough that the bounds cover zero and are not informative. However, by choosing the optimal lower and upper bounds, we can form bounds that are informative and exclude zero. These optimal bounds are shown as the dotted gray lines.

# Under the hood
While our underlying idea is simple, estimating the bounds in practice required advanced methods. 

# Preprint
For all the mathematical details, we refer to [our preprint](https://arxiv.org/abs/2509.20206).

# Simulations
We ran a simulation study testing the non-overlap bounds against a traditional method for forming 95% confidence intervals around a point estimate. We found that the width of our proposed bounds were shorter on average than the traditional method, and our bounds achieved significantly higher power, meaning the non-overlap bounds were more likely to identify non-zero effects, especially in small samples.


# Tradeoffs
Our method is not a panacea. As opposed to more general methods, our proposed bounds require that the outcome is bounded. We also have to settle for bounding the treatment effect, rather than being able to make a point estimate. Finally, our bounds only work well in some scenarios, specifically when the size of the non-overlap subpopulation is small relative to the size of the effect. 

# General note
On a more general note, our approach is intended to help researchers address their scientific questions of interest.

If that question of interest requires estimating an average treatment effect, then we think it's best to try to estimate the average treatment effect, and not pivot to an alternative estimand if overlap violations pose challenges for estimation. 

# Patient preference
We have several next steps. First, we are working on applying our methods to alternative study designs, such as patient preference trials.

# Generalization
Another setting that requires some additional methods development is generalizing trial results from the trial population to a larger population. 

# Dose-response
Finally, the causal effects of continuous treatments requires strong overlap assumptions that are often violated in practice. We plan to extend our non-overlap bounds to these dose-response curve estimation scenarios.

# R pakcage
We have an `R` package you can use to estimate non-overlap bounds. It's called `effectbounds` and is available on at [https://github.com/herbps10/effectbounds](https://github.com/herbps10/effectbounds). 
