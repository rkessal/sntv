export const vertex = `
float PI = 3.14159265359;
varying vec2 vUv;
uniform vec2 uvAspect;
uniform float uDistance;
uniform float uOpacity;

void main() {
  vec2 offset = (vec2(1.0, 1.0) - uvAspect) * 0.5;
  vUv = uvAspect * uv + offset;
  
  vec3 newPosition = position;
  newPosition.x += sin(vUv.y * PI) * (uDistance * 0.005 );

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragment = `
varying vec2 vUv;
uniform sampler2D tMap;

void main() {
  gl_FragColor = texture2D(tMap, vUv);
}
`;
