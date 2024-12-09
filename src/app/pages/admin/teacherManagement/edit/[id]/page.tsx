import Form from "./Form";



export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;
 return(
  <div>
    <Form id={id}/>
  </div>
 )
}
