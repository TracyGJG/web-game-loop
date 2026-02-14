# web-game-loop

Experiment in animating game pieces in a canvas using JS in the browser.

## rapid.html

- full piece movement
- full speed movement

## smooth.html

- quarter-width movement
- quarter-speed movement

## The Game Loop

The `draw` function is called with every execution of the `requestAnimationFrame` (rAF) call. RAF is performed repeatedly without affecting the primary thread execution by hooking into the browsers repaint processing.

The `draw` function is passed the latest time stamp (in milliseconds) since execution commenced. Whilest the rate of RAF execution will vary with the processor's clock speed the value it passes `draw` does not. If we want to update the screen 60 times frames a second we first calculate how long 60fps is in milliseconds (1000ms / 60fps = 16.66ms.)
