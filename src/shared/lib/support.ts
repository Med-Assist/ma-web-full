export const SUPPORT_EMAIL = "nguyenthanhdanhctk42@gmail.com";

export function buildSupportMailto({
  subject,
  body,
}: {
  subject: string;
  body: string | string[];
}) {
  const bodyText = Array.isArray(body) ? body.join("\n") : body;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
}
