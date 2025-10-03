import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const sampleIdeas = [
  'Build a mobile app that helps people find local events happening today',
  'Create a browser extension that blocks distracting websites during work hours',
  'Develop a platform for sharing and discovering unique travel destinations',
  'Design a tool that automates the creation of social media posts for small businesses',
  'Build a community-driven marketplace for trading vintage collectibles',
  'Create a fitness tracker that focuses on adventure sports like rock climbing',
  'Develop an app that helps people learn new languages through music lyrics',
  'Design a platform for connecting pet owners with local pet services',
  'Build a tool that helps small restaurants manage online orders more efficiently',
  'Create a social network for sharing and discovering local art and crafts'
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Clear existing ideas
    await prisma.idea.deleteMany();
    console.log('🧹 Cleared existing ideas');
    
    // Create sample ideas
    for (const text of sampleIdeas) {
      await prisma.idea.create({
        data: {
          text,
          votes: Math.floor(Math.random() * 20) // Random votes 0-19
        }
      });
    }
    
    console.log(`✅ Created ${sampleIdeas.length} sample ideas`);
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
