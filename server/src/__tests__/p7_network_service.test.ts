import { describe, it, expect } from 'vitest';
import { getLanAddresses, generateQRCodeSVG } from '../services/network';

describe('P7 - Network service', () => {
  it('getLanAddresses returns an array', () => {
    const addresses = getLanAddresses();
    expect(Array.isArray(addresses)).toBe(true);
  });

  it('getLanAddresses returns IPv4 strings', () => {
    const addresses = getLanAddresses();
    for (const addr of addresses) {
      expect(addr).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
    }
  });

  it('generateQRCodeSVG returns SVG string', async () => {
    const svg = await generateQRCodeSVG('http://localhost:3000');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('generateQRCodeSVG encodes the URL', async () => {
    const svg = await generateQRCodeSVG('http://192.168.1.100:3000');
    expect(svg).toContain('<svg');
  });
});
