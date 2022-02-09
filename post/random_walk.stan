data {
  int<lower=0> T; // Number of timepoints
  int<lower=0> C; // Number of candidates
  int<lower=0> N; // Number of poll observations
  
  int sample_size[N]; // Sample size of each poll
  int obs[N]; // Number of respondents in poll for candidate (approximate)
  int<lower=1, upper=T> get_t_i[N]; // timepoint for ith observation
  int<lower=1, upper=C> get_c_i[N]; // candidate for ith observation
}
parameters {
  matrix[C, T] Y_logit; // Percent for candidate c at time t
  real<lower=0, upper=1> pct[N]; // Percent of participants in poll for candidate
  real<lower=0> tau; // Random walk variance
  real<lower=0,upper=0.5> sigma; // Overdispersion of observations
}
model {
  // Priors
  tau ~ normal(0, 0.2);
  sigma ~ normal(0, 1);
  
  // Random walk
  for(c in 1:C) {
    Y_logit[c, 2:T] ~ normal(Y_logit[c, 1:(T - 1)], tau);
  }
  
  // Observed data
  obs ~ binomial(sample_size, pct);
  for(i in 1:N) {
    // Overdispersion
    Y_logit[get_c_i[i], get_t_i[i]] ~ normal(logit(pct[i]), sigma);
  }
}
generated quantities {
  matrix[C, T] Y = inv_logit(Y_logit);
}
