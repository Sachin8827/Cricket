import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  teamLimit: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  firstPrice: {
    type: Number,
    required: true
  },
  secondPrice: {
    type: Number,
    required: true
  },
  thirdPrice: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
