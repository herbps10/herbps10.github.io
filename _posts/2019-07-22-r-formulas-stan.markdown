---
layout: post
title: Using R formulas to pass data to Stan
description: Write flexible Stan models by using R formulas
---

Many statistical routines in R use [R formulas](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/formula.html) as a flexible way to specify the terms of a model.  With a little setup, we can use formulas to build inputs to [Stan](http://mc-stan.org) and avoid hard-coding any variables in the model.

For example, say you are writing a Stan model for linear regression. You would like to regress a response variable $y$ on two predictors, $x_1$ and $y_1$:

{% highlight stan %}
// linear_regression.stan
data {
  int N; // Number of observations
  vector[N] y;
  vector[N] x1;
  vector[N] x2;
} 
parameters {
  real beta_0;
  real beta_1;
  real beta_2;
  real<lower=0> sigma;
} 
model {
  y ~ normal(beta_0 + beta_1 * x1 + beta_2 * x2, sigma);
}

{% endhighlight %}

But what if you later decide to add more predictors? We can make the above model more flexible by [allowing a matrix of predictors](https://mc-stan.org/docs/2_19/stan-users-guide/linear-regression.html#vectorization.section) $X$ of arbitrary size:

{% highlight stan %}
// linear_regression.stan
data {
  int N; // Number of observations
  int K; // Number of predictors
  vector[N] y;
  matrix[N, K] X;
} 
parameters {
  vector[K] beta;
  real<lower=0> sigma;
} 
model {
  y ~ normal(beta * X, sigma);
}
{% endhighlight %}

Then we can use R formulas to build the predictor matrix $X$ and pass it to Stan:

{% highlight r %}
fit_linear_regression <- function(formula, data, ...) {
  model <- stan_model("./linear_regression.stan")

  X <- model.matrix(formula, data)
  y <- model.extract(model.frame(formula, data), "response")
  
  data <- list(
    N = nrow(X),
    K = ncol(X),
    X = X,
    y = y
  )

  sampling(model, data, ...)
}
{% endhighlight %}

Now it's easy to fit the model with different predictors:

{% highlight r %}

N <- 100
simulated_data <- tibble::tibble(
  x1 = rnorm(N, 0, 1),
  x2 = rnorm(N, 0, 1),
  y = x1 + 2*x2 + rnorm(N, 0, 0.1)
)


fit_linear_model(y ~ x1, simulated_data)
fit_linear_model(y ~ x1 + x2, simulated_data)

{% endhighlight %}

Writing a separate function for preparing the data for Stan based on a formula makes the model more usable and flexible.
