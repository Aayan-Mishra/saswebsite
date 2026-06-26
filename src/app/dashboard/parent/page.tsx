"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ParentDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50 p-4">
      <Card padding="lg" className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-gold-600" />
        </div>
        <h1 className="text-2xl font-bold text-navy-900 mb-3">Uh Oh!</h1>
        <p className="text-text-secondary mb-2">
          You haven&apos;t been provisioned a role yet.
        </p>
        <p className="text-text-secondary mb-8">
          Check back later! If you think this is an error, please contact the administrator.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
