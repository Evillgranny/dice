import { Application, Container, Graphics } from "pixi.js";
import { addNumberContainer } from "./addNumberContainer.ts";

export const addScoreboard = (app: Application, value: number[]) => {
    const width = app.screen.width;
    const height = app.screen.height;

    const container = new Container({
        width: width / 2,
        height: 300,
        x: width / 4,
        y: height / 4
    })

    const square = new Graphics()
        .roundRect(0, 0, width / 2, 300, 20)
        .fill(0x00FF00);

    container.addChild(square);

    const { startAnimation, stopAnimation } = addNumberContainer(container, value);

    app.stage.addChild(container);

    return {
        startAnimation,
        stopAnimation
    }
}