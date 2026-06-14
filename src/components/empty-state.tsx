type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function EmptyState({ eyebrow, title, description }: EmptyStateProps) {
  return (
    <div className="border-y border-anthracite/12 bg-ivory/70 px-5 py-12 text-center sm:px-8">
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-anthracite/45">
          {eyebrow}
        </p>
      ) : null}
      <p className="mx-auto max-w-xl font-serif text-3xl font-semibold leading-tight text-anthracite">
        {title}
      </p>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-anthracite/62">
        {description}
      </p>
    </div>
  );
}
