import { useEffect, useRef } from "react";

const VERT_SRC = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface PlasmaShaderProps {
  className?: string;
}

export function PlasmaShader({ className }: PlasmaShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false });
    if (!gl) return;

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fragSrc = `
      precision highp float;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uIntensity;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
        
        // Aspect-corrected pointer position
        vec2 ptr = (uPointer * 2.0 - 1.0) * vec2(uResolution.x / min(uResolution.x, uResolution.y), uResolution.y / min(uResolution.x, uResolution.y));
        
        // Distance to pointer for soft subtle illumination only (no coordinate distortion)
        float dist = length(p - ptr);

        // Smooth flowing harmonic silk waves
        float t = uTime * 0.18;

        float w1 = sin(p.x * 1.5 + t * 0.5) * cos(p.y * 1.3 - t * 0.4);
        float w2 = sin(p.x * 1.1 - p.y * 1.2 + t * 0.6);
        float w3 = cos(length(p * 0.9) * 1.6 - t * 0.45);
        
        float baseWave = (w1 + w2 + w3) / 3.0; // -1.0 to 1.0
        float normWave = clamp(baseWave * 0.5 + 0.5, 0.0, 1.0);

        // Luminous Purple Spectrum
        vec3 colDeepViolet = vec3(0.42, 0.14, 0.72); // Deep rich royal purple
        vec3 colAmethyst   = vec3(0.58, 0.24, 0.84); // Radiant amethyst
        vec3 colMagenta    = vec3(0.76, 0.34, 0.90); // Vibrant magenta-purple
        vec3 colLavender   = vec3(0.88, 0.64, 0.96); // Soft luminous lavender
        vec3 colHighlight  = vec3(0.98, 0.92, 1.00); // Silk glint

        vec3 color = mix(colDeepViolet, colAmethyst, smoothstep(0.05, 0.40, normWave));
        color = mix(color, colMagenta, smoothstep(0.35, 0.70, normWave));
        color = mix(color, colLavender, smoothstep(0.65, 0.92, normWave));
        color = mix(color, colHighlight, smoothstep(0.88, 1.0, normWave) * 0.45);

        // Soft, harmonious brightness boost where the mouse is
        float pointerIllumination = exp(-dist * dist * 3.5) * uIntensity;
        // Gently brighten the base colors in harmony with the palette
        color += (colLavender * 0.45 + colHighlight * 0.35) * pointerIllumination;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
    if (!vert || !frag) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let targetPointer = { x: 0.5, y: 0.5 };
    let currentPointer = { x: 0.5, y: 0.5 };
    let targetIntensity = 0.0;
    let currentIntensity = 0.0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      targetPointer = { x, y };
      targetIntensity = 1.0;
    };

    const onPointerLeave = () => {
      targetIntensity = 0.0;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    let raf = 0;
    const start = performance.now();
    const draw = () => {
      // Smooth interpolation for mouse spotlight
      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.1;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.1;
      currentIntensity += (targetIntensity - currentIntensity) * 0.06;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) * 0.001);
      gl.uniform2f(uPointer, currentPointer.x, currentPointer.y);
      gl.uniform1f(uIntensity, currentIntensity);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}
