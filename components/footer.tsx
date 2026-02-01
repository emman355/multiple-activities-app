'use client';

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Typography from './ui/typography';

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Creator Section */}
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/images/emmanuel.jpg" alt="Emmanuel" />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <Typography variant="body2" className="text-muted-foreground">
            Designed & developed by <span className="font-semibold text-foreground">Emmanuel</span>
          </Typography>
          <Typography
            variant="body2"
            className="text-xs text-muted-foreground max-w-md text-center"
          >
            Powered by{' '}
            <span className="font-medium text-foreground">
              Next.js, TypeScript, Tailwind CSS, shadcn/ui, tweakcn, tailark, Supabase, Express, and
              Drizzle ORM
            </span>
          </Typography>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm mt-2">
          <Link
            href="https://linkedin.com/in/emmanuel-arevalo-021429179"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
              ></path>
            </svg>
          </Link>
          <Link
            href="https://www.facebook.com/EmmanArevalo328"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
              ></path>
            </svg>
          </Link>
          <Link
            href="https://github.com/emman355"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A10.99 10.99 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"
              />
            </svg>
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <Typography variant="small" className="text-muted-foreground text-sm">
            © {new Date().getFullYear()}. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
