require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

const templesDataPath = path.join(__dirname, 'temples.json');
if (!fs.existsSync(templesDataPath)) {
  console.error('temples.json not found');
  process.exit(1);
}

const templesJson = JSON.parse(fs.readFileSync(templesDataPath, 'utf8'));

async function run() {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding.');

    const TempleSchema = new mongoose.Schema({
      temple_id: Number,
      name: String,
      location: String,
      dedicated: String,
      region: String,
      country: String,
      history: String,
      additionalInfo: Boolean,
    }, { timestamps: true });

    const Temple = mongoose.model('temples', TempleSchema);

    const usStates = new Set([
      'alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware',
      'florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana',
      'maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana',
      'nebraska','nevada','new hampshire','new jersey','new mexico','new york','north carolina',
      'north dakota','ohio','oklahoma','oregon','pennsylvania','rhode island','south carolina','south dakota',
      'tennessee','texas','utah','vermont','virginia','washington','west virginia','wisconsin','wyoming',
      'district of columbia','dc'
    ]);
    const knownCountries = new Set([
      'united states','united states of america','usa','us','canada','mexico','brazil','argentina','colombia',
      'chile','peru','ecuador','uruguay','bolivia','paraguay','venezuela','australia','new zealand','india',
      'china','japan','south korea','north korea','russia','germany','france','spain','italy','portugal',
      'belgium','netherlands','switzerland','austria','sweden','norway','finland','denmark','ireland',
      'united kingdom','uk','england','scotland','wales','northern ireland','south africa','madagascar',
      'nigeria','kenya','egypt','morocco','tunisia','saudi arabia','united arab emirates','qatar','oman',
      'czech republic','costa rica','dominican republic','jamaica','bahamas','panama','guatemala','honduras',
      'el salvador','nicaragua','cuba'
    ]);

    const normalizeCountryToken = (token) => {
      if (!token) return undefined;
      const cleaned = token.trim().replace(/\.+$/, '').toLowerCase();
      if (!cleaned) return undefined;
      if (usStates.has(cleaned)) return 'United States';
      if (cleaned === 'usa' || cleaned === 'us') return 'United States';
      if (cleaned === 'uk') return 'United Kingdom';
      if (cleaned === 'uae') return 'United Arab Emirates';
      if (cleaned === 'mexico' || cleaned === 'méxico') return 'Mexico';
      if (knownCountries.has(cleaned)) return cleaned.split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
      return token.trim();
    };

    const extractCountry = (text) => {
      if (!text || typeof text !== 'string') return undefined;
      const cleanedText = text.replace(/\bTemple\b/i, '').replace(/\s+Temple$/i, '').trim();
      if (/location not available|announced|construction/i.test(cleanedText)) return undefined;
      const parts = cleanedText.split(',').map((p) => p.trim()).filter(Boolean);
      if (parts.length === 0) return undefined;
      const last = parts[parts.length - 1];
      const token = last.split(/\s+/).slice(-2).join(' ');
      if (knownCountries.has(token.toLowerCase())) return normalizeCountryToken(token);
      return normalizeCountryToken(last);
    };

    // Normalize and insert (upsert by temple_id)
    for (const item of templesJson) {
      const inferredCountry = extractCountry(item.location) || extractCountry(item.name);
      const doc = {
        temple_id: Number(item.temple_id) || Number(item.id) || undefined,
        name: item.name || item.title || '',
        location: item.location || '',
        dedicated: item.dedicated || '',
        region: item.region || item.state || '',
        country: item.country || inferredCountry || 'Unknown',
        history: item.history || '',
        additionalInfo: item.additionalInfo ?? false,
      };

      if (!doc.temple_id) continue;

      await Temple.findOneAndUpdate({ temple_id: doc.temple_id }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
      console.log(`Upserted temple ${doc.temple_id} - ${doc.name}`);
    }

    console.log('Seeding complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

run();
