"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function PropertyPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // simple windowed page numbers (max 5 visible)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
        className="rounded-lg"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-muted-foreground">…</span>}
            <Button
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              onClick={() => goToPage(page)}
              className="rounded-lg"
            >
              {page}
            </Button>
          </div>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-lg"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}