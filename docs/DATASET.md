# 📊 Dataset Documentation — Synthetic Audiovisual Virality Benchmark

## 1. Overview & Provenance Classification
- **Classification**: **Synthetic Benchmark Dataset** parameterized by published social media engagement distributions.
- **Purpose**: Designed to validate the end-to-end Machine Learning pipeline, evaluate non-linear feature combinations, and drive the multi-platform heuristic recommendation engine in a reproducible environment.
- **Sample Count**: 10,000 synthetic short-form video records.
- **Random Seed**: 42 (guarantees exact deterministic generation).

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

The benchmark target represents a composite virality index ($0 - 100$) constructed using retention-weighted feature interactions with Gaussian noise:

$$\text{RawScore} = 0.35 \cdot \text{hook} + 1.5 \cdot \text{cuts} + 25.0 \cdot \text{rms} + 0.15 \cdot \text{wpm} + 20.0 \cdot \text{text} + 0.25 \cdot \text{vibrancy} + 15.0 \cdot \text{aspect} + 0.3 \cdot \text{retention} + \epsilon$$
$$\text{ViralityScore} = 10.0 + \left( \frac{\text{RawScore} - \min}{\max - \min} \right) \times 88.0$$

*Where $\epsilon \sim \mathcal{N}(0, 3.0)$ introduces realistic stochastic variation.*

---

## 4. Methodological Limitations

1. **Non-Real-World Ground Truth**: While the parameter ranges model observed short-form social video trends, the records are synthetically synthesized and do not reflect specific live social media accounts or actual platform algorithmic shifts.
2. **Omitted External Covariates**: Real social media virality is heavily influenced by external variables not captured in raw video files alone:
   - Creator follower base and historical authority.
   - Distribution timing and regional trend momentum.
   - Platform recommendation algorithm AB testing.
   - Community comment engagement and controversial discussion.