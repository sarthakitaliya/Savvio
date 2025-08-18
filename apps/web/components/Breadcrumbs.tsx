import Link from "next/link";

export function Breadcrumbs({ slugs }: { slugs: string[] }) {
  if (!slugs || slugs.length === 0) {
    return null;
  }
  return (
    <div className="text-sm text-gray-500 mt-8 mx-3">
      <Link href="/dashboard" className="hover:underline">
        Dashboard
      </Link>
      {slugs?.map((slug, i) => {
        const href = `/dashboard/${slugs.slice(0, i + 1).join("/")}`;
        const displaySlug = slug
          .replace(/-[a-zA-Z0-9]{5}$/, "") // remove the "-X_DkJ" part
          .replace(/-/g, " ") // make remaining dashes into spaces
          .trim();
        return (
          <span key={i}>
            {" / "}
            <Link href={href} className="hover:underline">
              {displaySlug}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
