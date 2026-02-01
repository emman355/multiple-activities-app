import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import type { Variants } from 'framer-motion';

const transitionVariants: { item: Variants } = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <div>
      {/* <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                delayChildren: 1,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 2,
              },
            },
          },
        }}
        className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
      >
        <Image
          src="/images/hero-combined-1.png"
          alt="background"
          className="hidden size-full dark:block"
          width="3276"
          height="4095"
        />
        <Image
          src="/images/hero-combined-1.png"
          alt="background"
          className="block size-full dark:hidden"
          width="3276"
          height="4095"
        />
      </AnimatedGroup> */}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
          >
            Explore Multiple Activities with Ease
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.5}
            as="p"
            className="mx-auto mt-8 max-w-2xl text-balance text-lg"
          >
            A unified platform built for creativity, precision, and performance where you can
            register, login, and navigate through different activities — Powered by Next.js,
            TypeScript, Tailwind CSS, shadcn/ui, tweakcn and Tailark — featuring Express APIs,
            secure authentication with Supabase, and a scalable backend powered by Drizzle ORM.
          </TextEffect>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            <div
              key={1}
              className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
            >
              <Button asChild size="lg" className="rounded-xl px-5 text-base">
                <Link href="/activity-1">
                  <span className="text-nowrap">Get Started</span>
                </Link>
              </Button>
            </div>
          </AnimatedGroup>
        </div>
      </div>

      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.75,
              },
            },
          },
          ...transitionVariants,
        }}
      >
        <div className="mask-b-from-55% relative mx-auto mt-16 max-w-7xl overflow-hidden px-4">
          <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
            <Image
              className="z-2 border-border/25 relative rounded-2xl border block"
              src="/images/hero-combined-1.png"
              alt="app screen"
              width={2796}
              height={2008}
            />
          </div>
        </div>
      </AnimatedGroup>
    </div>
  );
}
