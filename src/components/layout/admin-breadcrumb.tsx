import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function AdminBreadcrumb({ items = [] }: { items?: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
      <Link href="/admin" className="hover:text-gray-900 flex items-center">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-900 font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
