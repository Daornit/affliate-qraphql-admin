import { store } from 'react-notifications-component';

const successInfo = (message) => store.addNotification({
  message: message,
  type: 'success',
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
})

const errorInfo = (message) => {
  store.addNotification({
    message: message,
    type: 'danger',
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  })
}

export const notification = {
  success: successInfo,
  error: errorInfo
}

export default {
  success: successInfo,
  error: errorInfo
}