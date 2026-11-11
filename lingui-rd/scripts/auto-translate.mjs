import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const arPoPath = path.resolve(__dirname, '../src/locales/ar/messages.po');

async function translateText(text) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });
    const data = await res.json();
    if (data?.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
  } catch (err) {
    console.error(`Failed to translate: "${text}"`, err);
  }
  return null;
}

async function autoTranslate() {
  if (!fs.existsSync(arPoPath)) {
    console.error('Arabic messages.po not found at', arPoPath);
    return;
  }

  const content = fs.readFileSync(arPoPath, 'utf8');

  // Match msgid "..." followed by msgstr "" (ignoring header with msgid "")
  const regex = /msgid "([^"\n]+)"\s*\nmsgstr ""/g;
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) {
    console.log('No missing Arabic translations found.');
    return;
  }

  console.log(`Found ${matches.length} missing translation(s). Translating to Arabic...`);

  let updatedContent = content;

  for (const match of matches) {
    const fullMatch = match[0];
    const msgid = match[1];

    console.log(`Translating: "${msgid}"...`);
    const translated = await translateText(msgid);

    if (translated) {
      console.log(`-> Result: "${translated}"`);
      const replacement = `msgid "${msgid}"\nmsgstr "${translated}"`;
      updatedContent = updatedContent.replace(fullMatch, replacement);
    } else {
      console.log(`-> Skipping "${msgid}" (translation failed)`);
    }

    // Small delay between requests to be courteous to the API
    await new Promise((r) => setTimeout(r, 500));
  }

  fs.writeFileSync(arPoPath, updatedContent, 'utf8');
  console.log('Arabic translations successfully updated in messages.po!');
}

autoTranslate();
