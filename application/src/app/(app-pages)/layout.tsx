import InterfaceNavigationBar from '@/components/common/InterfaceNavigationBar';

export default function AppLayout ({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <InterfaceNavigationBar />
         {children}
      </div>
   );
}