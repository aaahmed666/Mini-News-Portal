import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingGrid() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <Skeleton className="h-8 w-48" />

        <div className="grid lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <Skeleton className="h-6 w-32" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
