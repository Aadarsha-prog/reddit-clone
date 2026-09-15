import { Loader2 } from 'lucide-react';
import React from 'react';

function HomePageLoading() {
  return (
    <div className="size-full grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}

export default HomePageLoading;
