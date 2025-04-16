const express = require('express');
const Campaign = require('../models/Campaign');

const router = express.Router();

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
});

// Get campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ message: 'Error fetching campaign' });
  }
});

// Create new campaign
router.post('/', async (req, res) => {
  try {
    const { name, description, status = 'active', leads, accountIDs } = req.body;

    // Basic validation
    if (!name || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        missingFields: [
          ...(!name ? ['name'] : []),
          ...(!description ? ['description'] : [])
        ]
      });
    }

    // Validate arrays
    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ 
        message: 'Leads must be a non-empty array',
        received: leads
      });
    }

    if (!Array.isArray(accountIDs) || accountIDs.length === 0) {
      return res.status(400).json({ 
        message: 'AccountIDs must be a non-empty array',
        received: accountIDs
      });
    }

    // Validate status
    const validStatuses = ['ACTIVE', 'INACTIVE'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status value',
        receivedStatus: status,
        validStatuses
      });
    }

    const campaignData = {
      name,
      description,
      status,
      leads,
      accountIDs
    };

    const campaign = new Campaign(campaignData);
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }
    res.status(500).json({ message: 'Error creating campaign' });
  }
});

// Update campaign
router.put('/:id', async (req, res) => {
  try {
    const { status, leads, accountIDs } = req.body;
    
    // Validate status if provided
    if (status) {
      const validStatuses = ['ACTIVE', 'INACTIVE'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: 'Invalid status value',
          receivedStatus: status,
          validStatuses
        });
      }
    }

    // Validate arrays if provided
    if (leads && (!Array.isArray(leads) || leads.length === 0)) {
      return res.status(400).json({ message: 'Leads must be a non-empty array' });
    }
    if (accountIDs && (!Array.isArray(accountIDs) || accountIDs.length === 0)) {
      return res.status(400).json({ message: 'AccountIDs must be a non-empty array' });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(updatedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }
    res.status(500).json({ message: 'Error updating campaign' });
  }
});

// Delete campaign
router.delete('/:id', async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ message: 'Error deleting campaign' });
  }
});

module.exports = router; 