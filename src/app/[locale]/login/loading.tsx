export default function LoginLoading() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel skeleton */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-brand-blue p-12">
        <div className="h-14 w-44 animate-pulse rounded-lg bg-white/10" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="h-8 w-1/2 animate-pulse rounded bg-white/10" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[0,1,2,3].map(i => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/10" />
            ))}
          </div>
        </div>
        <div className="h-28 animate-pulse rounded-2xl bg-white/10" />
      </div>

      {/* Right panel skeleton */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(11,28,61,0.12)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange" />
          <div className="animate-pulse px-8 py-8">
            <div className="mx-auto mb-4 h-12 w-40 rounded-lg bg-slate-200" />
            <div className="mx-auto mb-1 h-7 w-44 rounded bg-slate-200" />
            <div className="mx-auto mb-7 h-4 w-56 rounded bg-slate-100" />
            <div className="mb-5 h-11 w-full rounded-xl bg-slate-100" />
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="h-3 w-32 rounded bg-slate-100" />
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="mb-4 h-11 w-full rounded-xl bg-slate-100" />
            <div className="mb-4 h-11 w-full rounded-xl bg-slate-100" />
            <div className="h-11 w-full rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
