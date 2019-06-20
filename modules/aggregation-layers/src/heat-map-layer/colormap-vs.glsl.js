export default `\
attribute vec4 weightsTexture;
varying vec4 outTexture;
uniform sampler2D maxWeightsTexture;
uniform sampler2D colorTexture;

vec4 getLinearColor(float value, float maxValue) {
  // bool veryClose = abs(maxValue - value) < CLOSENESS;
  float factor = clamp(value/(maxValue), 0., 1.);
  float s = factor; // 0.5;
  float t = 0.5;
  vec4 color = texture2D(colorTexture, vec2(s, t)) / 255.;
  color.a = clamp(5. * factor, 0., 1.);
  // color = vec4(factor, factor, 0., 1.);
  return color;
}

void main()
{
  float maxWeight = texture2D(maxWeightsTexture, vec2(0.5)).r;
  float weight = weightsTexture.r;
  vec4 linearColor = getLinearColor(weight, maxWeight);
  outTexture = linearColor;
  // outTexture = vec4(weight, 0, 0, 0.25);;

  // float factor = weightsTexture.r / maxValue;
  // outTexture = vec4(factor, 0, 0, 1.);
  // TODO perform weight color map.
}
`;
