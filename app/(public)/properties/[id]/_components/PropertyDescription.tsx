import { FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface PropertyDescriptionProps {
  description: string;
}

export default function PropertyDescription({
  description,
}: PropertyDescriptionProps) {
  return (
    <Card className="rounded-3xl border shadow-sm">
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <FileText className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Description
            </h2>

            <p className="text-sm text-muted-foreground">
              Learn more about this property.
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl bg-muted/40 p-5">
          <p className="whitespace-pre-line leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}