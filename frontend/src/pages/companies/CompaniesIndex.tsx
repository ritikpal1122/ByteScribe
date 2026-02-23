import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Building2,
  Code2,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { useCompanies } from '@/hooks/useCompanies';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import type { Company } from '@/types';

/* ------------------------------------------------------------------ */
/*  Logo colors                                                        */
/* ------------------------------------------------------------------ */

const logoColors = [
  'bg-blue-50 text-blue-600',
  'bg-violet-50 text-violet-600',
  'bg-emerald-50 text-emerald-600',
  'bg-amber-50 text-amber-600',
  'bg-rose-50 text-rose-600',
  'bg-cyan-50 text-cyan-600',
  'bg-purple-50 text-purple-600',
  'bg-orange-50 text-orange-600',
];

/* ------------------------------------------------------------------ */
/*  CompanyCard                                                        */
/* ------------------------------------------------------------------ */

function CompanyCard({ company, idx }: { company: Company; idx: number }) {
  const color = logoColors[idx % logoColors.length];

  return (
    <Link
      to={`/companies/${company.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        {company.logo_url ? (
          <img src={company.logo_url} alt={company.name} className="w-12 h-12 rounded-xl object-contain" />
        ) : (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${color}`}>
            {company.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-gray-900 font-bold group-hover:text-blue-600 transition-colors">
            {company.name}
          </h3>
          <p className="text-xs text-gray-400">{company.description ?? ''}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Code2 className="w-4 h-4 text-gray-400" />
            {company.problem_count} problems
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            {company.experience_count} experiences
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  CompaniesIndex page                                                */
/* ------------------------------------------------------------------ */

export default function CompaniesIndex() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, refetch } = useCompanies(
    page,
    20,
    debouncedSearch || undefined,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading companies..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load companies.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const companies = data?.items ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Building2 className="w-7 h-7 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Companies</h1>
      </div>
      <p className="text-gray-500 mb-8 max-w-2xl">
        Browse interview problems and experiences organized by company. Prepare for your target company.
      </p>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Grid */}
      {companies.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No companies found"
          description="No companies match your search. Try a different query."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company, idx) => (
            <CompanyCard key={company.id} company={company} idx={idx} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
