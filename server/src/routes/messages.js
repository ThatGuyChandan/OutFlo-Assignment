const express = require('express');
const Message = require('../models/Message');
const Campaign = require('../models/Campaign');

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Get message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Error fetching message' });
  }
});

// Create new message
router.post('/', async (req, res) => {
  try {
    const { content, campaignId, scheduledTime, status = 'pending' } = req.body;

    // Validate required fields
    if (!content || !campaignId || !scheduledTime) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['content', 'campaignId', 'scheduledTime']
      });
    }

    // Validate status
    const validStatuses = ['pending', 'sent', 'failed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status value',
        validStatuses
      });
    }

    // Validate campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Validate scheduled time
    const scheduled = new Date(scheduledTime);
    if (isNaN(scheduled.getTime())) {
      return res.status(400).json({ message: 'Invalid scheduled time format' });
    }

    const message = new Message({
      content,
      campaignId,
      scheduledTime,
      status
    });

    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Error creating message' });
  }
});

// Update message
router.put('/:id', async (req, res) => {
  try {
    const { status, scheduledTime } = req.body;
    
    // Validate status if provided
    if (status) {
      const validStatuses = ['pending', 'sent', 'failed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: 'Invalid status value',
          validStatuses
        });
      }
    }

    // Validate scheduled time if provided
    if (scheduledTime) {
      const scheduled = new Date(scheduledTime);
      if (isNaN(scheduled.getTime())) {
        return res.status(400).json({ message: 'Invalid scheduled time format' });
      }
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Error updating message' });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
});

// Generate personalized message
router.post('/generate', async (req, res) => {
  try {
    const profile = req.body;
    
    // Validate required fields
    if (!profile.name || !profile.position) {
      return res.status(400).json({ 
        message: 'Name and position are required',
        missingFields: [
          ...(!profile.name ? ['name'] : []),
          ...(!profile.position ? ['position'] : [])
        ]
      });
    }

    // Generate message
    const message = generatePersonalizedMessage(profile);
    res.json({ message });
  } catch (error) {
    console.error('Error generating message:', error);
    res.status(500).json({ 
      message: 'Error generating message',
      error: error.message
    });
  }
});

// Helper function to generate personalized message
function generatePersonalizedMessage(profile) {
  const { name, position, company, industry, interests, recentActivity } = profile;
  let message = `Hi ${name},\n\n`;
  
  message += `I noticed your role as ${position} at ${company || 'your company'}`;
  
  if (industry) {
    message += ` in the ${industry} industry`;
  }
  
  message += `. I'm impressed by your work`;
  
  if (recentActivity) {
    message += `, especially your recent activity regarding ${recentActivity}`;
  }
  
  if (interests) {
    message += ` and your interest in ${interests}`;
  }
  
  message += `.\n\n`;
  message += `I'd love to connect and learn more about your experience. Let me know if you'd be open to a conversation.\n\n`;
  message += `Best regards,\n[Your Name]`;
  
  return message;
}

module.exports = router; 