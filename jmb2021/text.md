# Slide 1: Title

# Slide 2: Introduction

Causal analysis is interested in the estimating the causal effect of an
intervention on an outcome.

In many cases, we might want to go farther and ask how individual
characteristics change the treatment effect. 

We call these variables _treatment effect modifiers_.

# Slide 3: Cheatsheet

For those following along with the slides, I've included a cheatsheet with some
of the notation that I'll be using in the talk.

# Slide 4: Data Structure

Let's start by formalizing the problem. Suppose we observe a set of covariates,
$W$, a binary indicator of treatment, $A$, and an outcome, $Y$. 

# Slide 5: Average Treatment Effect

The _Average Treatment Effect_ (ATE) compares the expected outcome when $A = 1$ to
the expected outcome when $A = 0$, averaged over the covariate distribution.

# Slide 6: Treatment Effect Modification
The ATE summarizes the treatment effect as an average over the population. 

But what if we are interested in whether the effect is different depending on
the covariates?

The naive approach here would be to estimate the treatment effect separately
for every possible combination of covariates.

This approach will be difficult when there are many combinations, especially if
some of them have few observations.

In addition, at the end we will have a big pile of numbers that might be hard
to interpret: it would be nice to have a way to summarize how the treatment
effects and covariates relate to one another.

# Slide 7: Marginal Structural Models

The approach we take is to summarize the relationship between covariates and
treatment effects via a _working model_. 

Let $V$ be a subset of the covariates that we are interested in investigating
as potential _treatment effect modifiers_.

We also define a set $X$, which adds an intercept term to the set $V$.

Next is the key step: we define a new parameter $\beta$ as the solution to the
following optimization problem. The core idea here is to approximate the true
treatment effects with a lower-dimensional working model.

Let's take this one piece at a time.

# Slide 8: Marginal Structural Models

The $\tilde{Q}_P(W)$ term is the true treatment effect for covariates $W$. This
is what we're trying to approximate.

# Slide 9: Marginal Structural Models
The second term is the working model, which approximates the true treatment
effect. Here, we are using a linear working model where we approximate the
treatment effect as a linear combination of the treatment effect modifiers and
the parameters $\beta$.

# Slide 10: Marginal Structural Models
We measure the quality of the approximation for a given set of parameters
$\beta$ using a loss function. Here we've chosen to use the squared-error risk.

# Slide 11: Marginal Structural Models
Note that the solution is in terms of a distribution $P$. Given a distribution
$P$, we get back a set of parameters that minimize the optimization problem
over
$P$.

# Slide 12: Semi-parametric inference

Our goal is to estimate the parameters $\beta$ that correspond to the true
data-generating distribution, $P_0$. For convenience, we'll call them
$\beta_0$. 

Our goal is to construct an efficient estimator of $\beta_0$: an estimator that
achieves the best possible asymptotic variance. 

We'll start with a frequentist estimator, then develop a Bayesian version.

# Slide 13: Semi-parametric inference

First, what can we say about the semi-parametric efficiency bound for
estimating $\beta_0$?

The parameter $\beta_0$ is asymptotically normal, which means we can write it
as an empirical mean of an _influence function_ plus a remainder term that
converges to zero in probability.

In general there might be multiple influence functions for a parameter. The one
with the smallest variance is called the _efficient influence function_ (EIF).

The efficiency bound for estimating $\beta_0$ is the variance of its EIF.

# Slide 14: Targeted Maximum Likelihood Estimation

Targeted Maximum Likelihood Estimation (TMLE) is a framework for constructing
efficient estimators in semi-parametric models. This is a very brief overview:
the canonical reference for TMLE is the book _[Targeted
Learning](https://link.springer.com/book/10.1007/978-1-4419-9782-1)_ (van der
Laan & Rose, 2011), which
goes into much more detail.

The TMLE of our parameter is a plug-in estimator: we construct a distribution
$P_n^*$ which we plug in to yield an estimate of $\beta$. 

The distribution $P_n^*(\bm{\epsilon})$ is a parametric fluctuation of an initial
estimator of the parts of $P_0$ that are relevant to $\beta$. The parameters
$\bm{\epsilon}$ are estimated using maximum likelihood estimation.

The resulting estimator solves the efficient influence function of the target
parameter. This is what is referred to by "targeting": we build the estimator
specifically to solve the EIF of the parameter of interest.

# Slide 15: Bayesian Targeted Maximum Likelihood Estimation

The question motivating our work is whether a Bayesian version of the
frequentist TMLE is possible.

The core idea is that the fluctuation on which TMLE is based,
$P_n^*(\bm{\epsilon})$, defines a likelihood for the parameters $\bm{\epsilon}$.

As soon as we have a likelihood, we can conduct Bayesian inference: the
posterior distribution of $\bm{\epsilon}$ is proportional to a prior
distribution and the likelihood.

# Slide 16: Bayesian Targeted Maximum Likelihood Estimation

In practice, it's not very practical to put a prior on $\bm{\epsilon}$. But
every $\bm{\epsilon}$ maps to a parameter value $\bm{\beta}$. We can place
map a prior on $\bm{\beta}$ back to a prior on $\bm{\epsilon}$ as long as we
add a Jacobian adjustment.

# Slide 17: Bayesian Targeted Maximum Likelihood Estimation

We can draw a large number of samples from the posterior distribution of
$\bm{\epsilon}$ using sampling techniques like Markov-Chain Monte Carlo.

We can then map each of these draws to a parameter $\bm{\beta}$ to get
a posterior distribution for $\bm{\beta}$. 

# Slide 18: Bayesian Targeted Maximum Likelihood Estimation

Our main theoretical result is a Bernstein von-Mises type proof that the
posterior distribution of $\bm{\beta}$ converges to the targeted maximum
likelihood estimator.

This result connects the Bayesian and frequentist estimators, in that the
Bayesian estimator is asymptotically equivalent to the frequentist approach.

# Slide 19: Simulation Study
We now show a simulation study to demonstrate the proof of concept.

Suppose we have three covariates, $W_1$, $W_2$, $W_4$, plus a fourth one which
we call $V$, as it is a treatment effect modifier. 

$A$ indicates treatment status, which is affected by the covariates.

The outcome $Y$ depends on the covariates, treatment status, and the effect
modifier $V$.

# Slide 20: Simulation Study

# Slide 21: Simulation Study
As expected, we see very low bias in both settings, as the nuisance parameters
are being estimated consistently. Here the point estimate for the Bayesian
estimator is taken to be the posterior median.

# Slide 22: Simulation Study
We are more interested in whether the estimators accurately characterize their
uncertainty.

For the frequentist estimator, 95\% confidence intervals based on the influence
function and the central limit theorem display good coverage.

For the Bayesian estimator, 95\% credible intervals also display near optimal
coverage.

# Slide 23: Conclusions

The Bayesian estimator inherits nice properties of the frequentist TMLE:
namely, it is also asymptotically efficient.

In addition, for those inclined to Bayesian inference, it inherits all the
benefits thereof, such as allowing for the incorporation of prior information.

Beyond the preliminary results we've shown today, we are also investigating
whether the Bayesian estimator inherits other nice properties of the
frequentist TMLE, such as double robustness, and in looking further at the
finite-sample performance of both estimators.
