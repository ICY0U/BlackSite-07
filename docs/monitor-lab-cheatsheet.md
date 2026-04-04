# Monitor Lab Cheatsheet

This file tracks the tweakable values for the CRT monitor scene in [../src/components/monitor/MonitorLabClient.tsx](../src/components/monitor/MonitorLabClient.tsx).

Update this file whenever the live tuning values change.

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
  keyboardPosition: [0, -1.075, 0.9] as const,
  keyboardScale: 4.2,
  keyboardRotation: [0, 0, 0] as const,
  modelPosition: [0, -0.5, 0] as const,
  modelScale: 0.8,
  modelRotationY: Math.PI,
  overlayRotationY: Math.PI,
  cameraPosition: [0, 0.5, 2.3] as const,
  cameraFov: 37.5,
  orbitTarget: [0, -0.14, 0] as const,
  orbitMinDistance: 1.35,
  orbitMaxDistance: 4.8,
  orbitMinPolarAngle: Math.PI / 4.6,
  orbitMaxPolarAngle: Math.PI / 1.72,
};
```

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