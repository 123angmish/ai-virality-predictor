// Charts Initialization for results dashboard
document.addEventListener("DOMContentLoaded", function() {
    if (typeof Chart === 'undefined' || typeof features === 'undefined') return;

    // 1. Radar Chart Configuration
    const radarCtx = document.getElementById("radarChart").getContext("2d");
    
    // Normalization calculations (making different scales visually comparable 0-100)
    const scaleVal = (val, maxBound) => Math.min(100, Math.max(5, (val / maxBound) * 100));
    
    const actualData = [
        features.hook_score,
        scaleVal(features.brightness, 200),
        scaleVal(features.contrast, 150),
        scaleVal(features.motion_score, 10),
        scaleVal(features.scene_change_score, 0.35),
        scaleVal(features.sharpness, 800),
        features.emotion_score,
        features.audio_energy
    ];

    const benchmarkData = [
        80, // Optimal Hook
        65, // Brightness (Optimal range 100-150 / 200)
        60, // Contrast
        55, // Motion
        55, // Scene cuts
        70, // Sharpness
        75, // Emotion presence
        70  // Audio energy
    ];

    const radarLabels = ['Hook Score', 'Brightness', 'Contrast', 'Motion', 'Scene Cuts', 'Sharpness', 'Emotion', 'Audio Energy'];

    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: radarLabels,
            datasets: [
                {
                    label: 'Video Metrics',
                    data: actualData,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgb(99, 102, 241)',
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(99, 102, 241)',
                    borderWidth: 2
                },
                {
                    label: 'Optimal Benchmark',
                    data: benchmarkData,
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: 'rgb(16, 185, 129)',
                    pointBackgroundColor: 'rgb(16, 185, 129)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(16, 185, 129)',
                    borderWidth: 2,
                    borderDash: [4, 4]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#94a3b8',
                        font: {
                            family: 'Outfit',
                            size: 11
                        }
                    },
                    ticks: {
                        display: false
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9',
                        font: {
                            family: 'Outfit'
                        }
                    }
                }
            }
        }
    });

    // 2. Bar Chart Configuration (Comparing Proximity to Benchmark)
    const barCtx = document.getElementById("barChart").getContext("2d");
    
    // Proximity = 100 - absolute percentage difference from optimum
    const getProximity = (actual, optimal) => {
        const diff = Math.abs(actual - optimal);
        return Math.max(0, Math.round(100 - (diff / optimal) * 100));
    };

    const proximities = [
        getProximity(features.hook_score, 80),
        getProximity(scaleVal(features.brightness, 200), 65),
        getProximity(scaleVal(features.contrast, 150), 60),
        getProximity(scaleVal(features.motion_score, 10), 55),
        getProximity(scaleVal(features.scene_change_score, 0.35), 55),
        getProximity(scaleVal(features.sharpness, 800), 70),
        getProximity(features.emotion_score, 75),
        getProximity(features.audio_energy, 70)
    ];

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: radarLabels,
            datasets: [{
                label: 'Benchmark Proximity %',
                data: proximities,
                backgroundColor: proximities.map(v => {
                    if (v >= 80) return 'rgba(16, 185, 129, 0.7)'; // Green
                    if (v >= 50) return 'rgba(245, 158, 11, 0.7)'; // Amber
                    return 'rgba(239, 68, 68, 0.7)'; // Red
                }),
                borderColor: proximities.map(v => {
                    if (v >= 80) return 'rgb(16, 185, 129)';
                    if (v >= 50) return 'rgb(245, 158, 11)';
                    return 'rgb(239, 68, 68)';
                }),
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Outfit'
                        }
                    },
                    min: 0,
                    max: 100
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Outfit'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});
