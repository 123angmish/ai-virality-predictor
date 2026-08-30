# 🔬 Experiments & Baseline Model Comparison

## 1. Objective
To evaluate candidate regression algorithms on the multimodal benchmark dataset ($N=10,000$, 80/20 train-test split) and determine the optimal model using objective error metrics ($R^2$, $RMSE$, $MAE$).

---

## 2. Benchmark Results Table

| Model | $R^2$ Score (Higher is Better) | RMSE (Lower is Better) | MAE (Lower is Better) | Status / Role |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Regression** | `0.8824` | `4.5194` | `3.7105` | **Selected Best-Performing Model** |
| **Ridge Regression ($\alpha=1.0$)** | `0.8824` | `4.5195` | `3.7105` | Linear $L_2$ Regularized Baseline |
| **HistGradientBoosting Regressor** | `0.8669` | `4.8081` | `3.9141` | Non-Linear Comparison Model |
| **Gradient Boosting Regressor** | `0.8651` | `4.8396` | `3.9203` | Non-Linear Comparison Model |
| **Random Forest Regressor** | `0.8007` | `5.8836` | `4.6765` | Bagged Ensemble Comparison |

---

## 3. Why the Linear Baseline Performs Best

The synthetic benchmark target is largely constructed as a weighted linear combination of input features plus Gaussian noise:
$$\text{RawScore} = \sum w_i X_i + \epsilon$$

Because the underlying data-generating process is linear with additive noise:
1. **Direct Representation**: Linear Regression directly models the ground-truth relationship with zero structural bias.
2. **Lower Variance**: Complex decision tree ensembles (like Random Forests or Gradient Boosting) partition the continuous feature space into discrete step-functions, introducing approximation error and variance on smooth linear targets.
3. **Principled ML Conclusion**: Selecting the simpler linear model is the scientifically correct conclusion driven by experimental evidence rather than default algorithmic complexity.

---

## 4. Model Coefficients vs. Permutation Importance

- **Model Coefficients ($\beta_i$)**: Represent the fitted linear slopes. Multiplying $\beta_i \times \sigma_{X_i}$ provides the standardized effect size, indicating how much the target changes per standard deviation change in a feature.
- **Permutation Importance**: Measures the drop in test $R^2$ when a single feature is randomly shuffled. It evaluates feature necessity for model predictions.
- **Important Note**: Neither coefficients nor permutation importance imply real-world causal mechanisms.

---

## 5. External Validity

Benchmark $R^2$ and RMSE values evaluate mathematical optimization and pipeline integrity on this benchmark testbed; they do **not** represent forecasting accuracy against live social media platforms.