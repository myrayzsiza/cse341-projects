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

    // Normalize and insert (upsert by temple_id)
    for (const item of templesJson) {
      const doc = {
        temple_id: Number(item.temple_id) || Number(item.id) || undefined,
        name: item.name || item.title || '',
        location: item.location || '',
        dedicated: item.dedicated || '',
        region: item.region || item.state || '',
        country: item.country || 'Unknown',
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
