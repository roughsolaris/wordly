const textInput =
    document.getElementById("textInput");

const keywordList =
    document.getElementById("keywordList");

const clearButton =
    document.getElementById("clearButton");

const themeButton =
    document.getElementById("themeButton");

const year =
    document.getElementById("year");


const ignoredWords = new Set([

    "the",
    "and",
    "for",
    "that",
    "this",
    "with",
    "from",
    "have",
    "will",
    "your",
    "you",
    "are",
    "was",
    "were",
    "they",
    "their",
    "there",
    "what",
    "when",
    "where",
    "which",
    "about",
    "into",
    "than",
    "then",
    "them",
    "these",
    "those",
    "some",
    "more",
    "very",
    "just",
    "also",
    "only",
    "can",
    "could",
    "would",
    "should",
    "has",
    "had",
    "but",
    "not",
    "all",
    "our",
    "out",
    "its",
    "it's",
    "was",
    "were",
    "been",
    "being",
    "who",
    "how",
    "why",
    "a",
    "an",
    "in",
    "on",
    "at",
    "to",
    "of",
    "is",
    "it",
    "as",
    "be",
    "or",
    "by",
    "we",
    "he",
    "she",
    "i",
    "me",
    "my"

]);


function analyzeKeywords() {

    const text =
        textInput.value
        .toLowerCase();


    if (!text.trim()) {

        keywordList.innerHTML = `
            <div class="empty-keywords">
                Start typing to see your keywords.
            </div>
        `;

        return;

    }


    const words =
        text.match(
            /[a-zA-ZÀ-ÿ0-9]+/g
        ) || [];


    const counts = {};


    words.forEach(word => {

        if (
            word.length < 3 ||
            ignoredWords.has(word)
        ) {
            return;
        }


        counts[word] =
            (counts[word] || 0) + 1;

    });


    const sorted =
        Object.entries(counts)
        .sort(
            (a,b) =>
                b[1] - a[1]
        )
        .slice(0, 15);


    if (!sorted.length) {

        keywordList.innerHTML = `
            <div class="empty-keywords">
                Not enough keywords yet.
            </div>
        `;

        return;

    }


    keywordList.innerHTML =
        sorted.map(
            ([word,count],index) => `

                <div class="keyword-row">

                    <div class="keyword-name">

                        <span class="keyword-rank">
                            ${index + 1}
                        </span>

                        <span>
                            ${escapeHtml(word)}
                        </span>

                    </div>

                    <strong>
                        ${count}
                    </strong>

                </div>

            `
        ).join("");

}


function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


textInput.addEventListener(
    "input",
    analyzeKeywords
);


clearButton.onclick = () => {

    textInput.value = "";

    analyzeKeywords();

    textInput.focus();

};


let lightMode = false;

themeButton.onclick = () => {

    lightMode =
        !lightMode;


    if (lightMode) {

        document.documentElement.style.setProperty(
            "--bg",
            "#f5f5f7"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#111217"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#686d79"
        );

        themeButton.textContent =
            "☾";

    } else {

        document.documentElement.style.setProperty(
            "--bg",
            "#08090d"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#f5f7ff"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#858a9a"
        );

        themeButton.textContent =
            "☼";

    }

};


year.textContent =
    new Date().getFullYear();