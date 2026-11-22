import { PropertyRepository } from "@/lib/repositories/property.repo";
import { AuditLogRepository } from "@/lib/repositories/audit.repo";
import { ReportRepository } from "@/lib/repositories/report.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { PropertyDetailClient } from "./property-detail-client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminPropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, auditLogs, reports] = await Promise.all([
    PropertyRepository.findById(params.id),
    AuditLogRepository.getByEntity("Property", params.id),
    ReportRepository.getAll(),
  ]);

  if (!property) {
    notFound();
  }

  const relatedReports = reports.filter((r) => r.propertyId === params.id);
  const allProperties = await PropertyRepository.getAllForAdmin();
  const similarProperties = allProperties
    .filter((p) => p.id !== params.id && (p.city === property.city || p.propertyTypeId === property.propertyTypeId))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Quản lý tin đăng", href: "/admin/tin-dang" },
          { label: property.title },
        ]}
      />

      <PropertyDetailClient
        property={property}
        auditLogs={auditLogs}
        reports={relatedReports}
        similarProperties={similarProperties}
      />
    </div>
  );
}
