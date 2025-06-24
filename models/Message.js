import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  userId: String,
  text: String,
  reply: String,
  intent: String,
  entities: Array,
  timestamp: { type: Date, default: Date.now }
});

export default model('Message', messageSchema);