# Title slide

I'm Herb Susmann, I'm currently a postdoc at NYU Grossman School of Medicine working with [Iván Díaz](https://idiaz.xyz/).


# ArXiv

I'm presenting joint work with [Nick Williams](https://www.nicholastwilliams.com/), [Kara Rudolph](https://kararudolph.github.io/) and [Iván Díaz](https://idiaz.xyz/).

_Acknowledgements:_ Iván Díaz and Kara Rudolph were supported through a Patient-Centered Outcomes Research In-
stitute (PCORI) Project Program FundingAward (ME-2021C2-23636-IC). The computational re-
quirements for this work were supported in part by the NYU Langone High Performance Comput-
ing (HPC) Core’s resources and personnel.

# Takeaways
There are two main things I'd like to communicate in this talk.

First, I want to introduce a way of generalizing the average treatment effect on the treated to longitudinal data structures, continuous and multi-value treatments, and complex interventions defined as _modified treatment policies_.

Second, a common problem that comes up when estimating longitudinal treatment effects is that it's difficult to stably estimate  longitudinal inverse probability of treatment weights, especially when there are many time points. We address this problem using a strategy based on learning Riesz representers through empirical loss minimization.

# Example
 We can motivate our work through a simple example.

Suppose we have measurements of exposure to particulate matter (PM2.5) in humans over time. 

The outcome of interest is some health outcome, for example some measure of respiratory function.

We know that the EPA standard for PM2.5 is 9 micrograms per cubic meter.

Here, it's realistic to think of an intervention that would happen on areas that are above the EPA standard. Say scrubbers are installed on power plants in areas that are above the limit, which is expected to reduce PM2.5 by 10\%.

We want to define our causal question as the health effect on the subset of the population exposed to the intervention.

A causal question of interest could be: what would the average respiratory function have been _among the subset of the population exposed to PM2.5 over the EPA limit_, if their exposure had been decreased by 10\%?

The crucial aspect of this question is that it looks at a _subpopulation defined in terms of their exposure._

# ATT
Simplifying to a single time-point scenario, when we are interested in the impact of a binary intervention on the treated subset of the population, we have the traditional Average Treatment Effect on the Treated (ATT) parameter.

We can formalize the problem via a Structural Causal Model (SCM). We have three variables: a set of baseline covariates $L$, a binary treatment indicator $A$, and an outcome $Y$. We assume that there are deterministic functions $f_L$, $f_A$, and $f_Y$ that determine the value of the variables. The $U$ variables are exogenous (unmeasured). 

The causal structure of the variables can also be represented by this directed acyclic graph (DAG).

The causal estimand is the mean difference in counterfactual outcomes among the subset of the population who were exposed to the treatment. 

# Generalizing the ATT

We seek to generalize the ATT to longitudinal data structures, continuous or multi-valued treatments, complex exposures, and conditioning on arbitrary treatment subsets.

# Longitudinal notation
To get into our proposal, we first need to define some notation for longitudinal data structures.

# Longitudinal SCM
We first generalize the SCM to longitudinal data structures. Here, $\tau$ is the number of time points. We now have time-varying covariates $L_t$ and treatments $A_t$ leading up to a final outcome variable $Y$.

# Longitudinal DAG
Here we show an example standard longitudinal DAG with two time points.

# Natural value of treatment
Next, we need to introduce a crucial concept: the natural value of treatment.

Suppose we intervene on the first treatment variable $A_1$, and set it equal to some value $a_1$. The new value $a_1$ might depend on $L_1$, so I'm leaving an arrow in between $L_1$ and $a_1$.

This intervention on $A_1$ induces new counterfactuals for all downstream variables. Based on $a_1$, the time-varying covariate $L_2$ will have a new counterfactual value, as will the next treatment, $A_2$.

We call the counterfactual value of $A_2$ in this scenario the _natural value of treatment_ of $A_2$. This is the value that $A_2$ would have taken under the previous intervention on $A_1$.

We can continue this process for longer longitudinal structures: if we intervene on $A_1$ and $A_2$, this would imply a natural value of treatment for $A_3$, and so on.

# Modified Treatment Policies
Now we're ready to define the class of interventions that we will use to generalize the ATT.

We define our intervention in terms of a fixed function $d$ of the natural value of treatment at time $t$ and counterfactual history up to time $t. This is called a _modified treatment policy_.

# Shift Treatment
Here's a simple example of a modified treatment policy.

We define the function $d$ such that at each time point $t$, we take the natural value of treatment and shift it up by a fixed amount.

Importantly, we only shift the natural value of treatment up if by doing so we stay within the support of the observed data. Otherwise, we leave the natural value of treatment unchanged.

# Generalized ATT
The parameter is the expected counterfactual outcome under the MTP intervention among the subset of the population with a longitudinal natural value of treatment falling within some conditioning set.

# Generalized ATT
There's an important nuance in this definition. We condition on the longitudinal natural value of treatment, which is a _counterfactual_ variable, rather than the _observed_ treatment trajectory.

# DAG
To see why it's necessary to condition on then natural value of treatment, rather than the observed treatments, consider the first treatment $A_1$. The subsequent treatments ($A_2, \dots$) are _mediators_ of the effect of $A_1$ on $Y$. Conditioning on the subsequent treatments would be conditioning on mediators of $A_1$ on $Y$, which means the parameter is not identifiable (collider bias).

This is avoided if we condition on the _counterfactual_ longitudinal value of treatment.

# Example revisited

# Identification assumptions
To identify the GATT, we need a strong sequential randomization assumption typical to longitudinal causal inference literature. We also need a positivity assumption: in short, if there is a positive probability of seeing an exposure $a_t$, there also needs to be a positive probability of seeing the exposure after modification by the MTP function $d$.

# Identification
 Under those assumptions, we can derive an identification result in the form of nested regressions. You start with $m_{\tau+1} = Y$, and work backwards to the first time point. The crucial point here is that each regression is conditioned on the subset of the population falling into the future conditioning set.

The final result identifies the GATT as the mean of the final nested regression conditional on the subset of the population with longitudinal treatment trajectory falling into the conditioning set.

# Semi-parametric properties
We study the semi-parametric properties through the following so-called _von-Mises_ expansion of the parameter into the mean of the _efficient influence function_ and a second-order remainder term.

# EIF
In our manuscript, we derive the Efficient Influence Function (EIF) of the GATT parameter. The EIF defines the efficiency bound for estimating the GATT in a non-parametric model, and leads to efficient, asymptotically normal estimators.

The EIF takes a form that may look familiar to you if you're familiar with non-parametric longitudinal causal inference. It's the product of a type of ``residual" with a weighting term.

The crux of estimating the GATT is that we need to be able to estimate all the components of this EIF function well. We need to estimate the weighting terms and the nested regressions.

# Second-order term
The second-order term has the following form. 

# Weighting term
 The weighting term is the sequential product of density ratios. A density ratio is (loosely) a generalization of an inverse probability of treatment from a cross-sectional setting with binary exposure.

One way of estimating these weights is to estimate the constituent conditional probabilities and plug them in to the cumulated ratio formula. This tends to be highly unstable for long longitudinal structures: cumulating the inverse weights leads to high variance.

# Estimating the Riesz representer
 We introduce an alternative strategy based on interpreting the cumulative weights as the Riesz representers of a set of carefully defined parameters.

Chernozhukov et la. proposed a very general, black-box framework for estimating Riesz representers of a large class of parameters via empirical loss minimization.

We apply this strategy to directly estimate the cumulative weights by minimizing a custom loss function.

# Form of the loss function
Here's what the loss function for estimating the Riesz representer looks like.

# TMLE
We used this approach to build an estimator based on TMLE. Code is available on Github.

# Robustness
The novel form of the second-order remainder term that we derived leads to novel rate conditions on the Riesz representer estimators necessary to yield asymptotic normality at $\sqrt{n}$ rates.

# Simulation results
The main takeaway is that Riesz learning yields estimators with much lower variance than a traditional approach when there are many time points. You can see here for example that empirical coverage collapses when you use the traditional approach with many time pionts, whereas the new approach is still optimal.

