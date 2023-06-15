'use client'
import Image from 'next/image'
import {useSession,signOut} from 'next-auth/react'

async function getData(id:string|undefined) {
  // const {data:session} = useSession();
  const res = await fetch(`http://localhost:3000/api/course/${id}`,{cache:'no-store'});
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // console.log("qhy: ",await res.json())
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default  function Home() {

  const {data:session} = useSession();
  // const data =  getData(session?.user.s_id);

  console.log('data: ',session?.user.s_name)

  return (
    // <main className="px-6 mx-auto">
    //   <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
    //     Hello and Welcome 👋&nbsp;
    //     <span className="whitespace-nowrap">
    //       I'm <span className="font-bold">Usman</span>.
    //     </span>
    //   </p>
    //   {/* <Posts /> */}
    // </main>
//     <article className="prose prose-neutral lg:prose-xl">
//   <h1>Garlic bread with cheese: What the science tells us</h1>
//   <p>
//     For years parents have espoused the health benefits of eating garlic bread with cheese to their
//     children, with the food earning such an iconic status in our culture that kids will often dress
//     up as warm, cheesy loaf for Halloween.
//   </p>
//   <p>
//     But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
//     springing up around the country.
//   </p>
// </article>
  <>
  <p>HOME</p>
  <p>{session?.user.s_name &&  session.user.s_name}</p>
  <button 
  // @ts-ignore */
  onClick={signOut}
  >signOut</button>
  </>
  )
}
