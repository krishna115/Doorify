import {
  ArrowRight,
  ChevronRight,
  Package,
  TrendingDown,
  Wallet,
  Warehouse,
} from "lucide-react";

export default function DeadStockLandingPage() {
  return (
    <main className="relative overflow-hidden bg-white text-zinc-900">

      {/* Background */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-100 blur-[150px] opacity-40" />
      </div>

      {/* Navbar */}

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-zinc-200/70">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white font-bold">
              D
            </div>

            <div>

              <p className="font-semibold">
                DeadStock
              </p>

              <p className="text-xs text-zinc-500">
                by Kodekraftt Labs
              </p>

            </div>

          </div>

          <button className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 transition">
            Join Waitlist
          </button>

        </div>
      </header>

      {/* HERO */}

      <section className="relative">

        <div className="mx-auto max-w-7xl px-8">

          <div className="py-36 lg:py-44">

            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">

              <span className="h-2 w-2 rounded-full bg-green-500" />

              Coming Soon

            </div>

            <h1 className="mt-10 max-w-5xl text-6xl font-bold tracking-tight leading-[0.95] lg:text-8xl">

              Know exactly
              <br />
              what's killing
              <br />
              your cash flow.

            </h1>

            <p className="mt-10 max-w-2xl text-xl leading-9 text-zinc-600">

              Find products that haven't sold in months,
              discover money locked in inventory,
              and know exactly what to clear first.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <button className="flex items-center gap-3 rounded-2xl bg-black px-8 py-4 text-white transition hover:opacity-90">

                Join Waitlist

                <ArrowRight size={18} />

              </button>

              <button className="flex items-center gap-3 rounded-2xl border border-zinc-300 px-8 py-4 hover:bg-zinc-100 transition">

                See Demo

                <ChevronRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* DASHBOARD */}

      <section className="pb-40">

        <div className="mx-auto max-w-7xl px-8">

          <div className="rounded-[36px] border border-zinc-200 bg-white shadow-[0_30px_100px_rgba(0,0,0,.08)]">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-zinc-200 px-10 py-7">

              <div>

                <h2 className="text-xl font-semibold">

                  Inventory Health

                </h2>

                <p className="mt-1 text-sm text-zinc-500">

                  Live overview of your warehouse

                </p>

              </div>

              <button className="rounded-xl bg-zinc-100 px-4 py-2 text-sm">

                Last 90 Days

              </button>

            </div>

            {/* Body */}

            <div className="grid gap-8 p-10 lg:grid-cols-4">

              <DashboardCard
                icon={<Wallet size={22} />}
                title="Cash Locked"
                value="₹4,82,000"
                subtitle="Dead Inventory"
              />

              <DashboardCard
                icon={<TrendingDown size={22} />}
                title="Products Aging"
                value="184"
                subtitle="120+ Days"
              />

              <DashboardCard
                icon={<Warehouse size={22} />}
                title="Top Supplier"
                value="Surat Textiles"
                subtitle="42% Dead Stock"
              />

              <DashboardCard
                icon={<Package size={22} />}
                title="Recommendation"
                value="Clear 15"
                subtitle="Before Reordering"
              />

            </div>

            {/* Insights */}

            <div className="grid border-t border-zinc-200 lg:grid-cols-2">

              <div className="border-r border-zinc-200 p-10">

                <h3 className="text-xl font-semibold">

                  Inventory Insights

                </h3>

                <div className="mt-8 space-y-5">

                  <Insight text="143 products haven't sold in over 90 days." />

                  <Insight text="₹4.8L is currently locked in inventory." />

                  <Insight text="Cotton category is aging the fastest." />

                  <Insight text="Supplier A contributes 41% of dead stock." />

                  <Insight text="Liquidate 15 products this month." />

                </div>

              </div>

              <div className="p-10">

                <h3 className="text-xl font-semibold">

                  Inventory Distribution

                </h3>

                <div className="mt-10 space-y-8">

                  <Progress
                    label="Fast Moving"
                    value={72}
                  />

                  <Progress
                    label="Slow Moving"
                    value={20}
                  />

                  <Progress
                    label="Dead Stock"
                    value={8}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}

/* ---------------------------------------------------------------- */

function DashboardCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
        {icon}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold tracking-tight">
        {value}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        {subtitle}
      </p>

    </div>
  );
}

function Insight({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="h-3 w-3 rounded-full bg-green-500" />

      <p className="text-zinc-700">
        {text}
      </p>

    </div>
  );
}

function Progress({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>

      <div className="mb-3 flex justify-between">

        <span className="font-medium">
          {label}
        </span>

        <span className="text-zinc-500">
          {value}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-200">

        <div
          className="h-full rounded-full bg-black"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}
      {/* ====================== PROBLEM ====================== */}

      <section className="py-40">

        <div className="mx-auto max-w-5xl px-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
            The Problem
          </p>

          <h2 className="mt-8 text-5xl font-bold tracking-tight leading-tight lg:text-6xl">
            Inventory doesn't become
            <br />
            dead overnight.
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-zinc-600">
            It quietly sits on your shelves for months.
            Every day it occupies space, locks cash,
            and slowly becomes harder to sell.
          </p>

        </div>

      </section>

      {/* ====================== PROBLEM CARDS ====================== */}

      <section className="pb-40">

        <div className="mx-auto grid max-w-7xl gap-8 px-8 md:grid-cols-2">

          <ProblemCard
            number="01"
            title="No one knows what's aging."
            description="Businesses know what they purchased, but rarely know what hasn't moved for months."
          />

          <ProblemCard
            number="02"
            title="Cash quietly disappears."
            description="Money stays trapped inside products instead of being available to grow the business."
          />

          <ProblemCard
            number="03"
            title="The wrong inventory gets reordered."
            description="Businesses continue purchasing similar products while old stock still fills the warehouse."
          />

          <ProblemCard
            number="04"
            title="Decisions rely on memory."
            description="Instead of data, most purchasing decisions depend on experience or rough estimates."
          />

        </div>

      </section>

      {/* ====================== VALUE ====================== */}

      <section className="bg-zinc-50 py-44">

        <div className="mx-auto max-w-6xl px-8">

          <div className="grid items-center gap-20 lg:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                What We Do
              </p>

              <h2 className="mt-8 text-5xl font-bold tracking-tight leading-tight">

                We don't help you
                manage inventory.

                <br />
                <br />

                We help you
                recover cash.

              </h2>

            </div>

            <div className="space-y-8">

              <FeatureRow
                title="Know what hasn't sold."
                description="Instantly identify products that have stopped moving."
              />

              <FeatureRow
                title="See money that's locked."
                description="Understand exactly how much working capital is sitting idle."
              />

              <FeatureRow
                title="Prioritize what to clear."
                description="Stop guessing which inventory should be discounted first."
              />

              <FeatureRow
                title="Purchase with confidence."
                description="Avoid buying products that already exist as dead inventory."
              />

            </div>

          </div>

        </div>

      </section>

      {/* ====================== HOW IT WORKS ====================== */}

      <section className="py-44">

        <div className="mx-auto max-w-6xl px-8">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
              How It Works
            </p>

            <h2 className="mt-8 text-5xl font-bold tracking-tight">

              Three simple steps.

            </h2>

          </div>

          <div className="mt-28 grid gap-16 lg:grid-cols-3">

            <Step
              number="01"
              title="Upload Inventory"
              description="Import your inventory from Excel, CSV or your existing ERP."
            />

            <Step
              number="02"
              title="Automatic Analysis"
              description="We calculate inventory age, stock movement and supplier contribution."
            />

            <Step
              number="03"
              title="Take Action"
              description="Know exactly what to clear first to free up cash."
            />

          </div>

        </div>

      </section>


function ProblemCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[32px] border border-zinc-200 p-10">

      <p className="text-sm font-semibold text-zinc-400">
        {number}
      </p>

      <h3 className="mt-8 text-3xl font-bold tracking-tight">
        {title}
      </h3>

      <p className="mt-6 text-lg leading-8 text-zinc-600">
        {description}
      </p>

    </div>
  );
}

function FeatureRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-lg leading-8 text-zinc-600">
        {description}
      </p>

    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>

      <div className="text-6xl font-bold tracking-tight text-zinc-200">
        {number}
      </div>

      <h3 className="mt-8 text-3xl font-bold">
        {title}
      </h3>

      <p className="mt-6 text-lg leading-8 text-zinc-600">
        {description}
      </p>

    </div>
  );
}