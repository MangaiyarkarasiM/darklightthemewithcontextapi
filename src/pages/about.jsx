import React, { useContext, useState } from 'react';
import PrimaryButton from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from '../context/globalContext';

const AboutPage = () => {
  const data = useContext(GlobalContext)
  const [showModal, setShowModal] = useState(false)

  return (
    <div style={{height: "100vh"}}>
      <h1 className='my-2'>About Page</h1>
      <h1 className='my-2'>{JSON.stringify(data)}</h1>
      <PrimaryButton className='my-2' onClick={() => setShowModal(true)}>
        Contact Us
      </PrimaryButton>
      <Modal title='Contact Us' open={showModal}>
        <h1 className='my-2'>Contact Us Form</h1>
        <PrimaryButton onClick={() => setShowModal(false)}>
          Close
        </PrimaryButton>
      </Modal>
    </div>
  )
}

export default AboutPage;
