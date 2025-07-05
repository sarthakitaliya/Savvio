export function Breadcrumbs({ segments }: { segments: string[] }) {
  if (!segments || segments.length === 0) {
    return null;
  }
  return (
    <div className="text-sm text-gray-500 mt-8 mx-3">
      <a href="/dashboard" className="hover:underline">
        Dashboard
      </a>
      {segments?.map((segment, i) => {
        const href = `/dashboard/${segments.slice(0, i + 1).join("/")}`;
        return (
          <span key={i}>
            {" / "}
            <a href={href} className="hover:underline">
              {segment}
            </a>
          </span>
        );
      })}
    </div>
  );
}
