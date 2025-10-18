const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://daddy:dhakrey@localhost:5432/innovatex?schema=public'
    }
  },
  log: ['query', 'info', 'warn', 'error']
});

async function main() {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Successfully connected to database!');
    
    const result = await prisma.$queryRaw`SELECT current_database(), current_user`;
    console.log('Query result:', result);
    
    await prisma.$disconnect();
    console.log('✅ Connection test completed');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

main();
