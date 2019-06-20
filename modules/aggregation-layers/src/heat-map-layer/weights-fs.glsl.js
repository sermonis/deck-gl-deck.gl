export default `\
varying vec4 weightsTexture;
// uniform float radiusPixels;
float gaussianKDE(float u){
  return pow(2.71828, -u*u/0.05555)/(1.77245385*0.166666);
}
float epanechnikovKDE(float u) {
  return 0.75 * (1.0 - u * u);
}
void main()
{
  // if (outTexture.r + outTexture.g + outTexture.b == 0.) {
  //   discard;
  // }
  float dist = length(gl_PointCoord - vec2(0.5, 0.5));
  if (dist > 0.5) {
    discard;
  }
  // gl_FragColor.rgb = weightsTexture.rgb * (0.5 - dist);
  gl_FragColor.rgb = weightsTexture.rgb * gaussianKDE(2. * dist);
  // transform_output.rgb = outTexture.rgb * epanechnikovKDE(2. * dist);
  gl_FragColor.a = 1.0;

  //_HACK
  // gl_FragColor.r = 10.;
}
`;
