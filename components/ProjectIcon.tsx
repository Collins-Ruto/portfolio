'use client'

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function ProjectIcon({ lighturl, darkurl }: { darkurl: string; lighturl: string }) {
  const { systemTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === 'dark' ? <Image width={100} height={45} alt="demo" src={darkurl}></Image>
      :<Image width={100} height={45} alt="demo" src={lighturl}></Image>}
    </>
  );
}

export default ProjectIcon