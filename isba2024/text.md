# Title slide

# My background

I like to think of science as a social process, in the spirit of [Kuhn](https://en.wikipedia.org/wiki/The_Structure_of_Scientific_Revolutions); similar ideas were extended for statistics by [Breiman](https://projecteuclid.org/journals/statistical-science/volume-16/issue-3/Statistical-Modeling--The-Two-Cultures-with-comments-and-a/10.1214/ss/1009213726.full), and more recently for causal inference as well [(Bonvini et al. 2021)](https://muse.jhu.edu/article/799726). I've been lucky to be able to work and learn within multiple "statistical cultures". Two of the cultures I've worked in can be loosely represented by these two books: [Bayesian Data Analysis](https://stat.columbia.edu/~gelman/book/) (BDA3) and [Targeted Learning](https://link.springer.com/book/10.1007/978-1-4419-9782-1). I see these two books as being paradigmatic in the Kuhnian sense, as they both set forth a vision of how to go about doing statistics.
    
My thesis work was with [Leontine Alkema](https://leontinealkema.github.io/alkema_lab/) at the University of Massachusetts Amherst working on Bayesian spatio-temporal modeling -- this would fall roughly in the BDA3 camp. [Antoine Chambaz](https://helios2.mi.parisdescartes.fr/~chambaz/index.php?choix=1) at Université de Paris Cité taught me about causal inference from the Targeted Learning point of view. 

The Targeted Learning book was my textbook for a class I took on causal inference my first semester of grad school (taught by [Laura Balzer](https://ctml.berkeley.edu/people/laura-balzer-phd), now at Berkeley). In the back of the book, there is an intriguing chapter called ["Targeted Bayesian Learning"](https://link.springer.com/chapter/10.1007/978-1-4419-9782-1_28), written by [Iván Díaz](https://www.idiaz.xyz/) (and others). Trying to understand the ideas in that chapter led me down the road of learning semi-parametric efficiency theory. I'm now doing a postdoc with Iván at NYU Grossman School of Medicine. 

# Takeaways
If I had to boil down my talk to just three things, it would be these. 

- First, I would want you to know of the existence of two estimation strategies relevant to many parameters in causal inference: first, a frequentist method called Targeted Maximum Likelihood Estimation (TMLE), which is a non-parametric method that has very nice properties. 
- Second, I would want you to know there is a pseudo-Bayesian analogue to TMLE, called Bayesian TMLE. 
- Finally, I want to impart the overall idea of this talk, which is that combining popular Bayesian approaches such as hierarchical modeling can make Bayesian TMLE better in complex settings.

# Average Treatment Effect

We need a bit of background in order to understand what Bayesian TMLE is and how it works. We'll develop this background using the Average Treatment Effect (ATE) as a running example.

We will make no assumptions on the form of $P_0$, the true data generating distribution - that is, we assume only that it falls in the set of all possible probability laws defined on the support of $O$. 

We then define the ATE as a the functional $\psi$ that maps a distribution $P$ to a real number (actually, the subset $[0, 1]$ since the outcome $Y$ is binary). 

It's also convenient to give names to a few parts of $P$: the marginal distribution of $X$, the propensity score, and the outcome model.

Note that the Average Treatment Effect functional has a causal interpretation under standard causal assumptions including no unmeasured confounding and positivity. In this talk I'll focus primarily on the statistical estimation of the ATE functional.

# A Crude Taxonomy 1
There are many different ways we could go about estimating $\psi(P_0)$ (the ATE under the true data-generating distribution $P_0$). I like to think about the different methods in terms of a crude taxonomy with two axes, separating methods by their inferential framework (Bayesian vs. frequentist) and what restrictions they put on the data-generating process (non-parametric vs parametric). 

# A Crude Taxonomy 2
If we have reason to believe that the true distribution $P_0$ falls in a parametric class of distributions (that is, a set of distributions indexed by a finite dimensional parameter), we are in the bottom half of this taxonomy. The inferential problem is to infer the value of the parameter, whether via Bayesian or frequentist inference. The statistics here are generally well-understood, especially for smooth parametric models.

However, in most real-world situations, we will not know in advance whether the true data generating distribution falls within a parametric model. As such, we move to the top half of the taxonomy. In a frequentist framework, there have been a number of methods proposed for estimating statistical functionals non-parametrically, many of which exhibit convenient properties such as double-robustness, which we will discuss later. 

On the Bayesian side, Bayesian non-parametric priors have been applied, such as Bayesian Additive Regression Trees (BART), Gaussian Processes, Dirichlet Processes, and the Bayesian Bootstrap, to name a few. This is a very rich and exciting literature that I unfortunately don't have enough time to fully consider in this talk. Excellent reviews can be found in [Oganisian and Roy (2021)](https://onlinelibrary.wiley.com/doi/full/10.1002/sim.8761); [Li et al.
(2023)](https://royalsocietypublishing.org/doi/full/10.1098/rsta.2022.0153); and [Linero and Antonelli (2023)](https://wires.onlinelibrary.wiley.com/doi/full/10.1002/wics.1583).

# A Crude Taxonomy 3
I'm very interested in the interaction between the Bayesian and frequentist sides of this taxonomy. For example, from the Bayesian point of view, double-robustness can be difficult to achieve; see for example this (somewhat out of date) quote from [Gustafson (2012)](https://www.degruyter.com/document/doi/10.2202/1557-4679.1349/html). 

# A Crude Taxonomy 3 
From the frequentist point of view, I think there is much that can be learned from Bayesian approaches; see for example this quote from [Gruber and van der Laan (2012)](https://www.degruyter.com/document/doi/10.2202/1557-4679.1349/html), who were commenting on the results of a causal inference competition in which BART performed very well. 

# A Crude Taxonomy 4
Bayesian TMLE can be seen as straddling the line between frequentist and Bayesian approaches. It was originally developed by statisticians who typically work in the frequentist paradigm. My goal in this talk is to suggest how some perhaps more "culturally Bayesian" techniques, like hierarchical modeling, may be able to improve its performance.

# Target parameter
Here we visualize the ATE parameter mapping $\psi : \mathcal{M} \to [0, 1]$. On the left, we (recklessly) illustrate the non-parametric model $\mathcal{M}$ as a cloud in which distributions $P \in \mathcal{M}$ live. The functional $\psi$ maps elements $P$ to a value $\psi(P) \in [0, 1]$.

# Frequentist estimation of the ATE
Let's look at how a frequentist might go about estimating the ATE.

It holds that any regular estimator of the ATE can be written as the true ATE, plus the empirical mean of a mean-zero function called an _influence function_, plus a term that converges to zero in probability. 

The influence function that has the smallest variance is called the efficient influence function (EIF). 

The non-parametric efficiency bound for estimating the ATE is defined as the variance of the EIF. That is, the smallest possible variance an estimator of the ATE can have is defined by the variance of the EIF.

Frequentists are typically concerned with finding estimators that achieve this bound. 

As a side note, the slides list a few of the classical references on semi-parametric efficiency theory. Edward Kennedy at CMU has a very nice review that goes over the fundamentals [(Kennedy 2023)](https://arxiv.org/abs/2203.06469).


# Efficient Influence Function of the ATE
Recall that the non-parametric efficiency bound for estimating the ATE is the variance of the EIF, which has the following form. When will this variance be large? If, for example, there are some strata of covariates for which receiving the treatment is very unlikely (so $g_{P_0}(A, X)$ is small), then the variance will be large. If the conditional variance of the outcome is large, then similarly the ATE will be more difficult to estimate, and the efficiency bound will be larger.


# Plug-in estimation
Let's see what happens in a frequentist sense if we take a somewhat naive approach to estimating the ATE.

Suppose we have some initial estimate of the parts of $P_0$ that are involved in the ATE functional. We need an estimate of the marginal distribution of the covariates -- in practice, we will just use the empirical distribution. For the outcome model (the conditional expectation of the outcome given treatment and covariates) we might use some binary regression method like logistic regression, or fancier machine learning algorithms.

We can then plug in these estimates to the parameter mapping $\psi$ to form a plug-in estimator. In the case of the ATE, this would just be the empirical mean of the outcome model evaluated for $A = 1$ and $A = 0$ at each of the observed covariate values.


# Plug-in estimation
Going back to our visualization, our initial plug-in estimator looks something like this. We make an initial guess $P_n^\circ$, which maps to the plug-in estimator $\psi(P_n^\circ)$ of $\psi(P_0)$. 

# Analysis of the plug-in estimator
A simple analysis of the plug-in estimator of the ATE suggests some problems. The plug-in estimator will have a first-order bias characterized by the influence curve/influence function, and a second order remainder term as well. In general we cannot expect either of these terms to be zero for an arbitrary initial estimator $P_n^\circ$, so the naive plug-in estimator will be biased.

# Targeted Learning
Typically frequentists proceed by trying to find ways to have the bias and second-order remainder terms go to zero. There are many different ways to do this; we will focus on Targeted Maximum Likelihood Estimation, more generally thought of as a Targeted Learning method.

# TMLE
The basic idea of TMLE is pretty simple. We know that if we use the initial estimates, then this first order bias term that is the empirical average of the EIF may be non-zero. So we find a new set of estimates that causes the empirical EIF to be zero. The way we do this is by carefully fluctuating the initial estimates via a fluctuation submodel indexed by a parameter $\epsilon$. We choose how far to fluctuate the initial estimates by maximum likelihood, using a carefully chosen likelihood function.

# TMLE
To continue the visualization, we still have our initial estimates $P_n^\circ$. We introduce a fluctuation submodel, illustrated by the dotted line. We then choose via maximum likelihood how far to fluctuate the initial estimates. The idea is that, after fluctuation, the estimate of the ATE using the fluctuated nuisance parameters will be closer to the truth.

# TMLE details
To be more concrete, recall that the ATE parameter depends on two nuisance parameters: the outcome regression and the marginal distribution of the covariates. 

We set up a fluctuation submodel that fluctuates each of these nuisance parameters. 

For the outcome regression, we fluctuate on the logit scale by a factor depending on the inverse propensity score.

For the covariate distribution, we adopt an exponential tilting model related to the outcome regression model.

We then choose a standard binomial log-likelihood for the outcome conditional on the fluctuated outcome model and a log-likelihood for the covariate distribution.

The main thing to notice with this submodel is that it should resemble a chopped up version of the efficient influence function.

# TMLE details
The key property that motivates this fluctuation is that the efficient influence function is included in the linear span of the derivative of the log-likelihood of the fluctuation model. 

When we estimate how far to fluctuate using maximum likelihood, it can be shown that the empirical average of the efficient influence function evaluated at the fluctuated nuisance parameters at that maximizer will be approximately zero.

I'm skipping a lot of details, but intuitively you can think of this as follows: we want to have a fluctuation that, when plugged in to the efficient influence function, causes the empirical mean of the EIF to be zero. A convenient way to do this is to set up a fluctuation and likelihood function such that the derivative of the likelihood equals (technically, spans) the EIF. Then, the derivative at the maximizer should be approximately zero, and therefore the empirical mean of the EIF will also be zero.

Note that in practice, we can actually perform this entire process using off-the-shelf logistic regression routines. 


# TMLE properties
The frequentist TMLE has several very nice theoretical properties. 

First, the TMLE estimator will be consistent if _either_ the outcome regression or propensity score models are estimated consistently. This is what is typically referred to as "double-robustness". 

Second, the TMLE estimator will be asymptotically normal and achieve the non-parametric efficiency bound under relatively weak conditions. First, the _product_ of the estimation rates for the outcome and propensity score models must be of order $n^{-1/2}$. This allows for (relatively) slow estimation of either model, for example at rates $n^{-1/4}$. This is the theoretical justification that allows for using flexible data-adaptive methods for estimating the nuisance parameters.

In addition, there are some technical conditions required for the nuisance parameters, specifically that they are not too data adaptive. These conditions can be relaxed, however, through the use of cross-fitting, which is typically the preferred approach. 


# Bayesian TMLE
Now that we have all of that frequentist background, we are finally ready to introduce Bayesian TMLE.

The basic idea of Bayesian TMLE is quite simple. In frequentist TMLE, we introduce all the machinery of the parametric fluctuation model indexed by a single parameter $\epsilon$, and estimate the value of $\epsilon$ using maximum likelihood estimation. In Bayesian TMLE, we rather infer a posterior distribution for $\epsilon$ using standard Bayesian inference. 

In practice we will prefer to place a prior on the ATE parameter $\psi$ directly, and then map that prior back to a prior on $\epsilon$. A benefit of Bayesian TMLE in this context is that the fluctuation model only has a single parameter, so placing a prior directly on $\psi$ and mapping it to a prior on $\epsilon$ is not difficult. 

Once we have a posterior distribution for $\epsilon$, we can map it to a posterior distribution of the ATE $\psi$. 

The main theoretical result is that the posterior distribution for $\psi$ will converge to a normal distribution centered on the truth and with variance given by the variance of the EIF. In this sense, the Bayesian TMLE posterior mimics what we expect from the posterior distribution of a parameter of a smooth parametric model, which by the classical Bernstein von-Mises theorem converges to a normal distribution centered on the truth and with efficient variance given by the Fisher information of the model. 

Bayesian TMLE was originally developed for the TMLE, and was subsequently extended to several other parameters. I originally got involved with Bayesian TMLE research in this context, extending it to marginal structural models.


# Bayesian TMLE
Coming back to our visualization, we now have a prior distribution $p(\epsilon)$ on the fluctuation parameter $\epsilon$. By typical Bayesian inference, this prior is combined with the TMLE likelihood to yield a posterior for the ATE. 

# Bayesian TMLE in Stan
As a simple "proof by existance" that Bayesian TMLE can be put into practice, I wanted to show what it looks like when coded in Stan (code is also available on Github at github.com/herbps10/bayes_tmle). The core of the code is basically Bayesian logistic regression, with the main complication being the Jacobian adjustment necessary when we place a prior on directly on the ATE, rather than the fluctuation parameter $\epsilon$. }

# Group treatment effects
Now that we have a sense of what Bayesian TMLE is, let's break some new ground by applying it to a slightly harder problem than estimating the ATE. 

Suppose we want to estimate a treatment effect within population subgroups (for example, say we want to estimate the effect of a teaching intervention in multiple classrooms, à la the well-known 8-schools problem in the Bayesian literature). So now we have a variable $D$ which indexes which group each observation belongs to, and we can define a new statistical estimand conditional on each group. 


# Partial pooling
It may be challenging to estimate these treatment effects if we have a lot of groups, or if there are some groups with few observations. For Bayesians, our first thought is probably to think about some sort of partial pooling of the treatment effects (this idea was already discussed for example in Feller and Gelman 2015). 

On one extreme we could have no pooling, and just estimate the treatment effects separately for each group. This would result in noisy estimates of the treatment effect in groups with few observations.

On the other extreme, we could pool all observations and estimate a single treatment effect for all groups -- this is equivalent to estimating a single population average treatment effect. 

In the middle, we could consider a partial pooling approach in which we share information between groups on the size of the treatment effects. This is very natural in a Bayesian framework, in which we could assume a hierarchical prior on the group treatment effects.


# Hierarchical models
With Bayesian TMLE, it's natural to incorporate hierarchical models. We can have a separate fluctuation model for each group's treatment effect, but place a hierarchical prior on the fluctuated treatment effects so that information is shared between groups. 

Asymptotically, we expect the prior to be negligible, so the group treatment effects will converge to the truth as we would expect.


# Simulation study setup
To illustrate, let's look at an illustrative simulation study. We generate data where each observation belongs to one of $20$ groups.

# Simulation study setup
We estimate the nuisance parameters (outcome model and propensity score model) using ensembles (in this literature, you often see this referred to as Super Learning). 

To investigate the double-robust properties of the Bayesian TMLE posterior, we purposely estimate the nuisance parameters using a misspecified model according to four scenarios. 

# Simulation example
Here's an example from one simulated dataset with $N = 5000$. 

As we would expect, the Bayesian estimates are shrunk towards a common mean. The 95\% credible intervals are generally shorter than the 95\% confidence intervals.

# Results: mean error
To start, let's look at how the frequentist TMLE compares to a Bayesian TMLE with a hierarchical prior in terms of the mean error of the estimated treatment effects averaged across all groups. For the Bayesian TMLE, we are using the posterior median as an illustrative point estimator of the ATE.

For both estimators, we see the mean error goes to zero as sample size increases in all scenarios except when both nuisance parameters are estimated inconsistently. This is in line with what we expect from the double-robust property of the Bayesian TMLE posterior.


# Results: mean absolute error
Where we see a benefit for the Bayesian TMLE is in terms of mean absolute error, which is consistently smaller for Bayesian TMLE than for frequentist TMLE due to partial pooling.

# Results: empirical coverage
Finally we see good results in terms of empirical coverage -- it appears that Bayesian TMLE has good coverage while being more precise than the frequentist competitor. 

# Pros and cons
Bayesian TMLE is an interesting method inspired by frequentist non-parametric methods. I think it can be viewed as adopting the best of both Bayesian and frequentist worlds, or as having the benefits of neither, depending on how you want to look at things.

The pros of Bayesian TMLE are that it has good asymptotic theoretical properties, in that the posterior should converge to a normal distribution with variance given by the variance of the EIF. The nuisance parameters can be estimated using any method, so long as we use cross fitting -- this includes machine learning methods, Bayesian non-parametric methods, etc. We have the benefit of being able to incorporate prior information, and it is straightforward to elicit this prior in terms of the actual causal parameter of interest, like the treatment effect. This is in contrast to what is typically reuqired for Bayesian non-parametrics, where for a method like BART we typically need to place priors on things like tree depths which are difficult to interpret and for which we likely do not have well-founded prior knowledge. Finally, from a pragmatic point of view we should expect Bayesian hierarchical models to improve performance via partial pooling of treatment effects, which was borne out in our preliminary simulation study.

Now, the cons: first, I should emphasize that the Bayesian TMLE posterior is not strictly Bayesian. This is because it is conditional on the initial estimates of the nuisance parameters, which as I just mentioned can come from any method or ensemble of methods. From a Bayesian point of view, this feels a bit unnatural because uncertainty in these nuisance parameters isn't being fed forward into the posterior for the parameter of interest.

Second, the question arises as to why we are trying so hard to develop a Bayesian estimator that has certain frequentist properties, when if we are so concerned with frequentist properties we could just use the frequentist estimator (this is called "frequentist pursuit" by Robins). This talk presents a possible counterargument, which is that things like partial pooling of treatment effects is very easy to set up in a Bayesian-like context via hierarchical modeling.


# Discussion
To wrap up, in this talk we reviewed a method, Bayesian TMLE, which is a bit of a chimera of frequentist and Bayesian ideas. It was originally developed by statisticians who typically work in the frequentist paradigm, a fact which I think can help us understand its development. In the original proposal, Bayesian TMLE was presented for the Average Treatment Effect, but beyond being able to incorporate prior information there wasn't too much benefit of using Bayesian TMLE over just using the frequentist estimator. My main idea for this talk was to use some of my background from the "BDA3" school of statistics to see if Bayesian modeling ideas could be used to augment Bayesian TMLE. From this point of view, what I'm proposing should seem pretty obvious to Bayesians -- just use hierarchical modeling! And it should not be a huge surprise that partial pooling can improve estimation of treatment effects.

From a broader view, I'm interested in seeing how ideas from disparate "statistical cultures" can be brought together -- hopefully inheriting the benefits of both approaches.

I would like to end by highlightiing that there are other exciting proposals that try to leverage non-parametric efficiency theory, including efficient influence functions, to form Bayesian (and pseudo-Bayesian) estimators of parameters with applications in causal inference. A few relevant references are shown on the slides.
