import { usePageTitle } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import InputField from "@/components/auth/InputField";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.login"));

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success(t("auth.loginSuccess"));
      navigate("/");
    } catch (error) {
      toast.error(t("auth.invalidCredentials"));
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--color-primary)]">
            {t("auth.loginTitle")}{" "}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {t("auth.loginSubtitle")}{" "}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label={t("auth.email")}
            type={"email"}
            name="email"
            register={register}
            placeholder={t("auth.email")}
            error={errors.email}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">
                {t("auth.password")}
              </label>{" "}
              <Link
                to="/forgot-password"
                size="sm"
                className="text-xs text-[var(--color-primary)] hover:underline"
              >
                {t("auth.forgotPassword")}{" "}
              </Link>
            </div>
            <InputField
              type={"password"}
              name="password"
              register={register}
              placeholder="•••••••"
              error={errors.password}
            />
          </div>

          <button
            disabled={isSubmitting || !isValid}
            type="submit"
            className="w-full mt-2 btn-primary disabled:opacity-50"
          >
            {isSubmitting ? t("common.loading") : t("auth.loginBtn")}{" "}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            {t("auth.noAccount")}{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              {t("auth.registerBtn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
