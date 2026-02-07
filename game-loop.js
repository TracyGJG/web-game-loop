export default (motionInc, BOXES) => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const MAX_FPS = 60;
  const BOX_SIZE = 15;
  const LOOP = false;
  const boxes = BOXES.map(({ speed, pos }) => ({
    speed,
    pos: pos * motionInc,
  }));

  let stepCount = 0;

  function updateState() {
    let stateChanged = [];
    boxes.forEach(({ speed, pos }, idx) => {
      const stepSize = MAX_FPS / speed;
      const step = stepCount % stepSize;

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
      ctx.clearRect(0, 0, 900, 180);
      boxes.forEach(({ pos }, idx) => {
        ctx.fillStyle = `oklch(50% 100% ${idx * 30}deg)`;
        ctx.fillRect(pos * BOX_SIZE, idx * BOX_SIZE, BOX_SIZE, BOX_SIZE); // x,y,w,h
      });
    }
    const dateNow = Date();
    $timestamp.textContent = timestamp;
    $stepCount.textContent = `${stepCount} (${stepCount % MAX_FPS})`;
    $dateNow.textContent = dateNow;
    $updateCount.textContent = updateCount;
    console.log(
      `${timestamp}`.padStart(8),
      `${stepCount}`.padStart(5),
      // `${dateNow}`.padStart(56),
      `${updateCount}`.padStart(30),
    );
    stepCount++;
    (LOOP || stepCount < (MAX_FPS - 1 + motionInc) / motionInc) &&
      requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
};
