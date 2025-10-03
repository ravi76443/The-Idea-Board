import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Input validation helpers
const validateIdeaText = (text: string): { valid: boolean; error?: string } => {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Idea text is required and must be a string' };
  }
  
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Idea text cannot be empty' };
  }
  
  if (trimmed.length > 280) {
    return { valid: false, error: 'Idea text cannot exceed 280 characters' };
  }
  
  return { valid: true };
};

// Sanitize text to prevent XSS
const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .substring(0, 280);
};

// GET /api/ideas - List all ideas sorted by votes desc, then created_at desc
router.get('/', async (req, res) => {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: [
        { votes: 'desc' },
        { created_at: 'desc' }
      ]
    });
    
    res.status(200).json({
      success: true,
      data: ideas,
      count: ideas.length
    });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ideas'
    });
  }
});

// POST /api/ideas - Create a new idea
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Validate input
    const validation = validateIdeaText(text);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }
    
    // Sanitize and create idea
    const sanitizedText = sanitizeText(text);
    const idea = await prisma.idea.create({
      data: {
        text: sanitizedText,
        votes: 0
      }
    });
    
    res.status(201).json({
      success: true,
      data: idea
    });
  } catch (error) {
    console.error('Error creating idea:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create idea'
    });
  }
});

// POST /api/ideas/:id/upvote - Increment votes for an idea
router.post('/:id/upvote', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid idea ID'
      });
    }
    
    // Check if idea exists first
    const existingIdea = await prisma.idea.findUnique({
      where: { id }
    });
    
    if (!existingIdea) {
      return res.status(404).json({
        success: false,
        error: 'Idea not found'
      });
    }
    
    // Increment votes atomically
    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: {
        votes: {
          increment: 1
        }
      }
    });
    
    res.status(200).json({
      success: true,
      data: updatedIdea
    });
  } catch (error) {
    console.error('Error upvoting idea:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upvote idea'
    });
  }
});

export { router as ideasRoutes };
