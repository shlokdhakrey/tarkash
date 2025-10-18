const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres@host.docker.internal:5432/innovatex?schema=public'
    }
  },
  log: ['query', 'info', 'warn', 'error']
});

async function testConnection() {
  try {
    console.log('Testing connection to PostgreSQL via host.docker.internal...');
    
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Connection successful!');
    console.log('PostgreSQL version:', result);
    
    const userCount = await prisma.user.count();
    console.log(`✅ Found ${userCount} users in database`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
