# RFC: Spring-Based Tranitions

* **Authors**: Taylor Baldwin
* **Date**: July 2019
* **Status**: **Draft**


## Abstract

[FILL ME IN]

[WHEN ARE SPRING-BASED TRANSITIONS USEFUL]

[TALK ABOUT DOING SPRING-BASED TRANSITIONS ON THE GPU]


## Approach

The current transition API has the user passing a `transitions` property to the layer. This property
is an `Object` which contains a transition config for each attribute name/accessor which should enable
transitions between values. Each transition config contains `duration`, `easing`, and `enter`
values/getters to be used for interpolating the transitioning value during a render. An example:


```js
new Layer({
  transitions: {
    getPositions: 600,
    getColors: {
      duration: 300,
      easing: d3.easeCubicInOut,
      enter: value => [value[0], value[1], value[2], 0], // fade in
      onStart: () => {},
      onEnd: () => {},
      onInterrupt: () => {}
    }
  }
});
```

A spring-based transition, by contrast, accomplishes a transition in an attribute's value not by
interpolation but by using a physics simulation which, in any given frame, relies on (1) the
property's current value, (2) the property's current velocity, and (3) the value the property is
animating towards. The configuration for a spring-based simulation is made up of two constants
which define how the spring moves, namely, `stiffness` and `dampening`. These constants (or sensible
defaults) will need to be provided for each attribute which uses a spring-based transition. An API
for setting such a config could look like this:

```js
new Layer({
  transitions: {
    getPositions: {
      spring: {
        stiffness: 0.001,
        dampening: 0.05
      }
    },
    getColors: {
      spring: {
        stiffness: 0.001,
        dampening: 0.05
      },
      enter: value => [value[0], value[1], value[2], 0], // fade in
      onStart: () => {},
      onEnd: () => {},
      onInterrupt: () => {}
    }
  }
});
```

[SAY SOME STUFF HERE ABOUT `onStart`, `onEnd`, AND `onInterrupt` CALLBACKS]

Note the following change to the `enter` callback:

The `enter` callback receives _one_ argument. A `toValue` (TypedArray) which represents the new value to transition to, for the current vertex. The `fromChunk` value that is supplied to `enter` for interpolation-based transitions is not supplied for spring-based transitions because no "from value" is maintained for the transition. 


## Implementation

[FILL ME IN]
