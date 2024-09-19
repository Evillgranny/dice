import { Application, Container, Graphics } from "pixi.js";

export const addButton = (app: Application, clickCallBack: () => void)  => {
    const buttonContainer = new Container({
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        eventMode: 'static'
    });

    const graphics = new Graphics()
        .rect(0, 0, 100, 100)
        .fill(0x000000)

    buttonContainer.on('pointerdown', () => {
        clickCallBack();
    })

    buttonContainer.addChild(graphics);
    app.stage.addChild(buttonContainer);
}