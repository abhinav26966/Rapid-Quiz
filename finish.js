const userInput = document.getElementById('userInput');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalPoints = document.getElementById('finalPoints');
const latestScore = localStorage.getItem('latestScore');

const topScores = JSON.parse(localStorage.getItem('topScores')) || [];

const MAX_TOP_SCORES = 5;

finalPoints.innerText = latestScore;

userInput.addEventListener('keyup', () => {
    saveScoreButton.disabled = !userInput.value;
});

saveTopScore = (e) => {
    e.preventDefault();

    const score = {
        score: latestScore,
        name: userInput.value,
    };
    topScores.push(score);
    topScores.sort((a, b) => b.score - a.score);
    topScores.splice(5);

    localStorage.setItem('topScores', JSON.stringify(topScores));
    window.location.assign('/');
};
