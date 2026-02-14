export default (canvas, ctx, BOXES, LOOP, motionInc) => {
  const CONSTANTS = {
    FIXED_DT: 1000 / 60,
    CANVAS_STEPS: 60,
    BOX_WIDTH: null,
    BOX_HEIGHT: canvas.height / BOXES.length,
    canvas,
    ctx,
    LOOP,
    motionInc,
  };
  CONSTANTS.BOX_WIDTH = canvas.width / CONSTANTS.CANVAS_STEPS;

  function render(boxes, { ctx, canvas, BOX_WIDTH, BOX_HEIGHT }) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach(({ pos }, idx) => {
      ctx.fillStyle = `oklch(50% 100% ${idx * 30}deg)`;
      ctx.fillRect(pos * BOX_WIDTH, idx * BOX_HEIGHT, BOX_WIDTH, BOX_HEIGHT); // x,y,w,h
    });
  }

  function updateGame(gameState, { motionInc, CANVAS_STEPS }) {
    gameState.boxes.forEach(({ speed, pos }, idx) => {
      const step = gameState.stepCounter % speed;

      if (!step) {
        gameState.boxes[idx].pos = (pos + motionInc) % CANVAS_STEPS;
      }
      console.log(idx, step, gameState.boxes[idx]);
    });

    gameState.stepCounter++;
  }

  function frame(gameState, constants) {
    return (now) => {
      const delta = now - gameState.timeStamp;
      gameState.accumulator += delta;

      while (gameState.accumulator >= constants.FIXED_DT) {
        console.log('Delta:', delta, 'Acc:', gameState.accumulator);
        updateGame(gameState, constants);
        gameState.accumulator -= constants.FIXED_DT;
      }

      render(gameState.boxes, constants);
      (constants.LOOP ||
        gameState.stepCounter <
          (constants.CANVAS_STEPS - 1) / constants.motionInc) &&
        requestAnimationFrame(
          frame({ ...gameState, timeStamp: now }, constants),
        );
    };
  }

  requestAnimationFrame(
    frame(
      {
        timeStamp: performance.now(),
        accumulator: 0,
        stepCounter: 0,
        boxes: BOXES.map(({ speed }) => ({
          speed: Math.floor(60 / speed),
          pos: 0,
        })),
      },
      CONSTANTS,
    ),
  );
};
