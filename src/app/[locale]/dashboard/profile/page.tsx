import { Metadata } from 'next';

export const metadata: Metadata = { title: 'My Profile' };

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p className="mt-2 text-muted-foreground">Manage your account settings.</p>
    </div>
  );
}
