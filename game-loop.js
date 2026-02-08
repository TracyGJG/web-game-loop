export default (motionInc, BOXES, ctx, canvas, LOOP) => {
  const CANVAS_STEPS = 60;
  const BOX_WIDTH = canvas.width / CANVAS_STEPS;
  const BOX_HEIGHT = canvas.height / BOXES.length;
  const boxes = BOXES.map(({ speed, pos }) => ({
    speed,
    pos: pos * motionInc,
  }));

  let stepCount = 0;

  function updateState() {
    let stateChanged = [];
    boxes.forEach(({ speed, pos }, idx) => {
      const step = stepCount % speed;

      if (!step) {
        stateChanged.push(speed);
        boxes[idx].pos = (pos += motionInc) % 60;
      }
    });
    return stateChanged.join();
  }

  function draw(timestamp) {
    const updateCount = updateState();
    if (updateCount) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      boxes.forEach(({ pos }, idx) => {
        ctx.fillStyle = `oklch(50% 100% ${idx * 30}deg)`;
        ctx.fillRect(pos * BOX_WIDTH, idx * BOX_HEIGHT, BOX_WIDTH, BOX_HEIGHT); // x,y,w,h
      });
    }
    const dateNow = Date();
    $timestamp.textContent = timestamp;
    $stepCount.textContent = `${stepCount} (${stepCount % CANVAS_STEPS})`;
    $dateNow.textContent = dateNow;
    $updateCount.textContent = updateCount;
    console.log(
      `${timestamp}`.padStart(8),
      `${stepCount}`.padStart(5),
      // `${dateNow}`.padStart(56),
      `${updateCount}`.padStart(30),
    );
    stepCount++;
    (LOOP || stepCount < (CANVAS_STEPS - 1 + motionInc) / motionInc) &&
      requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
};
