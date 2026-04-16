/**
 * Perceptual color utility to extract average color from an image.
 * Mimics the logic of 'fast-average-color' using the browser's Canvas API.
 */

export type RgbColor = [number, number, number];

export interface ColorResult {
  rgb: RgbColor;
  rgba: string;
  hex: string;
  isDark: boolean;
  isLight: boolean;
}

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

export function getLuminance([r, g, b]: RgbColor): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export async function getAverageColor(
  src: string,
): Promise<ColorResult | null> {
  if (typeof window === 'undefined') return null;

  const image = new window.Image();
  image.crossOrigin = 'anonymous';
  image.decoding = 'async';

  return new Promise((resolve) => {
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return resolve(null);

        // Resize for performance
        const size = 32;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(image, 0, 0, size, size);

        const pixels = ctx.getImageData(0, 0, size, size).data;
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          const alpha = pixels[i + 3];
          if (alpha < 128) continue; // Skip semi-transparent pixels

          r += pixels[i];
          g += pixels[i + 1];
          b += pixels[i + 2];
          count++;
        }

        if (count === 0) return resolve(null);

        const rgb: RgbColor = [
          clampChannel(r / count),
          clampChannel(g / count),
          clampChannel(b / count),
        ];

        const luminance = getLuminance(rgb);

        resolve({
          rgb,
          rgba: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,
          hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
          isDark: luminance < 0.5,
          isLight: luminance >= 0.5,
        });
      } catch {
        resolve(null);
      }
    };
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export function mixColor(
  color: RgbColor,
  target: RgbColor,
  amount: number,
): RgbColor {
  return [
    clampChannel(color[0] + (target[0] - color[0]) * amount),
    clampChannel(color[1] + (target[1] - color[1]) * amount),
    clampChannel(color[2] + (target[2] - color[2]) * amount),
  ];
}

export function withAlpha(color: RgbColor, alpha: number): string {
  return `rgba(${color[0]} ${color[1]} ${color[2]} / ${alpha})`;
}
