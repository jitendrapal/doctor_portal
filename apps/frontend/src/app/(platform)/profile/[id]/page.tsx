import { Navbar } from "@/components/layout/navbar";
import { ProfileView } from "@/features/network/profile-view";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-6 md:px-8">
        <ProfileView profileId={params.id} />
      </section>
    </main>
  );
}
