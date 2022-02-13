import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext';
import PrimaryButton from "../Button/Button";

const Header = (props) => {
  const { cartItems, dark, updateTheme } = useContext(GlobalContext)
  return (
    <div className="p-4 mb-3 flex justify-between bg-slate-600 text-slate-100" style={ dark?{backgroundColor :"#222222", color: "white"}:null}>
      <div className='flex justify-center align-center'>
        <div className='mt-1'>Logo</div>
        <div className='ml-4'>
        <button className="bg-stone-900 p-1 px-3 rounded-full" type="button" onClick={()=>{updateTheme()}}>Dark theme {dark? 'off' : 'on'}</button>
        </div>
      </div>

      <div>
        <Link className="mr-4" to="/">Home</Link>
        <Link className="mr-4" to="/products">Products</Link>
        <Link className="mr-4" to="/terms">Terms & Conditions</Link>
        <Link className="mr-4" to="/about">About</Link>
        <PrimaryButton className="mr-4" onClick={props.onLoginClick}>
          Login/Sign up
        </PrimaryButton>
        <PrimaryButton onClick={props.onCartClick}>
          Cart {
            cartItems.length ? `(${cartItems.length})` : null
          }
        </PrimaryButton>
      </div>
    </div>
  )
}

export default Header;
