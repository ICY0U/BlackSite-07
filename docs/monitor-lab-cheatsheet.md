# Monitor Lab Cheatsheet

This file tracks the tweakable values for the CRT monitor scene in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx) and the breach/login flow in [../src/app/page.tsx](../src/app/page.tsx) and [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx).

Update this file whenever the live tuning values, breach timing, or on-screen copy change.

## Where To Edit Things

- Main tuning values live in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
- Screen-fit math is applied in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L91).
- Power-button hit target placement is calculated in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L104).
- Screen power-state material is set in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L117).
- LED power-state material is set in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L128).
- Overlay height is derived in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L137).
- The monitor group's live transform is used in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L172).
- The Html screen overlay render is in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L180).
- The power-button click handler is on [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L217).
- Keyboard model loading and shadow setup are in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L239).
- Keyboard placement in the scene is applied in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L260).
- Camera settings are applied in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L272).
- Orbit control settings are applied in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L297).
- Breach trigger chance lives in [../src/app/page.tsx](../src/app/page.tsx#L13).
- Breach phase handoff is in [../src/app/page.tsx](../src/app/page.tsx#L18).
- Breach alert copy lives in [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L20).
- Breach shutdown copy lives in [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L40).
- Breach sequence timing lives in [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L69).
- Breach animation CSS lives in [../src/app/globals.css](../src/app/globals.css#L273).

## Primary Tuning Block

Current source of truth: [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34)

```ts
const MONITOR_TUNING = {
  screenPixelWidth: 960,
  screenOffsetX: 0,
  screenOffsetY: 0,
  screenDepthOffset: -0.0001,
  screenWidthScale: -1,
  screenHeightScale: -1,
  htmlDistanceFactor: 0.415,
  powerButtonXRatio: 0.93,
  powerButtonYOffset: 0,
  powerButtonDepthOffset: -0.02,
  powerButtonHitRadius: 0.065,
  keyboardPosition: [0, -0.5, 0.9] as const,
  keyboardScale: 4.2,
  keyboardRotation: [0, 0, 0] as const,
  modelPosition: [0, -0.5, 0] as const,
  modelScale: 0.8,
  modelRotationY: Math.PI,
  overlayRotationY: Math.PI,
  cameraPosition: [0, 0.6, 3.0] as const,
  cameraFov: 32.5,
  orbitTarget: [0, -0.14, 0] as const,
  orbitMinDistance: 1.35,
  orbitMaxDistance: 4.8,
  orbitMinPolarAngle: Math.PI / 4.6,
  orbitMaxPolarAngle: Math.PI / 1.72,
};
```

## Direct Monitor Value Links

Each link below jumps straight to the live value in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).

### Screen Overlay Fit

- `screenPixelWidth = 960` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L35)
- `screenOffsetX = 0` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L36)
- `screenOffsetY = 0` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L37)
- `screenDepthOffset = -0.0001` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L38)
- `screenWidthScale = -1` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L39)
- `screenHeightScale = -1` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L40)
- `htmlDistanceFactor = 0.415` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L41)

### Power Button Interaction

- `powerButtonXRatio = 0.93` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L42)
- `powerButtonYOffset = 0` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L43)
- `powerButtonDepthOffset = -0.02` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L44)
- `powerButtonHitRadius = 0.065` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L45)

### Monitor Transform

- `modelPosition = [0, -0.5, 0]` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L49)
- `modelScale = 0.8` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L50)
- `modelRotationY = Math.PI` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L51)
- `overlayRotationY = Math.PI` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L52)

### Keyboard Placement

- `keyboardPosition = [0, -0.5, 0.9]` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L46)
- `keyboardScale = 4.2` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L47)
- `keyboardRotation = [0, 0, 0]` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L48)

### Camera and Orbit

- `cameraPosition = [0, 0.6, 3.0]` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L53)
- `cameraFov = 32.5` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L54)
- `orbitTarget = [0, -0.14, 0]` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L55)
- `orbitMinDistance = 1.35` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L56)
- `orbitMaxDistance = 4.8` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L57)
- `orbitMinPolarAngle = Math.PI / 4.6` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L58)
- `orbitMaxPolarAngle = Math.PI / 1.72` — [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L59)

## Breach Error Reference

These links jump straight to the current breach trigger, text blocks, timings, and animation hooks.

### Trigger and Flow

- `BREACH_CHANCE = 1.0` — [../src/app/page.tsx](../src/app/page.tsx#L13)
- Random breach check — [../src/app/page.tsx](../src/app/page.tsx#L19)
- Breach screen mount — [../src/app/page.tsx](../src/app/page.tsx#L40)
- Return to security after breach — [../src/app/page.tsx](../src/app/page.tsx#L28)

### Breach Text Blocks

- Warning alert lines — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L20)
- Shutdown protocol lines — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L40)
- Cascade error list — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L94)
- BSOD body copy — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L169)
- BSOD stop code — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L193)
- BSOD failed module — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L194)
- Alert header text — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L252)

### Breach Timing Values

- Glitch ramp loop count — `5` iterations — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L71)
- Glitch ramp delay — `300ms` per step — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L74)
- Warning line delay source — each line uses its own `delay` field — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L83)
- Warning-to-cascade pause — `500ms` — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L89)
- Cascade line delay — `100ms` — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L104)
- Cascade-to-shutdown pause — `400ms` — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L108)
- Power-off duration — `1500ms` — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L124)
- BSOD duration — `5000ms` — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L129)
- Reboot fade duration — `800ms` — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L134)
- Skip binding during BSOD/reboot — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L147)

### Breach Animation Hooks

- Main breach animation container — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L214)
- Glitch CSS variable injection — [../src/components/os/BreachError.tsx](../src/components/os/BreachError.tsx#L222)
- Animation CSS index — [../src/app/globals.css](../src/app/globals.css#L273)
- `breach-glitch-jitter` keyframes — [../src/app/globals.css](../src/app/globals.css#L276)
- `.breach-glitch` class — [../src/app/globals.css](../src/app/globals.css#L288)
- `breach-bar-slide` keyframes — [../src/app/globals.css](../src/app/globals.css#L293)
- `.breach-glitch-bar` class — [../src/app/globals.css](../src/app/globals.css#L298)
- `breach-border-flash` keyframes — [../src/app/globals.css](../src/app/globals.css#L303)
- `.breach-border-pulse` class — [../src/app/globals.css](../src/app/globals.css#L307)
- `breach-vignette-pulse` keyframes — [../src/app/globals.css](../src/app/globals.css#L312)
- `.breach-vignette` class — [../src/app/globals.css](../src/app/globals.css#L316)
- `.breach-scroll` class — [../src/app/globals.css](../src/app/globals.css#L322)

## What Each Value Does

### Screen Overlay Fit

Edit these values in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
They are applied by the screen-fit calculation in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L91), the derived height in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L137), and the Html overlay in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L180).

- `screenPixelWidth`
  - Internal width of the Html overlay in pixels.
  - Higher values can make the screen content sharper.
  - This does not directly control the 3D size as much as `htmlDistanceFactor` does.

- `screenOffsetX`
  - Moves the overlay left or right on the screen mesh.
  - Negative moves left.
  - Positive moves right.

- `screenOffsetY`
  - Moves the overlay up or down on the screen mesh.
  - Negative moves down.
  - Positive moves up.

- `screenDepthOffset`
  - Moves the Html layer forward or backward relative to the CRT glass.
  - More negative brings it toward the camera.
  - Values too far forward can make it float off the screen.

- `screenWidthScale`
  - Scales overlay fit horizontally.
  - Use values below `1` if the image clips into the bezel.
  - Use values above `1` for overscan.

- `screenHeightScale`
  - Scales overlay fit vertically.
  - Use values below `1` if the image is too tall.
  - Use values above `1` for overscan.

- `htmlDistanceFactor`
  - Main 3D size control for the Html overlay.
  - Lower makes the overlay bigger.
  - Higher makes the overlay smaller.

### Power Button Interaction

Edit these values in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
They affect the invisible click target built in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L104), the power toggle in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L166), and the clickable mesh in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L217).

- `powerButtonXRatio`
  - Places the power button hit target across the front-button mesh width.
  - `0` is the local minimum X edge of the button row.
  - `1` is the local maximum X edge.
  - With the current 180 degree Y rotation, higher values move the hit target toward the visible left side of the monitor.

- `powerButtonYOffset`
  - Nudges the power button hit target up or down.
  - Use this if the clickable area feels too high or too low.

- `powerButtonDepthOffset`
  - Moves the hit target forward or backward relative to the button mesh front.
  - More negative brings the invisible click target closer to the camera.

- `powerButtonHitRadius`
  - Sets how large the clickable area is.
  - Increase this if the button is hard to click.
  - Decrease it if it overlaps the neighboring buttons.

### Monitor Transform

Edit these values in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
They are applied to the monitor group in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L172) and the Html overlay rotation in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L185).

- `modelPosition`
  - Moves the whole monitor model in the scene.
  - Format: `[x, y, z]`.

- `modelScale`
  - Scales the whole monitor model and the attached screen overlay.

- `modelRotationY`
  - Rotates the entire monitor around the Y axis.
  - `Math.PI` is a 180 degree rotation.

- `overlayRotationY`
  - Rotates only the Html display overlay.
  - Useful if the UI appears mirrored after model rotation.

### Keyboard Placement

Edit these values in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
They are applied to the keyboard primitive in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L260).

- `keyboardPosition`
  - Moves the keyboard model in the scene.
  - Format: `[x, y, z]`.
  - Increase `z` to move the keyboard closer to the camera.
  - Decrease `y` to lower it onto the floor plane.

- `keyboardScale`
  - Scales the entire keyboard model.
  - Increase it if the keyboard feels too small relative to the monitor.

- `keyboardRotation`
  - Rotates the keyboard model.
  - Format: `[x, y, z]` in radians.
  - Useful if the keyboard needs to face the monitor differently or tilt on the floor.

### Camera and Orbit

Edit these values in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
They are applied to the camera in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L272) and to orbit controls in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L297).

- `cameraPosition`
  - Controls the default camera position.
  - Format: `[x, y, z]`.

- `cameraFov`
  - Camera field of view.
  - Lower feels more zoomed in.
  - Higher feels wider.

- `orbitTarget`
  - Point in space that orbit controls focus on.
  - Useful for centering the monitor while rotating around it.

- `orbitMinDistance`
  - Closest zoom distance.

- `orbitMaxDistance`
  - Furthest zoom distance.

- `orbitMinPolarAngle`
  - Highest allowed upward orbit angle.

- `orbitMaxPolarAngle`
  - Lowest allowed downward orbit angle.

## Quick Fix Guide

- Overlay too big
  - Increase `htmlDistanceFactor`.

- Overlay too small
  - Decrease `htmlDistanceFactor`.

- Overlay too far left or right
  - Adjust `screenOffsetX`.

- Overlay too high or low
  - Adjust `screenOffsetY`.

- Overlay sits behind the glass or disappears
  - Make `screenDepthOffset` a bit more negative.

- Overlay looks like it is floating in front of the screen
  - Move `screenDepthOffset` closer to `0`.

- Overlay clips into the bezel horizontally
  - Reduce `screenWidthScale`, for example `0.98` or `0.96`.

- Overlay clips into the bezel vertically
  - Reduce `screenHeightScale`, for example `0.98` or `0.96`.

- Power button is hard to click
  - Increase `powerButtonHitRadius`.

- Power button click area is not aligned with the left button
  - Adjust `powerButtonXRatio`, `powerButtonYOffset`, and `powerButtonDepthOffset`.

- Whole monitor is too small or too large in the scene
  - Adjust `modelScale`.

- Keyboard is too close or too far from the monitor
  - Adjust `keyboardPosition[2]`.

- Keyboard is too high or low
  - Adjust `keyboardPosition[1]`.

- Keyboard is too small or too large
  - Adjust `keyboardScale`.

- Keyboard orientation looks wrong
  - Adjust `keyboardRotation`.

- Camera framing feels off
  - Adjust `cameraPosition`, `cameraFov`, and `orbitTarget` together.

## Recommended Workflow

1. Tune `htmlDistanceFactor` first.
2. Use `screenWidthScale` and `screenHeightScale` to clean up bezel clipping.
3. Use `screenOffsetX` and `screenOffsetY` for final alignment.
4. Use `screenDepthOffset` last to seat the overlay on the glass.
5. Adjust camera values only after the screen fit is correct.

## Notes

- The overlay height is derived automatically from `screenPixelWidth` and the screen mesh aspect ratio.
- The monitor now powers on and off by clicking the left-most front button.
- The keyboard model is loaded from [../public/models/KeyboardFIX.glb](../public/models/KeyboardFIX.glb) and placed in front of the monitor.
- The live values are defined in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx#L34).
- Keep this file in sync with the code when tuning changes are made.