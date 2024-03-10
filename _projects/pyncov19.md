---
layout: page
title: pyncov-19
description: mechanistic model to learn and predict the spread of COVID
img: assets/img/pyncov19-logo.jpg
importance: 3
category: tools
---

Pyncov-19 is a probabilistic simulator for SARS-CoV-2 whose only dependency is Numpy. We developed this simulator to learn and predict the temporal dynamics of COVID-19 that are shown in [covid19-modeling.github.io](https://covid19-modeling.github.io). It implements a probabilistic compartmental model at the individual level using a Markov Chain model with temporal transitions that were adjusted using the most recent scientific evidence. For more information please read our paper:

> Matabuena, M., Rodriguez-Mier, P., Garcia-Meixide, C., & Leboran, V. (2021). COVID-19: Estimation of the transmission dynamics in Spain using a stochastic simulator and black-box optimization techniques. Computer Methods and Programs in Biomedicine, 211, 106399.

This model primarily aims to estimate infection levels, or seroprevalence, within a population using solely data on registered COVID-19 fatalities. While the model has the potential for future projections regarding infection and fatality trends, its primary strength lies in backcasting. Due to the inherent uncertainty surrounding influential factors such as mask mandates, lockdowns, and social distancing, making accurate predictions proves challenging. Therefore, the model's focus is to provide insights into the historical trajectory of the pandemic.


## Overview of the model

Pyncov-19 implements a compartmental model based on a Markov Chain with temporal transitions, consisting of six states:
- I1: Infected, incubating the virus
- I2: Infected, mild symptoms or asymptomatic
- I3: Infected, severe symptoms
- R1: Recovered, but still infectious
- R2: Recovered, cannot infect
- M0: Dead


People infected will move between the different states using the Markov Chain and scheduled on a daily basis. The simulator samples the transition and the time at which each person is going to transit each day. For example, a recently infected person in state I1 (incubating the virus) will move with some probability to I2 (mild symptoms or asymptomatic) or I3 (severe symptoms). If the person is determined to move to I2, it will transit to this state after a concrete number of days, which is sampled from a distribution. On average, people incubating the virus (I1) will present symptoms on the fifth day after contracting the virus. Still, in some situations, the incubation period is slower, and symptoms present after 9-10 days. 


Each day, the simulator injects new infected people in the system, sampling from a $$Poisson(\lambda_t)$$. The number of new infections entering the system is on average $$\lambda_t$$, and it depends on two factors: the number of people who can infect $$k_t$$ at time $$t$$, and the dynamic individual reproductive number $$Ri_t$$. 

In our model, $$\lambda_t$$ is defined as $$\lambda_t = k_t * Ri_t$$. This dynamic individual reproductive number cannot be directly compared with the reproduction number $$R_t$$ used in traditional ODE-based models (SIR and variants). Its interpretation and analysis is more complicated.

People infected will move between the different states using the Markov Chain, scheduled on a daily basis. The simulator samples the transition and the time at which each person is going to transit each day. For example, a recently infected person in state I1 (incubating the virus), will move with some probability to I2 (mild symptoms or asymptomatic) or I3 (severe symptoms). If the person is determined to move to I2, it will transit to this state after a concrete number of days, which is sampled from a distribution. On average, people incubating the virus (I1) will present symptoms on the fifth day after contracting the virus. Still, in some situations, the incubation period is slower, and symptoms present after 9-10 days.

Distributions are adequately configured in Pyncov-19 using the current evidence in the scientific literature. However, that can be changed to model other situations or explore different scenarios.

## Inference using data from Spain

We used our model to explain the trajectory of the disease in Spain, using the official records of fatalities. This allowed us to infer the infection curves for different segments of the population, and to precisely determine in which period the infectiveness was higher.

<div class="row justify-content-center">
    <div class="col-md-12 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="https://ars.els-cdn.com/content/image/1-s2.0-S0169260721004739-gr4_lrg.jpg" class="img-fluid" %}
    </div>
</div>
