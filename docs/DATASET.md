# 📊 Dataset Documentation — Synthetic Audiovisual Virality Benchmark

## 1. Overview & Provenance Classification
- **Classification**: **Synthetic Benchmark Dataset** parameterized by controlled synthetic distributions.
- **Purpose**: Designed to validate the end-to-end Machine Learning pipeline architecture, test multimodal feature extraction integrations, and evaluate platform blueprint heuristic logic in a reproducible testbed.
- **Sample Count**: 10,000 synthetic video records.
- **Random Seed**: 42 (guarantees exact deterministic reproduction).

---

## 2. Statistical Distributions & Feature Definitions

| Feature Name | Type | Range / Domain | Underlying Distribution / Extraction Target | Description |
| :--- | :--- | :--- | :--- | :--- |
| `hook_motion_intensity` | Continuous | $10.0 - 95.0$ | Uniform / Optical Flow | Magnitude of pixel motion displacement in the first 0–3 seconds of video. |
| `scene_cut_rate` | Continuous | $2.0 - 30.0$ | Uniform / Frame Differences | Number of detected scene cut transitions per minute. |
| `audio_rms_energy` | Continuous | $0.10 - 0.95$ | Uniform / Spectral Energy | Mean root-mean-square acoustic energy of the audio track. |
| `transcript_wpm` | Continuous | $110.0 - 240.0$ | Uniform / Speech Tempo | Spoken word pace per minute (optimal target: 160–180 WPM). |
| `text_overlay_ratio` | Continuous | $0.00 - 0.80$ | Uniform / Spatial Density | Ratio of frame area covered by burnt-in captions or text overlays. |
| `color_vibrancy` | Continuous | $20.0 - 98.0$ | Uniform / Color Grading | Average HSV color saturation and warmth score. |
| `resolution_aspect` | Discrete | $\{0.5625, 1.0, 1.777\}$ | Discrete Probability ($0.70, 0.15, 0.15$) | Video aspect ratio (9:16 vertical priority = 0.5625). |
| `watch_time_retention`| Continuous | $0.0 - 100.0\%$ | Beta Distribution ($\alpha=2.5, \beta=2.0$) | Simulated audience percentage completion. |

---

## 3. Target Formulation (`ViralityScore`)

The benchmark target represents an engineered composite index ($0 - 100$) constructed using retention-weighted feature interactions with Gaussian noise:

$$\text{RawScore} = 0.35 \cdot \text{hook} + 1.5 \cdot \text{cuts} + 25.0 \cdot \text{rms} + 0.15 \cdot \text{wpm} + 20.0 \cdot \text{text} + 0.25 \cdot \text{vibrancy} + 15.0 \cdot \text{aspect} + 0.3 \cdot \text{retention} + \epsilon$$
$$\text{ViralityScore} = 10.0 + \left( \frac{\text{RawScore} - \min}{\max - \min} \right) \times 88.0$$

*Where $\epsilon \sim \mathcal{N}(0, 3.0)$ introduces realistic stochastic variation.*

---

## 4. Methodological Scope & External Validity

1. **Synthetic Validation Scope**: Controlled synthetic distributions were chosen to simulate plausible audiovisual feature ranges and verify ML pipeline mechanics.
2. **External Validity**: Benchmark metrics ($R^2$, RMSE) evaluate algorithm fit against the synthetic target formulation; they do **not** represent forecasting accuracy on live social media platforms.
3. **Uncaptured Real-World Dynamics**: Live social media engagement depends heavily on external factors not present in raw video pixel/audio data:
   - Creator follower base and account authority.
   - Algorithmic recommendation cohort testing.
   - Cultural timing, trending sounds, and topical momentum.
   - User comment threads and sharing dynamics.