import {
    Quote
} from './Quote.js';

class Game {

    currentStep = 0;
    lastStep = 7;

    quotes = [{
            text: "pan tadeusz",
            category: "Utwór literacki",
        },
        {
            text: "janko muzykant",
            category: "Utwór literacki",
        },
        {
            text: "akademia pana kleksa",
            category: "Film",
        },
        {
            text: "ogniem i mieczem",
            category: "Film",
        },
    ];

    constructor({
        lettersWraper,
        categoryWraper,
        wordWraper,
        outputWraper
    }) {
        this.lettersWraper = lettersWraper;
        this.categoryWraper = categoryWraper;
        this.wordWraper = wordWraper;
        this.outputWraper = outputWraper;

        const {
            text,
            category
        } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWraper.innerHTML = category;
        this.quote = new Quote(text);
    }

    guess(letter, event) {
        event.target.disabled = true;
        if (this.quote.guess(letter)) {
            this.drawQuote();
        } else {
            this.currentStep++
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
            if (this.currentStep === this.lastStep) {
                this.loosing();
            }
        }
    }

    drawLetters() {
        // Klawiatura w grze z literami
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36); // metoda zamieniająca cyfry na litery
            // console.log(label);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event) => this.guess(label, event));
            this.lettersWraper.appendChild(button);
        }
    }

    drawQuote() {
        const content = this.quote.getContent();
        this.wordWraper.innerHTML = content;
        if (!content.includes('_')) {
            this.winning();
        }
    }

    start() {
        // Wywołanie tmetody koniecznie z this
        this.drawLetters();
        this.drawQuote();
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
    }

    winning() {
        this.wordWraper.innerHTML = 'Wygrałeś!!';
        this.lettersWraper.innerHTML = '';
    }

    loosing() {
        this.wordWraper.innerHTML = 'Przegrałeś!!';
        this.lettersWraper.innerHTML = '';
    }
}

const game = new Game({
    lettersWraper: document.getElementById('letters'),
    categoryWraper: document.getElementById('category'),
    wordWraper: document.getElementById('word'),
    outputWraper: document.getElementById('output')
});

game.start();