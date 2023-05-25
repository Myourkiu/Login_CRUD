import '../styles/components/modal.sass'

const Modal = ({isOpen, children}) => {
  if(isOpen){
    return (

        <div className="shadow">
            <div className="modal">
                {children}
            </div>
        </div>
      )
  }
  return null
}

export default Modal