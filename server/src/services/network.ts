import os from 'os';
import QRCode from 'qrcode';

export function getLanAddresses(): string[] {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];
  for (const name of Object.keys(interfaces)) {
    const ifaces = interfaces[name];
    if (!ifaces) continue;
    for (const iface of ifaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

export async function generateQRCodeSVG(url: string): Promise<string> {
  return QRCode.toString(url, { type: 'svg', width: 256, margin: 1 });
}
