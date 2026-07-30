import { getMe } from "@/services/getMe";

 

export default  function Home() {
  // const user = await getMe();
  // console.log("User from Home Page:", user);
  return (
     <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the RentNest application.</p>
     </div>
  );
}
