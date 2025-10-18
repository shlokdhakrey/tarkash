import { PrismaClient, Role, TeamStatus, SubmissionStatus, SponsorTier, Priority } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean existing data (development only)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Cleaning existing data...');
    await prisma.auditLog.deleteMany();
    await prisma.score.deleteMany();
    await prisma.submissionOnJudge.deleteMany();
    await prisma.fileMeta.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.team.deleteMany();
    await prisma.judge.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
    await prisma.sponsor.deleteMany();
    await prisma.announcement.deleteMany();
    await prisma.timeline.deleteMany();
    await prisma.fAQ.deleteMany();
    await prisma.rubric.deleteMany();
    console.log('✅ Cleaned existing data\n');
  }

  // Create Admin User
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@innovatex2025.edu',
      password: hashedPassword,
      name: 'InnovateX Admin',
      role: Role.ADMIN,
      institute: 'College of Engineering',
    },
  });
  console.log(`✅ Created admin: ${admin.email}\n`);

  // Create Judge Users
  console.log('👨‍⚖️ Creating judges...');
  const judges = await Promise.all([
    prisma.user.create({
      data: {
        email: 'judge1@innovatex2025.edu',
        password: hashedPassword,
        name: 'Dr. Sarah Johnson',
        role: Role.JUDGE,
        institute: 'MIT',
        bio: 'Professor of Computer Science with 15 years of experience',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
      },
    }),
    prisma.user.create({
      data: {
        email: 'judge2@innovatex2025.edu',
        password: hashedPassword,
        name: 'Prof. Michael Chen',
        role: Role.JUDGE,
        institute: 'Stanford University',
        bio: 'AI/ML researcher and industry veteran',
        github: 'https://github.com/mchen',
      },
    }),
    prisma.user.create({
      data: {
        email: 'judge3@innovatex2025.edu',
        password: hashedPassword,
        name: 'Dr. Priya Sharma',
        role: Role.JUDGE,
        institute: 'IIT Delhi',
        bio: 'Startup founder and technology evangelist',
      },
    }),
  ]);
  console.log(`✅ Created ${judges.length} judges\n`);

  // Create Judge records
  await Promise.all(
    judges.map((judge) =>
      prisma.judge.create({
        data: {
          userId: judge.id,
          bio: judge.bio,
          expertise: ['Innovation', 'Technology', 'Business Model'],
        },
      })
    )
  );

  // Create Participant Users and Teams
  console.log('👥 Creating teams and participants...');
  const teamsData = [
    {
      name: 'Code Crushers',
      institute: 'College of Engineering',
      idea: 'AI-powered personal finance assistant',
      status: TeamStatus.APPROVED,
    },
    {
      name: 'Byte Builders',
      institute: 'Tech University',
      idea: 'Smart waste management system using IoT',
      status: TeamStatus.APPROVED,
    },
    {
      name: 'Innovation Squad',
      institute: 'Engineering College',
      idea: 'Healthcare monitoring wearable device',
      status: TeamStatus.PENDING,
    },
    {
      name: 'Digital Dreamers',
      institute: 'State University',
      idea: 'EdTech platform for rural education',
      status: TeamStatus.APPROVED,
    },
    {
      name: 'Tech Titans',
      institute: 'College of Engineering',
      idea: 'Blockchain-based supply chain tracker',
      status: TeamStatus.APPROVED,
    },
    {
      name: 'Future Coders',
      institute: 'National Institute',
      idea: 'Mental health chatbot using NLP',
      status: TeamStatus.PENDING,
    },
  ];

  for (const [index, teamData] of teamsData.entries()) {
    // Create team leader
    const leader = await prisma.user.create({
      data: {
        email: `leader${index + 1}@example.com`,
        password: hashedPassword,
        name: `Team Leader ${index + 1}`,
        role: Role.PARTICIPANT,
        institute: teamData.institute,
        github: `https://github.com/leader${index + 1}`,
      },
    });

    // Create team
    const team = await prisma.team.create({
      data: {
        name: teamData.name,
        institute: teamData.institute,
        idea: teamData.idea,
        description: `Detailed description for ${teamData.name}. This is a comprehensive solution addressing real-world challenges.`,
        leaderId: leader.id,
        status: teamData.status,
      },
    });

    // Add team members
    const memberCount = Math.floor(Math.random() * 3) + 2; // 2-4 members
    for (let i = 0; i < memberCount; i++) {
      const member = await prisma.user.create({
        data: {
          email: `team${index + 1}member${i + 1}@example.com`,
          password: hashedPassword,
          name: `Member ${i + 1} of ${teamData.name}`,
          role: Role.PARTICIPANT,
          institute: teamData.institute,
        },
      });

      await prisma.teamMember.create({
        data: {
          teamId: team.id,
          userId: member.id,
          role: i === 0 ? 'Developer' : i === 1 ? 'Designer' : 'Product Manager',
        },
      });
    }

    console.log(`✅ Created team: ${team.name}`);
  }
  console.log();

  // Create Submissions
  console.log('📝 Creating submissions...');
  const teams = await prisma.team.findMany({ where: { status: TeamStatus.APPROVED } });
  
  for (const team of teams.slice(0, 4)) {
    const submission = await prisma.submission.create({
      data: {
        teamId: team.id,
        title: `${team.name} Project`,
        description: `Innovative solution for ${team.idea}. Our project leverages cutting-edge technology to solve real-world problems.`,
        demoUrl: `https://demo.example.com/${team.name.toLowerCase().replace(/\s+/g, '-')}`,
        repoUrl: `https://github.com/innovatex/${team.name.toLowerCase().replace(/\s+/g, '-')}`,
        videoUrl: `https://youtube.com/watch?v=example`,
        status: SubmissionStatus.SUBMITTED,
      },
    });

    // Add file metadata
    await prisma.fileMeta.create({
      data: {
        submissionId: submission.id,
        url: `https://storage.example.com/${submission.id}/presentation.pdf`,
        filename: 'presentation.pdf',
        size: 2048000,
        mimeType: 'application/pdf',
        uploadedBy: team.leaderId,
      },
    });

    console.log(`✅ Created submission for ${team.name}`);
  }
  console.log();

  // Create Sponsors
  console.log('💼 Creating sponsors...');
  const sponsors = [
    { name: 'TechCorp Inc.', tier: SponsorTier.PLATINUM, logo: 'https://via.placeholder.com/200x100?text=TechCorp' },
    { name: 'InnovateLabs', tier: SponsorTier.GOLD, logo: 'https://via.placeholder.com/200x100?text=InnovateLabs' },
    { name: 'CodeMasters', tier: SponsorTier.GOLD, logo: 'https://via.placeholder.com/200x100?text=CodeMasters' },
    { name: 'StartupHub', tier: SponsorTier.SILVER, logo: 'https://via.placeholder.com/200x100?text=StartupHub' },
    { name: 'DevTools Co.', tier: SponsorTier.SILVER, logo: 'https://via.placeholder.com/200x100?text=DevTools' },
    { name: 'CloudHost', tier: SponsorTier.BRONZE, logo: 'https://via.placeholder.com/200x100?text=CloudHost' },
    { name: 'Local Community', tier: SponsorTier.COMMUNITY, logo: 'https://via.placeholder.com/200x100?text=Community' },
  ];

  for (const [index, sponsor] of sponsors.entries()) {
    await prisma.sponsor.create({
      data: {
        name: sponsor.name,
        tier: sponsor.tier,
        logo: sponsor.logo,
        website: `https://www.${sponsor.name.toLowerCase().replace(/\s+/g, '')}.com`,
        description: `${sponsor.name} is a leading technology company supporting innovation.`,
        order: index,
        isActive: true,
      },
    });
    console.log(`✅ Created sponsor: ${sponsor.name}`);
  }
  console.log();

  // Create Announcements
  console.log('📢 Creating announcements...');
  await prisma.announcement.create({
    data: {
      title: 'Registration Now Open!',
      content: 'Registration for InnovateX 2025 is now open. Form your teams and register today!',
      priority: Priority.HIGH,
      isPublic: true,
      authorId: admin.id,
    },
  });
  await prisma.announcement.create({
    data: {
      title: 'Submission Deadline Extended',
      content: 'Good news! The submission deadline has been extended by 48 hours.',
      priority: Priority.URGENT,
      isPublic: true,
      authorId: admin.id,
    },
  });
  console.log('✅ Created announcements\n');

  // Create Timeline
  console.log('📅 Creating event timeline...');
  const eventDate = new Date('2025-03-15T09:00:00+05:30');
  await prisma.timeline.createMany({
    data: [
      {
        title: 'Registration Opens',
        description: 'Start forming your teams and register',
        startTime: new Date('2025-01-15T00:00:00+05:30'),
        type: 'deadline',
        order: 1,
      },
      {
        title: 'Hackathon Kickoff',
        description: 'Opening ceremony and problem statement reveal',
        startTime: eventDate,
        endTime: new Date('2025-03-15T10:00:00+05:30'),
        location: 'Main Auditorium',
        type: 'event',
        order: 2,
      },
      {
        title: 'Hacking Begins',
        description: 'Start building your projects',
        startTime: new Date('2025-03-15T10:00:00+05:30'),
        type: 'event',
        order: 3,
      },
      {
        title: 'Mentor Session 1',
        description: 'Get guidance from industry experts',
        startTime: new Date('2025-03-15T14:00:00+05:30'),
        endTime: new Date('2025-03-15T16:00:00+05:30'),
        location: 'Mentorship Rooms',
        type: 'workshop',
        order: 4,
      },
      {
        title: 'Submission Deadline',
        description: 'Final submissions must be made',
        startTime: new Date('2025-03-17T06:00:00+05:30'),
        type: 'deadline',
        order: 5,
      },
      {
        title: 'Final Presentations',
        description: 'Teams present to judges',
        startTime: new Date('2025-03-17T10:00:00+05:30'),
        endTime: new Date('2025-03-17T14:00:00+05:30'),
        location: 'Main Hall',
        type: 'event',
        order: 6,
      },
      {
        title: 'Awards Ceremony',
        description: 'Winner announcement and prize distribution',
        startTime: new Date('2025-03-17T16:00:00+05:30'),
        endTime: new Date('2025-03-17T18:00:00+05:30'),
        location: 'Main Auditorium',
        type: 'event',
        order: 7,
      },
    ],
  });
  console.log('✅ Created event timeline\n');

  // Create FAQs
  console.log('❓ Creating FAQs...');
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'Who can participate in InnovateX 2025?',
        answer: 'All college students are eligible to participate. Teams can have 1-4 members.',
        category: 'General',
        order: 1,
        isPublic: true,
      },
      {
        question: 'Is there a registration fee?',
        answer: 'No, InnovateX 2025 is completely free for all participants.',
        category: 'Registration',
        order: 2,
        isPublic: true,
      },
      {
        question: 'What is the prize pool?',
        answer: 'The total prize pool is ₹10 Lakhs distributed among winners and special categories.',
        category: 'Prizes',
        order: 3,
        isPublic: true,
      },
      {
        question: 'Do I need a team to participate?',
        answer: 'You can participate solo or form a team of up to 4 members.',
        category: 'Teams',
        order: 4,
        isPublic: true,
      },
    ],
  });
  console.log('✅ Created FAQs\n');

  // Create Rubric
  console.log('📋 Creating judging rubric...');
  await prisma.rubric.create({
    data: {
      name: 'InnovateX 2025 Default Rubric',
      description: 'Standard judging criteria for all submissions',
      criteria: [
        { name: 'Innovation', description: 'Originality and creativity', weight: 0.25, maxScore: 10 },
        { name: 'Impact', description: 'Potential social/business impact', weight: 0.25, maxScore: 10 },
        { name: 'Feasibility', description: 'Technical feasibility and scalability', weight: 0.20, maxScore: 10 },
        { name: 'Presentation', description: 'Quality of demo and pitch', weight: 0.15, maxScore: 10 },
        { name: 'Execution', description: 'Code quality and implementation', weight: 0.15, maxScore: 10 },
      ],
      isActive: true,
    },
  });
  console.log('✅ Created rubric\n');

  console.log('🎉 Database seeding completed successfully!\n');
  console.log('═'.repeat(50));
  console.log('\n📋 SUMMARY:\n');
  const counts = {
    users: await prisma.user.count(),
    teams: await prisma.team.count(),
    submissions: await prisma.submission.count(),
    judges: await prisma.judge.count(),
    sponsors: await prisma.sponsor.count(),
    announcements: await prisma.announcement.count(),
    timeline: await prisma.timeline.count(),
    faqs: await prisma.fAQ.count(),
  };

  console.log(`   Users: ${counts.users}`);
  console.log(`   Teams: ${counts.teams}`);
  console.log(`   Submissions: ${counts.submissions}`);
  console.log(`   Judges: ${counts.judges}`);
  console.log(`   Sponsors: ${counts.sponsors}`);
  console.log(`   Announcements: ${counts.announcements}`);
  console.log(`   Timeline Events: ${counts.timeline}`);
  console.log(`   FAQs: ${counts.faqs}`);
  console.log('\n⚠️  DEFAULT CREDENTIALS (CHANGE IN PRODUCTION!):\n');
  console.log(`   Admin Email: admin@innovatex2025.edu`);
  console.log(`   Password: Admin123!`);
  console.log('\n═'.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
