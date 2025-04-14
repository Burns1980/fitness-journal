import { InfoIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function workoutLogs() {
  const supabase = await createClient();
  // const { data: workoutLogs, error } = await supabase.rpc(
  //   'get_workouts_with_all_fields'
  // );

  // console.log(workoutLogs);

  const { data, error } = await supabase.functions.invoke('help-world', {
    body: { name: 'Functions' },
  });

  console.log(data);
  console.log(error);

  return (
    <div className='flex-1 w-full flex flex-col gap-12'>
      <div className='w-full'>
        <div className='bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center'>
          <InfoIcon size='16' strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className='flex flex-col gap-2 items-start'>
        <h2 className='font-bold text-2xl mb-4'>Your workout JSON</h2>
        <pre className='text-xs font-mono p-3 rounded border max-h-128 overflow-auto'>
          {/* {JSON.stringify(workoutLogs, null, 2)} */}
          test placement
        </pre>
      </div>
    </div>
  );
}
