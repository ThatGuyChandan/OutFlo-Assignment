"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Campaign_1 = require("../models/Campaign");
const router = express_1.default.Router();
// Get all campaigns
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching all campaigns');
        const campaigns = yield Campaign_1.Campaign.find();
        console.log(`Found ${campaigns.length} campaigns`);
        res.json(campaigns);
    }
    catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ message: 'Error fetching campaigns' });
    }
}));
// Get campaign by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Fetching campaign with ID: ${req.params.id}`);
        const campaign = yield Campaign_1.Campaign.findById(req.params.id);
        if (!campaign) {
            console.log('Campaign not found');
            return res.status(404).json({ message: 'Campaign not found' });
        }
        console.log('Campaign found:', campaign);
        res.json(campaign);
    }
    catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ message: 'Error fetching campaign' });
    }
}));
// Create campaign
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Creating new campaign with data:', req.body);
        const campaign = new Campaign_1.Campaign(req.body);
        const savedCampaign = yield campaign.save();
        console.log('Campaign created successfully:', savedCampaign);
        res.status(201).json(savedCampaign);
    }
    catch (error) {
        console.error('Error creating campaign:', error);
        res.status(400).json({
            message: 'Error creating campaign',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Update campaign
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Updating campaign with ID: ${req.params.id}`, req.body);
        const updatedCampaign = yield Campaign_1.Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCampaign) {
            console.log('Campaign not found for update');
            return res.status(404).json({ message: 'Campaign not found' });
        }
        console.log('Campaign updated successfully:', updatedCampaign);
        res.json(updatedCampaign);
    }
    catch (error) {
        console.error('Error updating campaign:', error);
        res.status(400).json({ message: 'Error updating campaign' });
    }
}));
// Delete campaign
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Deleting campaign with ID: ${req.params.id}`);
        const deletedCampaign = yield Campaign_1.Campaign.findByIdAndDelete(req.params.id);
        if (!deletedCampaign) {
            console.log('Campaign not found for deletion');
            return res.status(404).json({ message: 'Campaign not found' });
        }
        console.log('Campaign deleted successfully');
        res.json({ message: 'Campaign deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ message: 'Error deleting campaign' });
    }
}));
exports.default = router;
//# sourceMappingURL=campaigns.js.map