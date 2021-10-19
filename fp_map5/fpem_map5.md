# Slide 1: Title
_Presentation given as part of the [Statistical Demography short course](https://map5.mi.parisdescartes.fr/seminairesMAP5/exposes/adrian-raftery-university-of-washington-3/) led by Adrian Raftery at MAP5, Université de Paris._

# Slide 2: Outline

# Slide 3: About Me
Website: [http://herbsusmann.com](http://herbsusmann.com), Twitter: [https://twitter.com/herbps10](@herbps10).

# Slide 4: Alkema Lab

Lab website: [https://leontinealkema.github.io/alkema_lab](https://leontinealkema.github.io/alkema_lab)

# Slide 5: Family Planning Indicators

One of the major groups of interest is women of childbearing age who are currently married or in-union. Within this study group, there are several family planning indicators that are typically targeted, including modern contraceptive prevalence, traditional contraceptive prevalence, unmet need, and demand satisfied with modern methods.

# Slide 6: Data Sources

The major source of data for these indicators are international surveys, which are typically conducted every several years. In addition, there may be data available from surveys conducted in a single country.

One of the main challenges is integrating data from all these different sources, and accounting for differences in quality. Some data may exhibit systematic biases: for example, we might have data from a survey that was conducted on a different age group than the population we are interested in.

# Slide 7: Data Example
Here is an example of the data that we are working with. Some countries, like Bangladesh and Indonesia, have good data availability. Others, like Vanuatu, are more sparse. 

We can also notice that the data seems to follow a similar shape in many countries, where modern contraceptive use starts increasing slowly, speeds up, then slows down as an asymptote is reached. 

# Slide 8: Family Planning Estimation Model

The Family Planning Estimation Model (FPEM) was built to model these data in order to generate probabilistic estimates and projections of family planning indicators.

# Slide 9: FPEM Examples
Here is an example of the output of FPEM for Bangladesh and Kenya.

# Slide 10: Modeling Framework

An important point here is that FPEM is split into two major components: the process model and the data model.

# Slide 11: Modeling Framework

The process model describes how the true, latent values of the indicator evolve over time, and the data model links the latent values to the observed data.

This presentation focuses mainly on the form of the process model.

# Slide 12: Temporal Models for Multiple Populations

We describe a general framework for models of this form in our paper on Temporal Models for Multiple Populations. A [preprint](https://arxiv.org/abs/2102.10020) is available on ArXiv.

# Slide 13: Process Model

The FPEM process model decomposes the trend in modern contraceptive use into two parts, which we call the systematic component and the smoothing component.

An interactive demo of the process model is available at [https://observablehq.com/@herbps10/fpem][https://observablehq.com/@herbps10/fpem].

# Slide 14: Systematic Component

The systematic component describes a parametric trend we expect the indicator to follow over time. The idea is to encode the feature we noticed in the data earlier -- that the trend tends to follow a logistic growth curve over time. 

# Slide 15: Systematic Component
If we plot the systematic component, we see that the $\Omega$ parameter controls level of mCPR in a the reference year, and $\tilde{P}$ controls the asymptote of the curve.

# Slide 16: Systematic Component

If we plot the function $f$, which gives the rate of change of the indicator (on the logit scale) as a function of its level, we see that the $\omega$ parameter has a nice graphical interpretation as the maximum of the function.

# Slide 17: Smoothing Component
We don't expect the indicator to exactly follow a logistic growth curve: for example, there may be slowdowns, stalls, or dips in contraceptive adoption. To capture this, we allow the rate of change in the indicator to be modified by the smoothing component, to which we assign an AR(1) prior.
# Slide 18: Smoothing Component
This plot shows a set of draws from the process model when the smoothing model is included.

# Slide 19: Hierarchical Modeling
We need to estimate each of the logistic growth parameters for every country. To inform estimates when there aren't many data points available, we use hierarchical modeling to share information between countries.

# Slide 20: Data Model

The data model describes how the observed data is generated from the truth.
This is our opportunity to model systematic bias, sampling error and
non-sampling error.

# Slide 21: One country model

# Slide 22: Fpemlocal demo
Link: [https://github.com/herbps10/fpemdemo](https://github.com/herbps10/fpemdemo)

# Slide 23: Fpemlocal paper
Link: [_Fpemlocal_: Estimating family planning indicators in R for a single population of interest](https://gatesopenresearch.org/articles/5-24).
