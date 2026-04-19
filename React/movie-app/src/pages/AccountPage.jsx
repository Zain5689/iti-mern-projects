import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks";
import { useAuthStore, useWishlistStore } from "@/store";
import { User, Mail, Shield, Heart, Calendar } from "lucide-react";
import { formatDate } from "@/utils";

export default function AccountPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.account"));

  const { user } = useAuthStore();
  const wishlist = useWishlistStore((s) => s.wishlist);

  const joinDate = formatDate(user?.createdAt);

  return (
    <div className="max-w-4xl px-4 py-12 mx-auto">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-4xl font-heading text-primary">
            {t("nav.account")}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {t("account.subtitle") || "Manage your profile settings"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="flex items-center justify-center w-24 h-24 mb-4 border-2 rounded-full bg-primary/10 border-primary">
                <User size={48} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold tracking-widest">
                {user?.username || "User"}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                {user?.email}
              </p>
              <div className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-primary/20 text-primary">
                {t("nav.login") === "Login" ? "Member" : "عضو"}{" "}
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
                <h3 className="flex items-center gap-2 font-bold">
                  <Shield size={18} className="text-primary" />
                  {t("account.personalInfo")}{" "}
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Username */}
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]/50">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                    <User size={16} /> {t("auth.username")}
                  </span>
                  <span className="font-medium">{user?.username}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]/50">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                    <Mail size={16} /> {t("auth.email")}
                  </span>
                  <span className="font-medium">{user?.email}</span>
                </div>

                {/* Date Joined */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                    <Calendar size={16} /> Joined
                  </span>
                  <span className="font-medium">{joinDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-4 rounded-2xl flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <Heart size={24} className="text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{wishlist.length}</p>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                    {t("nav.wishlist")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
