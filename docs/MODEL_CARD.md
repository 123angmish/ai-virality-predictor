# 🧠 Model Card — Linear Regression Virality Baseline

## 1. Model Details
- **Selected Architecture**: Ordinary Least Squares Linear Regression (`LinearRegression`).
- **Comparison Architectures**: `Ridge Regression`, `HistGradientBoostingRegressor`, `GradientBoostingRegressor`, `RandomForestRegressor`.
- **Framework**: Scikit-Learn 1.4+
- **Input Dimension**: 7 continuous and discrete audiovisual features.
- **Output**: Continuous `ViralityScore` on a $0 - 100$ scale.
- **Selection Rationale**: Selected as the best-performing model on the synthetic benchmark because the engineered target is largely a linear combination of input features.

---

## 2. Evaluation Metrics (80/20 Train-Test Split)

- **$R^2$ Score**: `0.8824` (Explains ~88.2% of benchmark target variance)
- **RMSE**: `4.5194`
- **MAE**: `3.7105`

---

## 3. Coefficient & Permutation Importance Analysis

### Standardized Linear Coefficients ($\beta_i \times \sigma_{X_i}$)
| Feature | Raw Coefficient ($\beta_i$) | Feature StdDev ($\sigma$) | Standardized Impact | Direction |
| :--- | :--- | :--- | :--- | :--- |
| `scene_cut_rate` | `1.5034` | `8.07` | `12.13` | Positive |
| `hook_motion_intensity` | `0.3512` | `24.49` | `8.60` | Positive |
| `color_vibrancy` | `0.2508` | `22.56` | `5.66` | Positive |
| `audio_rms_energy` | `25.0421` | `0.245` | `6.14` | Positive |
| `text_overlay_ratio` | `20.0812` | `0.231` | `4.64` | Positive |
| `transcript_wpm` | `0.1498` | `37.48` | `5.61` | Positive |
| `resolution_aspect` | `15.0210` | `0.380` | `5.71` | Positive |

### Permutation Importance Ranking (Mean Drop in Validation $R^2$)
1. `scene_cut_rate` ($\Delta R^2 = 0.3820$)
2. `hook_motion_intensity` ($\Delta R^2 = 0.2940$)
3. `audio_rms_energy` ($\Delta R^2 = 0.1820$)
4. `color_vibrancy` ($\Delta R^2 = 0.1250$)
5. `text_overlay_ratio` ($\Delta R^2 = 0.0980$)
6. `transcript_wpm` ($\Delta R^2 = 0.0810$)
7. `resolution_aspect` ($\Delta R^2 = 0.0760$)

---

## 4. Intended Use & Safety Considerations

- **Intended Use**: Video editing diagnostics, visual pacing checks, and heuristic platform blueprint formulation.
- **Inappropriate Use**: Guaranteeing specific view counts or commercial revenue forecasts on external social platforms.