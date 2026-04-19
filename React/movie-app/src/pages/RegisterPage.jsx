import { usePageTitle } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/auth/InputField";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  usePageTitle(t("nav.register"));

  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password, data.username);
      toast.success(t("auth.registerSuccess"));
      navigate("/login");
    } catch (error) {
      toast.error(t("common.error"));
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--color-primary)]">
            {t("auth.registerTitle")}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {t("auth.registerSubtitle")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label={t("auth.username")}
            type={"text"}
            name="username"
            register={register}
            placeholder={t("auth.username")}
            error={errors.username}
          />

          <InputField
            label={t("auth.email")}
            type={"email"}
            name="email"
            register={register}
            placeholder={t("auth.email")}
            error={errors.email}
          />

          <InputField
            label={t("auth.password")}
            type={"password"}
            name="password"
            register={register}
            placeholder={t("auth.password")}
            error={errors.password}
          />
          <InputField
            label={t("auth.confirmPassword")}
            type={"password"}
            name="confirmPassword"
            register={register}
            placeholder={t("auth.confirmPassword")}
            error={errors.confirmPassword}
          />

          <button
            disabled={isSubmitting || !isValid}
            type="submit"
            className={`w-full mt-4 btn-primary disabled:opacity-50`}
          >
            {isSubmitting ? t("common.loading") : t("auth.registerBtn")}{" "}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-sm text-center text-[var(--color-text-muted)]">
          {t("auth.hasAccount")}{" "}
          <Link
            to="/login"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            {t("auth.loginBtn")}{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
