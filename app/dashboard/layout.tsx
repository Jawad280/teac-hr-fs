"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading ...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col items-center min-h-screen gap-0 m-0 p-0">
        <div
          className="sticky top-0 z-50 flex flex-col items-center box-border w-full"
          id="navbar"
        >
          <Navbar />
        </div>

        <div className="flex flex-col items-center box-border w-full flex-grow">
          {children}
        </div>

        <Footer />
      </div>
    );
  }
}
