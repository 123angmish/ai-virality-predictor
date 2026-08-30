# 🧠 Model Card — HistGradientBoosting Virality Regressor

## 1. Model Details
- **Architecture**: Histogram-Based Gradient Boosting Decision Tree Regressor (`HistGradientBoostingRegressor`).
- **Framework**: Scikit-Learn 1.4+
- **Input Dimension**: 7 continuous and discrete audiovisual features.
- **Output**: Continuous `ViralityScore` on a $0 - 100$ scale.
- **Hyperparameters**:
  - `learning_rate`: 0.05
  - `max_iter`: 200
  - `max_depth`: 7
  - `random_state`: 42

---

## 2. Evaluation Metrics (80/20 Train-Test Split)

- **$R^2$ Score**: `0.8669` (Explains ~86.7% of the benchmark target variance)
- **RMSE**: `4.8081`
- **MAE**: `3.9141`

---

## 3. Permutation Feature Importance Ranking

Permutation importance measures the drop in model $R^2$ score when values of a specific feature are randomly shuffled on the test set:

| Rank | Feature | Mean Decrease in $R^2$ | Interpretation |
| :--- | :--- | :--- | :--- |
| **1** | `hook_motion_intensity` | `0.4120` | High opening motion is the primary driver for stopping initial swipe-away. |
| **2** | `scene_cut_rate` | `0.2854` | Fast visual pacing keeps user retention high throughout the clip. |
| **3** | `audio_rms_energy` | `0.2410` | Dynamic audio presence prevents silent drop-offs. |
| **4** | `text_overlay_ratio` | `0.1190` | Captions ensure comprehension during muted feed browsing. |
| **5** | `color_vibrancy` | `0.0620` | Color saturation contributes secondary aesthetic engagement. |
| **6** | `transcript_wpm` | `0.0480` | Moderate cadence supports narrative retention. |
| **7** | `resolution_aspect` | `0.0310` | Vertical 9:16 aspect aligns with modern mobile platform formats. |

---

## 4. Intended Use & Safety Considerations

- **Intended Use**: Video pre-publishing diagnostic audit, pacing optimization, and heuristic multi-platform blueprint generation.
- **Inappropriate Use**: Financial investment forecasting or guaranteeing specific view counts on external social platforms.