import { Button } from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInSignOutButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  )
}
