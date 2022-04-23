import { Link, useNavigate } from 'react-router-dom';


function Nav () {
    
    const auth = localStorage.getItem( 'user' )
    const navigate = useNavigate() //automatically rerender the component when any update take place
    const logout = () => {
        // console.log("called")
        localStorage.clear()
        navigate('/signup')
    }

return (
        <>
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
             {/* <li><Link to="/logout">Logout</Link></li> */}
                { auth ?<li> <Link onClick={logout} to="/signup">Logout</Link> </li> : <> <li> <Link to="/signup">SignUp</Link> </li><li><Link to="/login">Login</Link></li> </> }
                
                
        </ul>
        </>
    )
}

export default Nav