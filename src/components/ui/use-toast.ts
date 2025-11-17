import { useState } from 'react';

export function useToast() {
  return {
    toast: (props: { title?: string; description?: string; variant?: 'default' | 'destructive' }) => {
      alert(props.description || props.title);
    }
  };
}

