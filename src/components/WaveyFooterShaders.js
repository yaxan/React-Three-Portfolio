export const vertexShader = `
attribute vec4 position;

void main() {
  gl_Position = vec4(position);
}
`;

export const fragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec2 random2(vec2 st){
  st = vec2( dot(st,vec2(127.1,311.7)),
             dot(st,vec2(269.5,183.3)) );
  return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

vec3 getColor(float height) {
    vec3 color1 = vec3(0.0, 0.0, 0.0);
    vec3 color2 = vec3(0.1, 0.03, 0.2);  // Dark blue with a hint of violet
    vec3 color3 = vec3(0.1, 0.1, 0.4);    // Medium blue-violet
    vec3 color4 = vec3(0.4, 0.2, 0.7);    // Light blue-violet with a touch of purple
    vec3 color5 = vec3(1, 0.7, 0.6);    // Bright blue-violet with more purple


    if (height < 0.25) {
        return mix(color1, color2, height * 4.0);
    } else if (height < 0.5) {
        return mix(color2, color3, (height - 0.25) * 4.0);
    } else if (height < 0.75) {
        return mix(color3, color4, (height - 0.5) * 4.0);
    } else {
        return mix(color4, color5, (height - 0.75) * 4.0);
    }
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  float waveOffset = 0.3;
  float waveCenter = 1.;
  float waveFocus = 0.2;
  float waveSpeed = 2.;

  float wMin = waveCenter - waveFocus;
  float wMax = waveCenter + waveFocus;

  uv.x *= u_resolution.x/u_resolution.y;
  uv.x += 1787.74328;
  uv.y *= 2.;

  float lowFreqNoise = noise( vec2(uv.x, u_time / waveSpeed));
  float highFreqNoise = 0.5 * noise( vec2(uv.x * 3.0, u_time / (waveSpeed * 0.5)));
  float rn = lowFreqNoise + highFreqNoise;
  float ry = uv.y - rn;
  float r = smoothstep(wMin, wMax, ry);
  
  float bn = noise( vec2(uv.x, u_time / waveSpeed - waveOffset));
  float by = uv.y - bn;
  float b = smoothstep(wMin, wMax, by);
  
  float gn = noise( vec2(uv.x, u_time / waveSpeed + waveOffset));
  float gy = uv.y - gn;
  float g = smoothstep(wMin, wMax, gy);
  
  float waveHeight = (r + b + g) / 3.0;
  
  vec3 color = getColor(waveHeight);
  float alpha = 1.0 - min(min(r, b), g);
  
  gl_FragColor = vec4(color, alpha);
  }
  `;
