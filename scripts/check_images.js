const fs = require('fs');
const path = require('path');

function getJpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const len = buffer.readUInt16BE(offset + 2);
    offset += 2 + len;
  }
  return null;
}

const dir = path.join(__dirname, '../public/companies');
['company_a.jfif', 'company_b.jfif', 'be_logo_lockups_simplified.png'].forEach(f => {
  const buf = fs.readFileSync(path.join(dir, f));
  if (f.endsWith('.jfif')) {
    console.log(f, getJpegSize(buf));
  } else {
    // png width/height at offset 16
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    console.log(f, { width, height });
  }
});
