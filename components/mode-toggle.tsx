'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';
  const toggleSwitch = (checked: boolean) => setTheme(checked ? 'dark' : 'light');

  return (
    <div className="group inline-flex items-center gap-2">
      <SunIcon
        className="size-4 cursor-pointer transition-colors hover:text-primary"
        onClick={() => setTheme('light')}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleSwitch}
        aria-label="Toggle between dark and light mode"
      />
      <MoonIcon
        className="size-4 cursor-pointer transition-colors hover:text-primary"
        onClick={() => setTheme('dark')}
        aria-hidden="true"
      />
    </div>
  );
};
