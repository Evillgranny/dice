import { Application } from 'pixi.js';
import { addScoreboard } from './addScoreboard';
import './style.css';
import { addButton } from "./addButton.ts";

const app = new Application();

let value = [0, 0, 0, 0];

(async () =>
{
    await app.init({ background: 'red', resizeTo: window });
    const { startAnimation, stopAnimation } = addScoreboard(app, value);

    const emitBet = () => {
        startAnimation()

        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 10000);
            stopAnimation(randomNumber);
        }, 2000);
    }

    addButton(app, emitBet);
    document.body.appendChild(app.canvas);
})();