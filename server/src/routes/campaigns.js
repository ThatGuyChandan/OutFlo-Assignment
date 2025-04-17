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
  console.log('\n=== Campaign Creation Request ===');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { name, description, status = 'active', leads, accountIDs } = req.body;

    // Basic validation
    if (!name || !description) {
      console.log('Validation failed - missing required fields');
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
      console.log('Validation failed - invalid leads array');
      return res.status(400).json({ 
        message: 'Leads must be a non-empty array',
        received: leads
      });
    }

    if (!Array.isArray(accountIDs) || accountIDs.length === 0) {
      console.log('Validation failed - invalid accountIDs array');
      return res.status(400).json({ 
        message: 'AccountIDs must be a non-empty array',
        received: accountIDs
      });
    }

    // Validate status
    const validStatuses = ['ACTIVE', 'INACTIVE'];
    if (!validStatuses.includes(status)) {
      console.log('Validation failed - invalid status:', status);
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
    
    console.log('\n=== Campaign Data ===');
    console.log('Data to be saved:', JSON.stringify(campaignData, null, 2));
    
    console.log('\n=== Creating Campaign Instance ===');
    const campaign = new Campaign(campaignData);
    console.log('Campaign instance created');
    
    console.log('\n=== Attempting to Save Campaign ===');
    try {
      const savedCampaign = await campaign.save();
      console.log('✅ Campaign saved successfully');
      console.log('Saved campaign:', JSON.stringify(savedCampaign, null, 2));
      return res.status(201).json(savedCampaign);
    } catch (saveError) {
      console.error('\n❌ Save Operation Failed');
      console.error('Save Error Type:', saveError.name);
      console.error('Save Error Message:', saveError.message);
      console.error('Save Error Stack:', saveError.stack);
      
      if (saveError.errors) {
        console.error('Validation Errors:', JSON.stringify(saveError.errors, null, 2));
      }
      
      throw saveError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('\n❌ Campaign Creation Failed');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message,
          value: error.errors[key].value
        }))
      });
    }

    res.status(500).json({ 
      message: 'Error creating campaign',
      error: error.message
    });
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