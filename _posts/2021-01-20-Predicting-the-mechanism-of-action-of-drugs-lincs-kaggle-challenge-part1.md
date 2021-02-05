---

title: Predicting the Mechanisms of Action of drugs (Part I)
categories:
 - Tutorials
tags:
 - bioinformatics
 - drugs
 - kaggle
---

> NOTE: This post is still work in progress

Five months ago (in Septembre 2020), [Kaggle](https://www.kaggle.com/c/lish-moa/), together with the [Laboratory for Innovation Science at Harvard (LISH)](http://lish.harvard.edu/), announced a very interesting Machine Learning challenge that caught my attention. The goal of this challenge was to **predict the mechanism(s) of action of different compounds** based on observed changes in gene expression and cell viability after treating 100 different human cancer cell lines with the durgs. 

![figure-1]({{ site.baseurl }}/assets/img/lincs/figure-perturbation.png)
*__Figure 1__. A new drug is used to treat different cells, producing a different response in each cell. Gene expression and cell viability are measured before and after treatment to observe how the activity of the cells change upon perturbation.*

Since this topic was closer to my research area, I thought that this would be a good opportunity to devote some free time to participate in a Kaggle challenge, something that I always wanted but I've never did. Unfortunately, to my surprise they anonymized the name of genes, cells and drugs, preventing any attempt of using any form of prior biological knowledge. I decided to participate anyway and I don't regret it, as I learned some interesting things along the way. However, I was left with the feeling that much more could have been done, since all the models sent to the challenge are just black boxes from which you can't get much out of them.

Now that the competition is over and some additional metadata was released (which is great!), I decided to write a few posts about this challenge. **In this post, I will introduce this interesting problem and I will show how to do some exploratory analysis with Python and Pandas on the annotated dataset**. For this purpose, I prepared a notebook and a [GitHub repository](https://github.com/pablormier/kaggle-lish-moa-annotated) with the script to produce a single annotated [csv file](https://github.com/pablormier/kaggle-lish-moa-annotated) ready to be analyzed.

In a second post, I will focus more on the whole Kaggle competition itself and I will focus on how to develop a Deep Neural Network with Tensorflow and Keras classification problem.



## Mechanisms of Action (MoA)

The aim of this challenge was to predict the mechanism of action of different compounds (how they work, biologically speaking) based on their biological activity on different cells. But what's a Mechanism of Action? Let's take for example Ibuprofen, a very well known, worldwide  used anti-inflammatory drug. 

![figure-2]({{ site.baseurl }}/assets/img/lincs/ibuprofen.png)
*__Figure 2__. Example of the Mechanism of Action of the Ibuprofen. Image taken from [PharmaGKB (License CC BY-SA 4.0)](https://www.pharmgkb.org/pathway/PA166121942)*

The figure above shows the mechanism of action of this drug. Ibuprofen, as many other non-steroid anti-inflammatory drugs (known as NSAIDs), produce an anti-inflammatory response by inhibiting the _cyclooxigenase enzyme_ (_PTGS1_ and _PTGS2_ genes in the figure). This enzyme is responsible of the formation of _prostaglandins_ from arachidonic acid (an omega-6 fatty acid). Prostaglandins are lipid compounds that produce different effects in the body, including inflammatory responses. By inhibiting the cyclooxigenase enzymes, the production of different prostaglandins is reduced, thereby reducing the normal inflammatory response. This is an example of a MoA.

Now, let's imagine that we have a not so well studied compound X which produces also an anti-inflammatory effect, but for which we don't have any information about how it works. One possible way to discover the mechanism of action of this drug could be to carry expensive and time consuming experiments in-vitro/in-vivo, testing for different hypothesis, until we find a plausible explanation. Although this is the way to really test the validity of a biological hypothesis, given the cost of this method and the potential number of plausible hypothesis to test, we would like to start with a limited number of hypotheses that are certainly plausible. Where can we start?

A common approach would be to find similar compounds based on their molecular structure and then infer the mechanism of action by similarity with other drugs. For example, if this new compound X is very similar to the Ibuprofen and many other NSAIDs, and the anti-inflammatory response is similar, then we can imagine that this new drug shares the same mechanism of action.  Sometimes, however, minor modifications in the structure of the molecule can have very different biological effects. 

Another possibility is to use those effects (like changes in gene expression or cell viability after administering the drug) to find which of the known compounds produce a similar response. This ultimate response of the cells to the perturbation are a better proxy for inferring the mechanism of action than the chemical similarity. In this way, we can generate a "fingerprint" for each drug/dose by measuring, in a standard way, changes in cells. We can use those fingerprints to find similar molecules to our unknown drug, and infer the most probable mechanism of action based on this similarity. **This is the idea behind this competition**.



## The LISH/Kaggle MoA dataset

With the aim of developing better models for predicting the mechanism of action of drugs, the  [Connectivity Map](https://clue.io/), a project within the Broad Institute of MIT and Harvard, the [Laboratory for Innovation Science at Harvard (LISH)](http://lish.harvard.edu/), and the [NIH Common Funds Library of Integrated Network-Based Cellular Signatures (LINCS)](http://lincsproject.org/) prepared this challenge with the goal of advancing the state-of-the-art in MoA prediction for drug development. The data provided consist of around 5,000 drugs used to perturb 100 cells and measure changes in gene expression and cell viability. In their own words:

> "In this competition, you will have access to a unique dataset that combines gene expression and cell viability data. The data is based on a new technology that measures simultaneously (within the same samples) human cells’ responses to drugs in a pool of 100 different cell types (thus solving the problem of identifying ex-ante, which cell types are better suited for a given drug). In addition, you will have access to MoA annotations for more than 5,000 drugs in this dataset."

This new technology measures at the same time the gene expression of 772 genes and the cell responses of 100 human cancer cell lines. Before we look at this in more detail, let's take a look at what the dataset looks like. For this purpose, I've merged all the recent released annotations and the original Kaggle dataset into a single csv that we can read with Pandas:

```python
import pandas as pd

df_dataset = pd.read_csv('https://github.com/pablormier/kaggle-lish-moa-annotated/raw/master/lish_moa_annotated.csv.zip',
                         dtype={'sig_id': 'object', 'drug_id': 'object'})
df_dataset
```

![dataset]({{ site.baseurl }}/assets/img/lincs/dataset.png)

Each drug was used at two different concentrations (D1 and D2), and measured at different time points (24h, 48h and 72h), so in theory we should expect 2 * 3 rows for each drug in the dataset. Thus, each row represents a perturbation experiment for a given drug. Here are the description of the columns:

* **sig_id**: an unique id for the perturbation experiment. This is not interesting because the original drug names were replaced by hashes to anonymize the data. As I mentioned before, we should have 6 different ids for each drug.
* **drug_id** : an unique id for each drug. This column was provided a few weeks after the challenge started in order to help people find a better cross validation strategy. I will talk more about this in a second post.
* **training**: I added this column to the dataset since I've merged both the training data and the test data that was provided to the participants.
* **cp_type**: Indicates whether the perturbation is a real drug (trt_cp) or just a vehicle (ctl_vehicle) with no biological effects (control).
* **cp_time** : the timepoint at which the drug effects were measured. It can be 24h, 48h o 72h.
* **cp_dose** : the dose used for the drug. This is just a categorical value (D1 or D2), we don't have information about the real dosage, or whether D1 is a higher dose than D2 or not.
* **Columns g-*** : columns starting with g-* are the measured genes. These values are normalized gene expression levels, so positive values correspond to genes that are more up-regulated after treatment, and negative values are the genes that are down-regulated after treatment.
* **Columns c-** : these correspond to normalized cell viability measurements. Positive values correspond to an increased proliferation rate of the cells after treatment (cells grow faster), and negative values correspond to a decreased growth rate (cell growth is inhibited or cells die)

The last 608 columns are the different MoA labels, starting with the MoA  _'5-alpha_reductase_inhibitor'_. These are binary variables that indicate whether the drug perturbation is associated with that MoA or not. From these 608 columns, the first 206 are the ones that are evaluated in the competition, and the remaining 402 are additional MoAs that are provided to help the classification task.

## The L1000 project

One interesting aspect of this dataset is how the data itself was produced. There are 5,000 drugs screened, and each drug was tested with 2 doses and independently at three different time points. This means that in order to produce the data, we would need to run 2 * 3 * 5,000 = 30,000 samples for a single cell line. If we use RNA-seq to measure the mRNA levels for the genes, that would be very expensive. Assuming an average cost of $200 per sample, this would make an estimated cost of $6,000,000!!. But not only that, there are also logistical and technical problems in analyzing such a large number of samples, including an important source of technical variability that can introduce batch effects into the data, masking the relevant biological signal. How to deal with these issues?

![figure-1]({{ site.baseurl }}/assets/img/lincs/lincs-img1.png)
*__Figure 3__: The L1000 pipeline for gene quantification and signature creation. Image taken from the original paper ["A Next Generation Connectivity Map: L1000 platform and the first 1,000,000 profiles"](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5990023/)*

In 2017, a team from the Broad Institute led by Aravin Subramanian presented the L1000 platform to massively scale up these perturbation experiments. In order to reduce the cost of producing these data, what they did is, instead of measuring all genes (~25,000), only the 978 most informative genes (landmark genes) are measured using a single [Luminex Assay](https://resources.rndsystems.com/images/site/rnd-systems-luminex-assays-br.pdf), and the rest of the genes are simply inferred using a linear model trained on this subset of genes. These 978 landmark genes were selected based on a study using data from 12,063 microarray samples downloaded from Gene Expression Omnibus (GEO), where they observed that the selection of these 978 genes were enough to predict the 81% of the non measured genes. Another clever trick they've introduced is the deconvolution step (represented in the image above). Since the Luminex Bead Assays have a maximum capacity of 500 distinct beads, and there are 978 landmark genes to measure, they would need in theory two assays per sample. Instead of doing that, they virtually doubled the capacity of the assay by measuring two genes per bead using a 2:1 mixing ratio, followed by a deconvolution step using k-means to identify the two peaks and associate them to their corresponding genes. 

But if they measure 978 landmark genes, **why the dataset contains only 772 genes?**. In order to produce the Kaggle dataset, they developed a new technology based on this L1000 platform that measures both gene expression levels and cell viability at the same time (see [this thread](https://www.kaggle.com/c/lish-moa/discussion/180098) in Kaggle). It looks like, in order to make room for the cell viability data, they had to throw away 104 landmark genes. The big issue is that, as far as I know, there is no inference model to predict the remaining genes from these 772 genes, as in the L1000 case. This considerably constrains the possibilities of the dataset, although I hope that some model will be released soon.




## Exploratory data analysis

Now that we know a little bit about the challenge, we can start analyzing the data. First, we extract the columns corresponding to gene features, cell features and MoAs:

```python
# Remove the evaluation data for which we don't know the MoAs
df = df_dataset.loc[df_dataset.training == True, :]

# Extract the columns referring to the genes, cells, and MoAs
genes = [c for c in df.columns.values if c.startswith("g-")]
cells = [c for c in df.columns.values if c.startswith("c-")]
moas = df.iloc[:,-608:].columns.values
print(genes[0], cells[0], moas[0])
```

```
g-AARS1_16 c-0-HEYA8_OVARY 5-alpha_reductase_inhibitor
```

Gene features are in  the format `g-Symbol_Entrez`, where the ENTREZ is the NCBI gene ID. The cells are in the format `c-ID-Cell`, where the ID corresponds to the original ID in the Kaggle dataset, and Cell is the CCLE cell line name used in the assay. For example, the first cell line (c-0) in the dataset is the HEYA8 _OVARY cell line. Specific details about the cell lines can be obtained from the DepMap portal.

### Distribution of MoAs

Now that we classified the different columns into genes, cells, and moas, we can start querying things more easily. Since the goal of the challenge is to predict the MoAs, the first thing we can do is to check the distribution of MoAs to see whether the dataset is **balanced** or **imbalanced**. 

```python
df[moas].sum().sort_values(ascending=False)
```

```
nfkb_inhibitor                   832.0
proteasome_inhibitor             726.0
cyclooxygenase_inhibitor         435.0
dopamine_receptor_antagonist     424.0
serotonin_receptor_antagonist    404.0
                                 ...  
guanylate_cyclase_stimulant        0.0
ripk_inhibitor                     0.0
l3mbtl_antagonist                  0.0
rage_receptor_antagonist           0.0
deubiquitinase_inhibitor           0.0
Length: 608, dtype: float64
```

These numbers already show that indeed we have an imbalanced dataset. Having a strong uneven distribution of the MoAs in the dataset will make our work more difficult, since this will bias our models towards predicting the majority classes and will increase the chances of overfitting if we don't take proper care. Let's do a plot the frequencies:

```python
fig, ax = plt.subplots(figsize=(18, 6))
df[moas].mean().sort_values(ascending=False).head(50).plot.bar(ax=ax);
```

![Fequency of each MoA]({{ site.baseurl }}/assets/img/lincs/moa-freq.png)

Around a 3.5% of the samples (832 rows in the dataset) correspond to nuclear factor kappa B (NF-κB) inhibitors, followed by a 3% of entries corresponding to proteasome inhibitors. These are two common targets of many anti-cancer compounds, so it's not strange to find in the dataset many entries with these MoAs. Also, there are 71 MoAs for which we don't have any sample. We can remove those MoAs from the dataset since we cannot learn anything without data. 

### Gene features

Let's have a look now at the gene features. For this, I'm going to select the top 3 genes that vary the most across experiments, and plot their densities:

```python
fig, ax = plt.subplots(1, 3, figsize=(16, 4))
topgenes = df[genes].var().sort_values(ascending=False).head(3).index.values
df[topgenes[0]].plot.density(ax=ax[0], title=topgenes[0])
df[topgenes[1]].plot.density(ax=ax[1], title=topgenes[1])
df[topgenes[2]].plot.density(ax=ax[2], title=topgenes[2])
```

![figure-genes]({{ site.baseurl }}/assets/img/lincs/gene-features.png)

The first thing to notice is that all distributions look similar and centered at 0. Indeed, data was normalized with that purpose, so values close to 0 show no changes with respect to cells that were not treated, positive values show an increased activity (more expression of a gene, comparing it to control, non treated cells), and negative values show a decreased activity (less expression). Also, values move only around -10 and 10, since they probably capped the values to force them to be in that interval. That's why we observe a bump at -10.

We can see that the top 3 genes that vary the most are CCNA2, COL1A1 and BUB1B. Both CCNA2 and BUB1B are genes related to the cell cycle. Since many compounds in the dataset kill the cells and thus affect the cell division, it is not surprising to find genes related to the cell cycle at the top. 

### Cell viability features

We can do the same for the cell features:

```python
fig, ax = plt.subplots(1, 3, figsize=(16, 4))
topcells = df[cells].var().sort_values(ascending=False).head(3).index.values
df[topcells[0]].plot.density(ax=ax[0], title=topcells[0]);
df[topcells[1]].plot.density(ax=ax[1], title=topcells[1]);
df[topcells[2]].plot.density(ax=ax[2], title=topcells[2]);
```

![figure-cells]({{ site.baseurl }}/assets/img/lincs/cell-features.png)

Among the cell lines, we have that the top 3 whose cell viability values are more dispersed are the SNU886 (liver cancer), A2058 (skin cancer) and YD10B (upper aerodigestive tract cancer). What might this suggest? since they show more variability, it might suggest that these cell lines are more sensitive to the compounds in the dataset. Let's do a plot to see how the different cell lines rank:

```python
fig, ax = plt.subplots(figsize=(18, 6))
df[cells].var().sort_values(ascending=False).plot.bar(ax=ax);
```

![Cells sorted by variance]({{ site.baseurl }}/assets/img/lincs/cell-var.png)

In this plot, we can see that on the opposite side we have the OV7 (stage III ovarian cancer), as one of the less variable cell lines in the dataset, which it probably suggest a strong resistance to many drugs. We can do a different plot to compare the average effect of each drug on these two more extreme cell lines:

```python
def drug_rank(cell_line, df=df):
  drug_mean = df.groupby('drug_id').mean()[cell_line]
  drug_rank = df.groupby('drug_id').mean()[cell_line].rank()
  return pd.DataFrame({'drug': drug_mean.index.values, 
                       'cell': [cell_line]*drug_mean.shape[0], 
                       'rank': drug_rank.values, 
                       'mean': drug_mean.values})

def plot_drug_ranks(cells, df=df, figsize=(10,6)):
  fig, ax = plt.subplots(figsize=figsize)
  ax.axhline(-2, color='r', linestyle='--')
  ax.axhline(2, color='g', linestyle='--')
  df_results = None
  for c in cells:
    if df_results is None:
      df_results = drug_rank(c)
    else:
      df_results = df_results.append(drug_rank(c))
  sns.scatterplot(x='rank', y='mean', hue='cell', data=df_results, ax=ax)

# Compare the more extreme cell lines
plot_drug_ranks(['c-74-OV7_OVARY', 'c-63-SNU886_LIVER'])
```

![figure-drugs]({{ site.baseurl }}/assets/img/lincs/drug-rank.png)
*__Figure 7__: Ranking of drugs for the two most extreme cell lines.*

Those drugs below -2 are the ones that slow down or kill the cells, with stronger effects as we approach -10. As can be seen, for the OV7 cell line, there are less drugs that show extreme effects on cell viability than for the other cell line, but still we find some between [-2, -4]. Which drugs are these? Unfortunately, we don't have the drug names in the dataset, but one thing that we can do is to find which MoAs are the most commonly associated with drugs that show on average some anti-proliferative effects:

```python
fig, ax = plt.subplots(1, 2, figsize=(16,4))
df_drugs_ov7 = drug_rank('c-74-OV7_OVARY')
effective_drugs = df_drugs_ov7.loc[df_drugs_ov7['mean'] <= -2].drug.values
ineffective_drugs = df_drugs_ov7.loc[(df_drugs_ov7['mean'] > -2) & (df_drugs_ov7['mean'] < -1) ].drug.values
df[df.drug_id.isin(effective_drugs)][moas].mean().sort_values(ascending=False).head(10).plot.bar(ax=ax[0])
df[df.drug_id.isin(ineffective_drugs)][moas].mean().sort_values(ascending=False).head(10).plot.bar(ax=ax[1])
```

![figure-ov7-drugs]({{ site.baseurl }}/assets/img/lincs/ov7-moas.png)
*__Figure 8__: Most frequent associated MoAs that show some anti-proliferative effects on cell viability for the OV7 ovarian cancer cell line.*

Again, we see that NF-κB and Proteasome inhibitor drugs are among the ones that show a stronger effect against OV7. We can try to "guess" some of the possible drugs by searching on the [CLUE Repurposing App](https://clue.io/repurposing-app), a web tool for exploiting the L1000 data online. We can see  for example that among all the NF-κB inhibitor compounds, there are 9 that are already launched: bicyclol, bortezomib, closantel, curcumin, erythromycin, iguratimod, mepacrine, sasapyrine and auranofin. Among them, there are some anti-cancer drugs, such as bortezomib, which is a compound that is used in combination with other drugs for treating multiple myelomas, but also [ovarian cancers](https://www.sciencedirect.com/science/article/abs/pii/S0090825807006610). But we can find other compounds that are not used for treating cancer, like curcumin, that show also in-vitro anti-proliferative effects.

### Dimensionality reduction

Before throwing our data into a machine learning model, it is important to spend some time visualizing the data. PCA plots (as well as UMAP/t-SNE plots) are very useful to find trends and patterns in data, and also to identify potential batch effects, mislabeled points and/or outliers in our dataset. In our case, it can be interesting to see the effect of different doses and measurement time points in  the gene expression or cell viabililty. For example, I will expect, in general, low variability in the control samples, or a stronger effect on cell viability and gene expression after 72h of applying a treatment than in 24h. We can produce easily these plots with the following code:

```python
from sklearn.decomposition import PCA

def plot_pca(df_data, df=df, figsize=(18,6)):
  fig, ax = plt.subplots(1, 3, figsize=(18,6))
  pc = PCA(n_components=2, whiten=True).fit_transform(df_data)
  df_pc = pd.DataFrame(pc, columns=['PC1','PC2'])
  df_pc["Dose"] = df.cp_dose.astype("category")
  df_pc["Type"] = df.cp_type.astype("category")
  df_pc["Time"] = df.cp_time.astype("category")
  sns.scatterplot(data=df_pc, x='PC1', y='PC2', hue='Dose', alpha=0.5, ax=ax[0]);
  sns.scatterplot(data=df_pc, x='PC1', y='PC2', hue='Time', alpha=0.5, ax=ax[1]);
  sns.scatterplot(data=df_pc, x='PC1', y='PC2', hue='Type', alpha=0.5, ax=ax[2]);
  return fig, ax

plot_pca(df[cells+genes]);
```

![Fequency of each MoA]({{ site.baseurl }}/assets/img/lincs/pca.png)

At first glance, it looks like there is no distinction between the dose and the timepoint. Why? this is possibly due to the heterogeneity of the drugs in the dataset (some may have a greater effect at 24h than others at 48h or 72h, for example), and when we mix everything, we cannot see a clear pattern. But a priori, I would say that these variables are not going to have a very important impact on a predictive model. 

Where we can see a clear difference is between controls and treatments (third image).

### Gene coexpression

WIP

![corregulation]({{ site.baseurl }}/assets/img/lincs/corregulation-small.png)

To be continued...