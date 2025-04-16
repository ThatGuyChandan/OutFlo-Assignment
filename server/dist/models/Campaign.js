"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const campaignSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'INACTIVE',
    },
    leads: [{
            type: String,
        }],
    accountIDs: [{
            type: String,
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
campaignSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.Campaign = mongoose_1.default.model('Campaign', campaignSchema);
//# sourceMappingURL=Campaign.js.map