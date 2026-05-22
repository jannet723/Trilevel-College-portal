import { Navigate } from 'react-router-dom';

/** Registration opens as an overlay on the home page */
const Register = () => <Navigate to="/?register=1" replace />;

export default Register;
