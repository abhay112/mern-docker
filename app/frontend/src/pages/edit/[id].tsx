import { useRouter } from 'next/router';
import Record from '../../components/User';

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

//   return <Record id={id as string} />;
    return <Record  />;

}
