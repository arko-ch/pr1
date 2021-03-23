import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignToast from '../Header/AssignToast';
import ReassignToast from '../Header/ReassignToast';

export const NewNotify = data => {
  if (data) {
    toast.info(<ReassignToast />, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      draggable: true,
      closeOnClick: true
    });
  } else {
    toast.success(<AssignToast label={'Successfully Assigned'} />, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      draggable: true,
      closeOnClick: true
    });
  }
};
