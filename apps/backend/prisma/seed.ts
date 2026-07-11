import { PrismaClient, UserRoleType } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const hashed = await bcrypt.hash("Password@123", 12);

  const doctor = await prisma.user.upsert({
    where: { email: "doctor@medconnect.ai" },
    update: {},
    create: {
      email: "doctor@medconnect.ai",
      hashedPassword: hashed,
      firstName: "Aarav",
      lastName: "Sharma",
      verificationBadge: true,
      profile: {
        create: {
          qualification: "MBBS, MD",
          specialization: "Cardiology",
          yearsOfExperience: 12,
          country: "India",
          city: "Mumbai",
          headline: "Consultant Cardiologist",
        },
      },
      userRoles: {
        create: [
          { role: UserRoleType.DOCTOR },
          { role: UserRoleType.SPECIALIST },
        ],
      },
    },
  });

  const hospital = await prisma.hospital.create({
    data: {
      name: "MedConnect General Hospital",
      country: "India",
      city: "Bengaluru",
      isVerified: true,
      websiteUrl: "https://example-hospital.org",
    },
  });

  const post = await prisma.post.create({
    data: {
      authorId: doctor.id,
      content:
        "Early intervention and evidence-based care significantly improve cardiovascular outcomes.",
      visibility: "PUBLIC",
    },
  });

  await prisma.notification.create({
    data: {
      recipientId: doctor.id,
      type: "SYSTEM",
      title: "Welcome to MedConnect AI",
      body: "Your account has been verified and is ready to network.",
    },
  });

  await prisma.researchPaper.create({
    data: {
      authorId: doctor.id,
      title: "AI-Assisted Triage in Cardiology Units",
      abstract:
        "A pragmatic study on AI-supported triage workflows and care outcomes.",
      journal: "Journal of Digital Health",
      doi: "10.1000/medconnect.2026.001",
    },
  });

  await prisma.job.create({
    data: {
      hospitalId: hospital.id,
      title: "Consultant Neurologist",
      description:
        "Lead stroke unit and collaborate with multidisciplinary teams.",
      city: "Bengaluru",
      country: "India",
    },
  });

  await prisma.group.create({
    data: {
      name: "Global Cardiology Forum",
      type: "SPECIALIZATION_GROUP",
      description: "Case discussions, trials, and peer insights in cardiology.",
    },
  });

  console.log(`Seed completed. user=${doctor.email}, post=${post.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
