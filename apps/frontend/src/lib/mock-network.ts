export type NetworkUser = {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  bio: string;
  avatarUrl: string;
  specialties: string[];
};

export const networkUsers: NetworkUser[] = [
  {
    id: "u-me",
    name: "Dr. Aisha Mehta",
    role: "Neurologist",
    organization: "CityCare Neuro Center",
    location: "Pune, India",
    bio: "Focused on stroke prevention, neurocritical care, and multidisciplinary patient pathways.",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=AishaMehta",
    specialties: ["Stroke", "Neuro ICU", "Clinical Leadership"],
  },
  {
    id: "u-nisha",
    name: "Dr. Nisha Rao",
    role: "Cardiologist",
    organization: "Apollo Heart Institute",
    location: "Mumbai, India",
    bio: "Interested in heart failure programs, preventive cardiology, and digital patient monitoring.",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=NishaRao",
    specialties: ["Heart Failure", "Echo", "Preventive Cardiology"],
  },
  {
    id: "u-michael",
    name: "Dr. Michael Chen",
    role: "Clinical Researcher",
    organization: "Cambridge Clinical AI Lab",
    location: "Remote",
    bio: "Building safe and explainable AI systems for radiology workflows and trial design.",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=MichaelChen",
    specialties: ["Research", "AI", "Radiology"],
  },
];

export function getUserById(userId: string): NetworkUser | undefined {
  return networkUsers.find((user) => user.id === userId);
}
