
// const mongoose = require('mongoose');

// const serviceProviderSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   image: String,
//   gallery: [String],
//   rating: {
//     type: Number,
//     default: 0
//   },
//   reviewCount: {
//     type: Number,
//     default: 0
//   },
//   specialties: [String],
//   services: [{
//     name: String,
//     description: String,
//     price: Number
//   }],
//   location: {
//     address: String,
//     city: String,
//     state: String,
//     zipCode: String
//   },
//   hours: {
//     monday: String,
//     tuesday: String,
//     wednesday: String,
//     thursday: String,
//     friday: String,
//     saturday: String,
//     sunday: String
//   },
//   phone: String,
//   email: String,
//   website: String,
//   verified: {
//     type: Boolean,
//     default: false
//   },
//   status: {
//     type: String,
//     enum: ['active', 'pending', 'inactive', 'suspended'],
//     default: 'pending'
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Set updatedAt on save
// serviceProviderSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // When a service provider is created, update the user role to 'service_provider'
// serviceProviderSchema.post('save', async function() {
//   try {
//     // Only run this if it's a new document
//     if (this.isNew) {
//       const User = mongoose.model('User');
//       await User.findByIdAndUpdate(this.user, { role: 'service_provider' });
//     }
//   } catch (err) {
//     console.error('Error updating user role:', err);
//   }
// });

// module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);


const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL of the main image
    default: "true", // Ensure this is required if necessary
  },
  gallery: {
    type: [String], // Array of image URLs
    default: [], // Default to an empty array
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialties: [String],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default:[] // Reference to the Service model
  }],
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  phone: String,
  email: String,
  website: String,
  verified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'inactive', 'suspended'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Set updatedAt on save
serviceProviderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// When a service provider is created, update the user role to 'service_provider'
serviceProviderSchema.post('save', async function() {
  try {
    // Only run this if it's a new document
    if (this.isNew) {
      const User = mongoose.model('User');
      await User.findByIdAndUpdate(this.user, { role: 'service_provider' });
    }
  } catch (err) {
    console.error('Error updating user role:', err);
  }
});
serviceProviderSchema.pre('remove', async function(next) {
  await this.model('Service').deleteMany({ serviceProvider: this._id });
  next();
});
module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);