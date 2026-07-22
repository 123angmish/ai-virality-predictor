// Initialize application
document.addEventListener("DOMContentLoaded", function () {
    console.log("ViralityAI Loaded");
});

// Share Result utility
function shareResult(analysisId) {
    const reportUrl = `${window.location.origin}/result/${analysisId}`;

    if (navigator.share) {
        navigator.share({
            title: "AI Virality Prediction Report",
            text: "Check out this AI Virality Prediction Report!",
            url: reportUrl
        }).catch(err => console.error(err));
    } else {
        navigator.clipboard.writeText(reportUrl)
            .then(() => {
                alert("Analysis link copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy link:", err);
            });
    }
}