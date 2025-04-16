const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
  },
  leads: {
    type: [String],
    required: [true, 'Leads array is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Leads array must not be empty'
    }
  },
  accountIDs: {
    type: [String],
    required: [true, 'AccountIDs array is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'AccountIDs array must not be empty'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
campaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign; 