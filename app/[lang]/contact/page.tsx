import { redirect } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang === "en" ? "en" : "fr";
  redirect(`/${lang}#contact`);
}