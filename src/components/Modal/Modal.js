import PrimaryButton from "../Button/Button";
import { GlobalContext } from '../../context/globalContext';
import { useContext } from "react";

const Modal = (props) => {
let {dark} = useContext(GlobalContext);

  if(!props.open) {
    return null;
  }
  return (
    <div className="modal fixed top-0 left-0 z-10 center min-w-full min-h-full bg-slate-600/50 flex justify-center items-center">
      <div className="bg-white rounded-md w-6/12" style={ dark?{backgroundColor :"#222222", color: "white"}:null}>
        {/* Modal Header */}
        <div className="p-2 border-b border-cyan-800">
          <h1 className="text-xl">{props.title}</h1>
        </div>
        
        {/* Modal Body */}
        <div className="p-2">
          {
            props.children
          }
        </div>
        
        {/* Modal Footer */}
        {
          props.showFooter ? (
            <div className="p-2 border-t border-cyan-800">
              <PrimaryButton onClick={props.onClose}>Close</PrimaryButton>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default Modal;
