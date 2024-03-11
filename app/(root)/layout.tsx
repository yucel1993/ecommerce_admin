import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { auth } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const adminCheck = userId === process.env.NEXT_ADMIN_SECRET;
  return (
    <div className="flex h-screen flex-col">
      <Header adminCheck={adminCheck} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
