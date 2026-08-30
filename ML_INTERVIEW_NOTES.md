# 🎯 Machine Learning Interview Defense Notes — AI Virality Predictor

### Q1: What was built during the NIT Kurukshetra internship vs later?
> **Answer**: During my NIT Kurukshetra research internship, I built the initial Flask research prototype focused on the core computer vision and signal processing pipelines — using OpenCV for optical flow motion analysis and Librosa for audio RMS energy extraction. Later, I independently redesigned the project into a full-stack platform using FastAPI and Next.js 14 with interactive diagnostic dashboards, automated platform blueprints, and reproducible ML benchmarks.

### Q2: Is the training dataset real or synthetic?
> **Answer**: It is a standardized **Synthetic Benchmark Dataset** of 10,000 records parameterized by published short-form video dynamics (log-normal view/like distributions, Rayleigh hook velocities, and Beta retention curves). It is specifically used to validate the pipeline architecture and evaluate non-linear feature interactions in a controlled, reproducible environment without making false claims of scraped social media data.

### Q3: Why choose `HistGradientBoostingRegressor` over Linear Regression?
> **Answer**: While Linear Regression shows a strong baseline on linear components, gradient boosted decision trees naturally capture non-linear relationships and threshold effects (such as diminishing returns on scene cut pacing) without requiring manual polynomial feature engineering. The histogram-based implementation bins continuous variables into 256 discrete bins, drastically speeding up tree construction and maintaining sub-5ms inference latency.

### Q4: How are OpenCV and Librosa used in the feature extraction pipeline?
> **Answer**: 
> - **OpenCV**: Computes frame-difference absolute thresholding (`cv2.absdiff`) to detect rapid cuts-per-minute and calculates optical flow displacement in the initial 0–3 seconds of footage to assess hook motion intensity.
> - **Librosa**: Transforms the audio track into the frequency domain to compute RMS energy bursts and estimate spoken tempo (Words Per Minute).

### Q5: What are the primary limitations of predicting social media virality with ML?
> **Answer**: Video content quality and pacing are only one part of virality. In live production environments, virality also depends on external covariates such as creator audience size, platform recommendation algorithms, regional timing, trend momentum, and comment engagement. The model serves as an editing diagnostic rather than a guaranteed virality oracle.