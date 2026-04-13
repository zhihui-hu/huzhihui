'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import * as React from 'react';

const DEFAULT_BREAKPOINT = '(min-width: 768px)';

type ResponsiveDialogContextValue = {
  isDesktop: boolean;
};

const ResponsiveDialogContext =
  React.createContext<ResponsiveDialogContextValue | null>(null);

function useResponsiveDialogContext(componentName: string) {
  const context = React.useContext(ResponsiveDialogContext);

  if (!context) {
    throw new Error(`${componentName} must be used within ResponsiveDialog.`);
  }

  return context;
}

type DrawerRootProps = React.ComponentProps<typeof Drawer>;

interface ResponsiveDialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  breakpoint?: string;
  drawerDirection?: DrawerRootProps['direction'];
  dismissible?: DrawerRootProps['dismissible'];
  shouldScaleBackground?: DrawerRootProps['shouldScaleBackground'];
}

interface ResponsiveDialogContentProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  showCloseButton?: boolean;
  dialogClassName?: string;
  drawerClassName?: string;
}

function ResponsiveDialog({
  children,
  open,
  defaultOpen,
  onOpenChange,
  modal,
  breakpoint = DEFAULT_BREAKPOINT,
  drawerDirection,
  dismissible,
  shouldScaleBackground,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery(breakpoint);

  return (
    <ResponsiveDialogContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        <Dialog
          defaultOpen={defaultOpen}
          modal={modal}
          onOpenChange={onOpenChange}
          open={open}
        >
          {children}
        </Dialog>
      ) : (
        <Drawer
          defaultOpen={defaultOpen}
          direction={drawerDirection}
          dismissible={dismissible}
          modal={modal}
          onOpenChange={onOpenChange}
          open={open}
          shouldScaleBackground={shouldScaleBackground}
        >
          {children}
        </Drawer>
      )}
    </ResponsiveDialogContext.Provider>
  );
}

function ResponsiveDialogTrigger(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  const { isDesktop } = useResponsiveDialogContext('ResponsiveDialogTrigger');

  return isDesktop ? (
    <DialogTrigger {...props} />
  ) : (
    <DrawerTrigger {...props} />
  );
}

function ResponsiveDialogClose(
  props: React.ComponentProps<typeof DialogClose>,
) {
  const { isDesktop } = useResponsiveDialogContext('ResponsiveDialogClose');

  return isDesktop ? <DialogClose {...props} /> : <DrawerClose {...props} />;
}

function ResponsiveDialogContent({
  className,
  children,
  showCloseButton = true,
  dialogClassName,
  drawerClassName,
  ...props
}: ResponsiveDialogContentProps) {
  const { isDesktop } = useResponsiveDialogContext('ResponsiveDialogContent');

  return isDesktop ? (
    <DialogContent
      className={cn(className, dialogClassName)}
      showCloseButton={showCloseButton}
      {...props}
    >
      {children}
    </DialogContent>
  ) : (
    <DrawerContent className={cn(className, drawerClassName)} {...props}>
      {children}
    </DrawerContent>
  );
}

function ResponsiveDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { isDesktop } = useResponsiveDialogContext('ResponsiveDialogHeader');

  return isDesktop ? (
    <DialogHeader className={className} {...props} />
  ) : (
    <DrawerHeader className={cn('text-left', className)} {...props} />
  );
}

function ResponsiveDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { isDesktop } = useResponsiveDialogContext('ResponsiveDialogFooter');

  return isDesktop ? (
    <DialogFooter className={className} {...props} />
  ) : (
    <DrawerFooter className={className} {...props} />
  );
}

function ResponsiveDialogTitle(
  props: React.ComponentProps<typeof DialogTitle>,
) {
  const { isDesktop } = useResponsiveDialogContext('ResponsiveDialogTitle');

  return isDesktop ? <DialogTitle {...props} /> : <DrawerTitle {...props} />;
}

function ResponsiveDialogDescription(
  props: React.ComponentProps<typeof DialogDescription>,
) {
  const { isDesktop } = useResponsiveDialogContext(
    'ResponsiveDialogDescription',
  );

  return isDesktop ? (
    <DialogDescription {...props} />
  ) : (
    <DrawerDescription {...props} />
  );
}

export {
  DEFAULT_BREAKPOINT as RESPONSIVE_DIALOG_DEFAULT_BREAKPOINT,
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
};
