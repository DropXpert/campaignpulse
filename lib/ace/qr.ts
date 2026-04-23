import QRCode from "qrcode";

export async function generateQrDataUrl(value: string) {
  return QRCode.toDataURL(value, {
    width: 900,
    margin: 1,
    color: {
      dark: "#111827",
      light: "#F8FAFC"
    }
  });
}
