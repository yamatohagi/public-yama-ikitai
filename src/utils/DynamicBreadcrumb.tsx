import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Iconify from 'src/components/iconify/Iconify';
import {paths} from 'src/routes/paths';

interface BreadcrumbProps {
  currentPath: string;
}

export const DynamicBreadcrumb: React.FC<BreadcrumbProps> = ({currentPath}: BreadcrumbProps) => {
  const findPathTitle = (path: string): string | null => {
    const title: string | null = null;

    Object.keys(paths).some((key: string) => {
      const subPath = paths[key as keyof typeof paths];

      return Object.keys(subPath).some((innerKey: string) => {
        const detail = subPath[innerKey as keyof typeof subPath] as any; // Use 'any' here

        if (detail.path === path) {
          return true;
        }
        return false;
      });
    });

    return title;
  };

  return (
    <Breadcrumbs sx={{ml: 2.5, mb: 1.9, mt: 8, fontSize: '0.87rem'}} separator={<Iconify icon="ooui:next-ltr" width={12} />} aria-label="breadcrumb">
      <Link color="inherit" href="/">
        TOP
      </Link>
      <Typography color="textPrimary">{findPathTitle(currentPath)}</Typography>
    </Breadcrumbs>
  );
};
