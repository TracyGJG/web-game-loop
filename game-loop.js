export default (motionInc, BOXES, ctx, canvas, LOOP) => {
  const CANVAS_STEPS = 60;
  const BOX_WIDTH = canvas.width / CANVAS_STEPS;
  const BOX_HEIGHT = canvas.height / BOXES.length;
  const boxes = BOXES.map(({ speed, pos }) => ({
    speed: Math.floor(60 / speed),
    pos: pos * motionInc,
  }));
  const TIME_DELTA = Math.floor(1000 / 60 /* fps */);
  let timeStamp = performance.now();
  let stepCount = 0;

  function updateState() {
    let stateChanged = [];
    boxes.forEach(({ speed, pos }, idx) => {
      const step = stepCount % speed;

      if (!step) {
        stateChanged.push(speed);
        boxes[idx].pos = (pos += motionInc) % CANVAS_STEPS;
      }
    });
    return stateChanged.join();
  }

  function draw(timestamp) {
    const timeDelta = Math.floor(timestamp - timeStamp);
    const multiple = Math.floor(timeDelta / TIME_DELTA);
    if (multiple) {
      var updateCount = updateState();
      if (updateCount) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        boxes.forEach(({ pos }, idx) => {
          ctx.fillStyle = `oklch(50% 100% ${idx * 30}deg)`;
          ctx.fillRect(
            pos * BOX_WIDTH,
            idx * BOX_HEIGHT,
            BOX_WIDTH,
            BOX_HEIGHT,
          ); // x,y,w,h
        });
      }
    } else {
      var updateCount = '';
    }
    const dateNow = Date();
    $timestamp.textContent = timestamp;
    $stepCount.textContent = `${stepCount} (${stepCount % CANVAS_STEPS})`;
    $dateNow.textContent = dateNow;
    $updateCount.textContent = updateCount;
    stepCount += multiple;
    console.log(
      `${timestamp}`.padStart(8),
      `${timeDelta}`.padStart(5),
      `${timeStamp}`.padStart(8),
      `${stepCount}`.padStart(5),
      `${updateCount}`.padStart(30),
      `${dateNow}`.padStart(56),
    );

    multiple && (timeStamp = timestamp);

    (LOOP || stepCount < CANVAS_STEPS / motionInc) &&
      requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
};
