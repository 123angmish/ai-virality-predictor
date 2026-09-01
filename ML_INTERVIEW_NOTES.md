# 🎯 Machine Learning Interview Defense Notes — AI Virality Predictor

### Q1: What was built during the NIT Kurukshetra internship vs later?
> **Answer**: During my NIT Kurukshetra research internship, I built the initial Flask research prototype focused on the core computer vision and signal processing pipelines — using OpenCV for optical flow motion analysis and Librosa for audio RMS energy extraction. Later, I independently redesigned the project into a full-stack platform using FastAPI and Next.js 14 with interactive diagnostic dashboards, automated platform blueprints, and reproducible ML benchmarks.

### Q2: Is the training dataset real or synthetic?
> **Answer**: It is a standardized **Synthetic Benchmark Dataset** ($N=10,000$, Seed `42`) parameterized by controlled synthetic distributions to model plausible video editing feature ranges. It is specifically used to validate the pipeline architecture and evaluate regression algorithms reproducibly without making false claims of scraped social media data.

### Q3: Why is Linear Regression the selected model over Gradient Boosting?
> **Answer**: On our empirical model comparison benchmark, Linear Regression achieved the highest $R^2$ ($0.8824$) and lowest RMSE ($4.5194$). Because the synthetic target formulation is primarily a weighted linear combination of features with additive noise, Linear Regression models the underlying process directly with minimal variance. Tree-based models partition continuous spaces into step-functions, which introduces approximation error on smooth linear targets. Selecting the simpler, better-performing baseline is the principled ML decision.

### Q4: How are OpenCV and Librosa used in the feature extraction pipeline?
> **Answer**: 
> - **OpenCV**: Computes frame-difference absolute thresholding (`cv2.absdiff`) to detect rapid cuts-per-minute and calculates optical flow displacement in the initial 0–3 seconds of footage to assess hook motion intensity.
> - **Librosa**: Transforms the audio track into the frequency domain to compute RMS energy bursts and estimate spoken tempo (Words Per Minute).

### Q5: What are the primary limitations of predicting social media virality with ML?
> **Answer**: Video editing metrics (cuts, hook speed, audio energy) reflect content pacing but cannot capture external social dynamics such as creator follower base, platform recommendation algorithms, regional timing, trend momentum, and comment engagement. The model serves as an editing diagnostic rather than a guaranteed virality oracle.