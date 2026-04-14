'use client';

import { useServerInsertedHTML } from 'next/navigation';

type StructuredDataProps = {
  data?: unknown;
  id?: string;
};

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function StructuredData({ data, id }: StructuredDataProps) {
  useServerInsertedHTML(() => {
    if (!data) {
      return null;
    }

    return (
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        id={id}
        type="application/ld+json"
      />
    );
  });

  return null;
}
