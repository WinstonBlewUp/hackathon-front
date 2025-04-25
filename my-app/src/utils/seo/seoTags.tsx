'use client';

import Head from 'next/head';
import { seoData } from './seo';

interface SeoTagsProps {
  page: keyof typeof seoData;
}

export const SeoTags = ({ page }: SeoTagsProps) => {
  const data = seoData[page];

  console.log('[SEO INJECTION] Page:', page, '| Data:', data);

  if (!data) return null;

  return (
    <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      {data.keywords && <meta name="keywords" content={data.keywords.join(', ')} />}
    </Head>
  );
};
