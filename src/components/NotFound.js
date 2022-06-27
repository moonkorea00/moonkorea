import { useTitle } from "../hooks/useTitle";

const NotFound = () => {
  useTitle('404 페이지가 존재하지 않습니다')
  return ( 
    <div>Page Not Found</div>
   );
}
 
export default NotFound;