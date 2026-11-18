/** Button.jsx - Primary action button. Pass `href` to render it as a link with the same look. */
import Link from "next/link";
import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary: "bg-btn text-btn-text shadow-btn hover:brightness-95",
  secondary: "border border-card-border bg-card text-ink hover:bg-page",
  ghost: "text-ink hover:bg-card-border/60",
  danger: "bg-status-red text-white hover:brightness-95",
};
const SIZES = { sm: "px-3 py-1.5 text-meta", md: "px-5 py-2.5 text-[15px]", lg: "px-6 py-3.5 text-[17px]" };

export default function Button({ variant = "primary", size = "md", loading = false, icon: Icon, className = "", children, href, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : Icon && <Icon className="h-4 w-4" aria-hidden />}
      {children}
    </>
  );
  if (href) return <Link href={href} className={cls} {...props}>{content}</Link>;
  return <button className={cls} {...props} disabled={loading || props.disabled}>{content}</button>;
}
