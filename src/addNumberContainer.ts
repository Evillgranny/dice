import {Container, EventEmitter, Graphics, Text, Ticker} from "pixi.js";

export const addNumberContainer = (container: Container, value: number[]) => {
    const texts: Text[] = [];
    const width = container.width;
    const height = container.height;
    const blockWidth = width / 5;
    const gap = (width - (blockWidth * 4)) / 3;
    const tickers: Ticker[] = [];
    const eventEmitter = new EventEmitter();

    value.forEach((item, index) => {
        const numberContainer = new Container({
            width: blockWidth,
            height: height,
            x: index * (blockWidth + gap),
            y: 0,
        });

        const numberGraphics = new Graphics()
            .roundRect(0, 0, blockWidth, height, 20)
            .fill(0x0000FF);

        numberContainer.mask = numberGraphics;
        numberContainer.addChild(numberGraphics);

        const text=  new Text(item, {
            fontSize: blockWidth,
            fill: 0xFFFFFF,
            align: 'center',
        });

        text.anchor.set(0.5);
        text.x = blockWidth / 2;
        text.y = height / 2;

        texts.push(text);

        numberContainer.addChild(text);

        container.addChild(numberContainer);
    })

    const startAnimation = () => {
        texts.forEach((item, index) => {
            const ticker = new Ticker();
            let currentValue = parseInt(item.text);
            let newValue = (currentValue + 1) % 10;
            let isAnimating = false;

            ticker.add(() => {
                if (!isAnimating) {
                    isAnimating = true;
                    const newText = new Text(newValue.toString(), {
                        fontSize: item.style.fontSize,
                        fill: item.style.fill,
                        align: item.style.align,
                    });

                    newText.anchor.set(0.5);
                    newText.x = item.x;
                    newText.y = -height / 2;

                    item.parent.addChild(newText);

                    const slideDown = () => {
                        newText.y += 24;
                        item.y += 24;

                        if (newText.y >= height / 2) {
                            ticker.remove(slideDown);
                            item.text = newValue.toString();
                            item.y = height / 2;
                            newText.destroy();
                            currentValue = newValue;
                            newValue = (currentValue + 1) % 10;
                            isAnimating = false;
                            eventEmitter.emit('textChanged', index, item.text);
                        }
                    };

                    ticker.add(slideDown);
                }
            });

            ticker.start();
            tickers.push(ticker);
        })
    }

    const stopAnimation = (targetNumber: number) => {
        const targetString = targetNumber.toString().padStart(4, '0');
        let counter = 0;
        const checkAndStop = (index: number, text: string) => {
            console.log('aaaa', index, text);
            if (text === targetString[index]) {
                tickers[index].stop();
                counter++
                if (counter === 4) {
                    eventEmitter.removeListener('textChanged', checkAndStop);
                }
            }
        };

        eventEmitter.on('textChanged', checkAndStop);
    }

    return {
        startAnimation,
        stopAnimation
    }
}