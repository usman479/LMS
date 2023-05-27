export async function getCourses(id: string | undefined) {
  // const {data:session} = useSession();
  // const res = await fetch(`http://localhost:3000/api/course/${id}`,{cache:'no-cache'});
  const res = await fetch(`http://localhost:3000/api/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },
    body: JSON.stringify({
      s_id: id
    })
  })

  const data = await res.json();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // console.log("qhy: ",await res.json())
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return data;
}