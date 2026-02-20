import { ButtonBack } from "@/components/custom/Button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default async function NotFound() {
  return (
    <div className="space-y-4 px-2">
      <Card>
        <CardContent className="space-y-2">
          <CardDescription>
            <p className="text-destructive">
              Could not find requested resource
            </p>
          </CardDescription>

          <ButtonBack />
        </CardContent>
      </Card>
    </div>
  );
}
