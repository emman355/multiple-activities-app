import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ListTodo, Home, Cloud, Utensils, Star, FileText } from 'lucide-react';
import { ReactNode } from 'react';
import Typography from './ui/typography';

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent" id="features">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Typography variant="h2">Multiple Activities App</Typography>
          <Typography variant="body1" className="mt-4">
            A single platform where authenticated users can explore, create, and manage different
            activities — from to-do lists to notes, reviews, and more.
          </Typography>
        </div>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {/* Home Page */}
          <Card className="group bg-background">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Home className="size-6" aria-hidden />
              </CardDecorator>
              <Typography variant="h3" className="mt-6">
                Home Page
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2">
                Users can register, login, and navigate to all activities. Authenticated users can
                log out or delete their account.
              </Typography>
            </CardContent>
          </Card>

          {/* Activity 1: To‑Do List */}
          <Card className="group bg-background">
            <CardHeader className="pb-3">
              <CardDecorator>
                <ListTodo className="size-6" aria-hidden />
              </CardDecorator>
              <Typography variant="h3" className="mt-6">
                To‑Do List
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2">
                A Supabase‑powered to‑do list with full CRUD operations. Each user sees only their
                own tasks, even after browser restart.
              </Typography>
            </CardContent>
          </Card>

          {/* Activity 2: Drive Lite */}
          <Card className="group bg-background">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Cloud className="size-6" aria-hidden />
              </CardDecorator>
              <Typography variant="h3" className="mt-6">
                Drive Lite
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2">
                Upload, manage, and search photos. Sort by name or upload date for a streamlined
                Google Drive‑like experience.
              </Typography>
            </CardContent>
          </Card>

          {/* Activity 3: Food Reviews */}
          <Card className="group bg-background">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Utensils className="size-6" aria-hidden />
              </CardDecorator>
              <Typography variant="h3" className="mt-6">
                Food Reviews
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2">
                Add food photos and write reviews. Supports CRUD operations on both photos and
                reviews, with sorting by name or date.
              </Typography>
            </CardContent>
          </Card>

          {/* Activity 4: Pokémon Reviews */}
          <Card className="group bg-background">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Star className="size-6" aria-hidden />
              </CardDecorator>
              <Typography variant="h3" className="mt-6">
                Pokémon Reviews
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2">
                Search Pokémon by name and create reviews. Full CRUD support with sorting by name or
                upload date.
              </Typography>
            </CardContent>
          </Card>

          {/* Activity 5: Markdown Notes */}
          <Card className="group bg-background">
            <CardHeader className="pb-3">
              <CardDecorator>
                <FileText className="size-6" aria-hidden />
              </CardDecorator>
              <Typography variant="h3" className="mt-6">
                Markdown Notes
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body2">
                Create, edit, and preview notes in Markdown. Switch between raw Markdown and styled
                preview with full CRUD support.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] dark:opacity-50"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
