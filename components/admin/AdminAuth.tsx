"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === "/admin/login") {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/session");
        
        if (response.ok) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5eb3ce] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Allow login page without authentication
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Protect other admin pages
  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}


