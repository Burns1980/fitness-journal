import Image from 'next/image';
import loader from '@/assets/loader.gif';

export default function Loading() {
  return (
    <div className='flex flex-1 items-center justify-between'>
      <Image src={loader} width={150} height={150} alt='Page loading' />
    </div>
  );
}
