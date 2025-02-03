//Animation sev

let mods = [];
let animationRunning = false;
let winter = false;
let spring = false;
let summer = false;
let autumn = false;

class Module {
    constructor(xOff, yOff, x, y, speed, unit) {
        this.xOff = xOff;
        this.yOff = yOff;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.unit = unit;
        this.xDir = 1;
        this.yDir = 1;
    }

    update() {
        this.x = this.x + this.speed * this.xDir;
        if (this.x >= this.unit || this.x <= 0) {
            this.xDir *= -1;
            this.x = this.x + 1 * this.xDir;
            this.y = this.y + 1 * this.yDir;
        }
        if (this.y >= this.unit || this.y <= 0) {
            this.yDir *= -1;
            this.y = this.y + 1 * this.yDir;
        }
    }

    draw() {
        ellipse(this.xOff + this.x, this.yOff + this.y, 14, 14);
    }
}

function setup() {
    let animationContainer = select('.animation_container_1');
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(animationContainer);

    noStroke();
    let wideCount = width / 40;
    let highCount = height / 40;
    let count = wideCount * highCount;

    let index = 0;
    for (let y = 0; y < highCount; y++) {
        for (let x = 0; x < wideCount; x++) {
            mods[index++] = new Module(
                x * 40,
                y * 40,
                40 / 2,
                40 / 2,
                random(0.01, 0.6),
                40
            );
        }
    }

    //Animation only

    let animationContainer2 = select('.animation_container_2');
    let canvas2 = createCanvas(windowWidth, windowHeight);
    canvas2.parent(animationContainer2);

    frameRate(30);

    let circles = [];
    let numRows = 20;
    let circleMargin = 30;
    let animationRunning2 = false;

    let maxWidth = width - 2 * circleMargin;
    let circlesPerRow = Math.floor(maxWidth / 30);

    class Circle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.diameter = random(10, 30);
            this.targetDiameter = this.diameter;
            this.speed = random(0.3, 0.6);
            this.growing = random([true, false]);
        }

        update() {
            if (this.growing) {
                this.targetDiameter += this.speed;
                if (this.targetDiameter > 30) {
                    this.growing = false;
                }
            } else {
                this.targetDiameter -= this.speed;
                if (this.targetDiameter < 5) {
                    this.growing = true;
                }
            }
            this.diameter = lerp(this.diameter, this.targetDiameter, 0.3);
        }

        draw() {
            noStroke();
            strokeWeight(1);
            ellipse(this.x, this.y, this.diameter, this.diameter);
        }
    }

    let circleSpacingX = (width - 2 * circleMargin) / (circlesPerRow - 1);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < circlesPerRow; col++) {
            let x = circleMargin + col * circleSpacingX;
            let y = (height / (numRows + 1)) * (row + 1);
            circles.push(new Circle(x, y));
        }
    }

    draw = function () {
        background(239);
        if (animationRunning) {
            for (let i = 0; i < count; i++) {
                mods[i].update();
                if (winter) {
                    fill(84, 222, 231);
                }
                if (spring) {
                    fill(227, 18, 131);
                }
                if (summer) {
                    fill(129, 233, 164);
                }
                if (autumn) {
                    fill(255, 220, 94);
                }
                mods[i].draw();
            }
        }

        if (animationRunning2) {
            for (let i = 0; i < circles.length; i++) {
                circles[i].update();
                if (winter) {
                    fill(84, 222, 231);
                }
                if (spring) {
                    fill(227, 18, 131);
                }
                if (summer) {
                    fill(129, 233, 164);
                }
                if (autumn) {
                    fill(255, 220, 94);
                }
                circles[i].draw();
            }
        }
    };

    // Animation on hover

    $(document).ready(function () {

        $('.winter').hover(
            function () {
                if (!animationRunning && !animationRunning2) {
                    winter = true;
                }
            },
            function () {
                winter = false;
            }
        );

        $('.spring').hover(
            function () {
                if (!animationRunning && !animationRunning2) {
                    spring = true;
                }
            },
            function () {
                spring = false;
            }
        );

        $('.summer').hover(
            function () {
                if (!animationRunning && !animationRunning2) {
                    summer = true;
                }
            },
            function () {
                summer = false;
            }
        );

        $('.autumn').hover(
            function () {
                if (!animationRunning && !animationRunning2) {
                    autumn = true;
                }
            },
            function () {
                autumn = false;
            }
        );

        $('.several').on('mouseenter click', function () {
            if (!animationRunning2) {
                animationRunning = true;
            }
        });

        $('.several').on('mouseleave', function () {
            if (!$('.desScan').hasClass('popupOn')) {
                animationRunning = false;
            }
        });

        $('.only').on('mouseenter click', function () {
            if (!animationRunning) {
                animationRunning2 = true;
            }
        });

        $('.only').on('mouseleave', function () {
            if (!$('.desScan').hasClass('popupOn')) {
                animationRunning2 = false;
            }
        });

        $('.close').click(function () {
            animationRunning = false;
            animationRunning2 = false;
        });

    });

}
