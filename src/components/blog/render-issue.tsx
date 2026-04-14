import type { BlogMdxIssue } from '@/components/blog/mdx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangleIcon } from 'lucide-react';

type BlogRenderIssueProps = {
  issue: BlogMdxIssue;
};

export function BlogRenderIssue({ issue }: BlogRenderIssueProps) {
  return (
    <Alert className="my-6 border-destructive/30" variant="destructive">
      <AlertTriangleIcon />
      <AlertTitle>{issue.title}</AlertTitle>
      <AlertDescription>
        <p>{issue.description}</p>
        {process.env.NODE_ENV !== 'production' && issue.detail ? (
          <p className="font-mono text-xs break-all">{issue.detail}</p>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
