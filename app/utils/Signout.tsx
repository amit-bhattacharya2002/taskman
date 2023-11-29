import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
 
interface Props{
  icon?: React.ReactNode;
  name?: String;
  
}
const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter()
 
  return (

    <button onClick={() => signOut(() => router.push("/"))}>
      Sign out
    </button>
  );
};


export default SignOutButton;