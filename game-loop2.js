export default (canvas, ctx, BOXES, LOOP, motionInc) => {
  // const FIXED_DT = 1 / 60; Use ms not sec
  // const DROP_INTERVAL = 0.5; Use motionInc
  const FIXED_DT = 1000 / 60;
  const CANVAS_STEPS = 60;
  const BOX_WIDTH = canvas.width / CANVAS_STEPS;
  const BOX_HEIGHT = canvas.height / BOXES.length;
  const boxes = BOXES.map(({ speed }) => ({
    speed: Math.floor(60 / speed),
    pos: 0,
  }));

  // let lastTime = performance.now() / 1000; Use timeStamp in ms
  // let accumulator = 0;
  // let dropTimer = 0; Use stepCounter
  let timeStamp = performance.now();
  let accumulator = 0;
  let stepCounter = 0;

  // render() { }
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach(({ pos }, idx) => {
      ctx.fillStyle = `oklch(50% 100% ${idx * 30}deg)`;
      ctx.fillRect(pos * BOX_WIDTH, idx * BOX_HEIGHT, BOX_WIDTH, BOX_HEIGHT); // x,y,w,h
    });
  }

  // updateGame(FIXED_DT) {
  function updateGame() {
    boxes.forEach(({ speed, pos }, idx) => {
      const step = stepCounter % speed;

      // if (dropTimer >= DROP_INTERVAL) {
      if (!step) {
        //   move teris block down cell
        boxes[idx].pos = (pos + motionInc) % CANVAS_STEPS;
        // }
      }
      console.log(idx, step, boxes[idx]);
    });

    // dropTimer += FIXED_DT;
    stepCounter++;
  }

  // frame() {
  function frame(now) {
    // const now = performance.now() / 1000; Use arg `now` in ms
    // let delta = now - lastTime;
    const delta = now - timeStamp;
    // lastTime = now;
    timeStamp = now;
    // accumulator += delta;
    accumulator += delta;

    // while (accumulator >= FIXED_DT) {
    while (accumulator >= FIXED_DT) {
      console.log('Delta:', delta, 'Acc:', accumulator);
      // updateGame(FIXED_DT);
      updateGame();
      // accumulator -= FIXED_DT;
      accumulator -= FIXED_DT;
    }

    // render();
    render();
    // raf(frame);
    (LOOP || stepCounter < (CANVAS_STEPS - 1) / motionInc) &&
      requestAnimationFrame(frame);
  }

  // raf(frame);
  requestAnimationFrame(frame);
};
