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
const router = express_1.default.Router();
// Generate personalized message
router.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = req.body;
        if (!profile.name || !profile.position) {
            return res.status(400).json({ message: 'Name and position are required' });
        }
        // Generate a personalized message based on the profile
        const message = generatePersonalizedMessage(profile);
        res.json({ message });
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating message' });
    }
}));
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
exports.default = router;
//# sourceMappingURL=messages.js.map