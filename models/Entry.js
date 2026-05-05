const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
    min: 1
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Auto-calculate total before saving
entrySchema.pre('save', function (next) {
  this.total = this.no * 108;
  next();
});

module.exports = mongoose.model('Entry', entrySchema);
