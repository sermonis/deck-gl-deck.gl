export default `\
attribute vec3 positions;
attribute float weights;
varying vec4 weightsTexture;
uniform float radiusPixels;
uniform float textureWidth;
uniform vec4 commonBounds;
uniform float intensity;
void main()
{
  weightsTexture = vec4(weights * intensity, 0., 0., 1.);

  float radiusTexels  = radiusPixels * textureWidth / (commonBounds.z - commonBounds.x);
  gl_PointSize = radiusTexels * 2.;

  // TODO: do we need 64 bit projection?
  vec3 commonPosition = project_position(positions, vec2(0));
  // gl_Position = vec4(commonPosition, 1.);

  gl_Position.xy = (commonPosition.xy - commonBounds.xy) / (commonBounds.zw - commonBounds.xy) ;
  gl_Position.xy = (gl_Position.xy * 2.) - (1.);

  //
  // // clip space projection
  // gl_Position = project_position_to_clipspace(positions, vec2(0, 0), vec3(0, 0, 0));

  // HACK
  // gl_Position = vec4(0, 0, 0, 1.);
  // gl_PointSize = 100.;
}
`;
