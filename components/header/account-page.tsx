import React, { Suspense } from 'react';
import Account from './account';
import { createClient } from '@/utils/supabase/server';
import BookCreateLoading from '../book-create-loading';

export default async function AccountPage() {
  const supabase = createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  return (
    <Suspense  fallback={<BookCreateLoading />}>
      <Account />
    </Suspense>

  )
}
